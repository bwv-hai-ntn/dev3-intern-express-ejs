import {EntityRepository, Repository} from 'typeorm';
import {User} from '../entities/user.entity';
import {comparePassword} from '../utils/bcrypt';
import {getCurrentSystemDatetime} from '../utils/common';
import * as _ from "lodash"

export type searchParams = {
  username: string,
  name: string,
  role: string[],
  offset?: number,
  limit?: number
};

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async verifyCredentials(username: string, password: string) {
    const foundUser = await this.findOne({where: {username, deleted: 0}});

    if (!foundUser) {
      return null;
    }

    // validate password
    const passwordMatched = await comparePassword(
      password,
      foundUser!.password,
    );

    if (!passwordMatched) {
      return null;
    }

    // update last_login
    foundUser.lastLogin = getCurrentSystemDatetime();
    foundUser.updatedBy = foundUser.name;

    await this.update(foundUser.id, foundUser);

    return foundUser;
  }

  async findByUsername(username: string) {
    const foundUser = await this.findOne({where: {username, deleted: 0}});

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async findById(id: string) {
    const foundUser = await this.findOne({where: {id, deleted: 0}});

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async add(user: User) {
    await this.manager.insert('user', user);
  }

  async search(params: searchParams, isCSV?: boolean) {
    const query =  this.createQueryBuilder("user");

    if(!_.isNil(params.username)  && params.username != '') {
      query.where("user.username = :username", { username: params.username});
    }

    if(!_.isNil(params.name) && params.name != '') {
        query.andWhere("user.name LIKE :name", { name:`%${params.name}%` })
    }

    if(!_.isNil(params.role) && params.role.at(0) != '') {
        query.andWhere("user.role IN (:...role)", { role: params.role });
    }

    query.andWhere("user.deleted = 0")

    if(isCSV) {
        return { data: await query.getMany() };
    }

    const count = await query.getCount();

    if (!_.isNil(params.limit)) {
        query.limit(params.limit);
    }

    if (!_.isNil(params.offset)) {
        query.offset(params.offset);
    }
        
    return { count, data: await query.getMany() };
    };

    async updateUser(user: User) {
      await this.manager.update(User, {id: user.id}, user);


    }
}
