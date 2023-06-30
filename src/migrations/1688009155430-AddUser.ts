import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../entities/user.entity";

export class AddUser1688009155430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
