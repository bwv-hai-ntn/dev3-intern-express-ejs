// @ts-nocheck
/**
 * User controller
 */
import * as logger from '../utils/logger';
import {NextFunction, Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import {UserRepository} from '../repositories/user.repository';
import bcrypt from "bcrypt";
import { messages } from '../constants';
import * as _ from "lodash";
import { User } from '../models';
import { name } from 'ejs';

/**
 * GET user
 */
export const user = async (req: Request, res: Response) => {
    try {
        // Get key search
        let username = req.query.username;
        let name = req.query.name;
        let role = req.query.role;

        if(_.isEmpty(req.query)) {
            if(_.isNil(role)) {
                role = [ '1' , '2' , '3'];
            }
        }

        if(typeof role == 'string') {
            role = [...role.split(',')];
        }

        let page = Number(req.query.page) || 1;
        
        const searchConditions = {
            username: username,
            name: name,
            role: role
        }

        const resultsPerPage = Number(process.env.LIMIT) || 10;
        const offset = (page - 1) * resultsPerPage;

        const userRepository = getCustomRepository(UserRepository);

        // Get data
        let users = await userRepository.search({
            username: username as string,
            name:  name as string,
            role: role as [],
            offset,
            limit: resultsPerPage
        });

        let message = '';

        const numOfResults = users?.count || 0;
        const numOfPages = Math.ceil(numOfResults / resultsPerPage);

        message = numOfResults > 0? `Show ${offset + 1} to ${offset + users?.data.length} of ${numOfResults} entries` : 'There is no result.';

        res.render('user/search', {
            searchConditions,
            users: users.data,
            numOfPages: numOfPages,
            page: page,
            message: message
        }); 
    } catch (error) {
        // write log
        logger.logInfo(
            req,
            `Failed search attempt: query(${req.query || ''})`,
        );
    
        res.render('user/search', {
            searchConditions,
            users: users.data,
            numOfPages: numOfPages,
            page: page,
            message: message
        });
    }
};

/**
 * GET add
 */
export const getAdd = (req: Request, res: Response) => {
    try {

        const addQuery = {
            username: undefined,
            name: undefined,
            role: undefined,
            errorMessage: undefined
        }

        const errorMessage : Array<string> = [];

        res.render('user/add', {
            addQuery,
            errorMessage
        });

    } catch (error) {
        // write log
        logger.logInfo(
            req,
            `Failed add attempt: query(${req.query || ''})`,
        );
    
        res.render('user/add', {
            addQuery,
            errorMessage
        });
    }
};


/**
 * POST add
 */
export const add = async (req: Request, res: Response) => {
    try {

        let errorMessage = (req.session as any)?.message;

        delete (req.session as any).message;

        const addQuery = {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        }

        if(errorMessage) {
            return res.render('user/add', {
                addQuery,
                errorMessage
            });
        }

        const userRepository = getCustomRepository(UserRepository);

        const loginUser = await userRepository.findById(Number(req.session.user?.id));

        if(loginUser) {
            const saltRounds = Number(process.env.SALTROUNDS) || 10;

            const hash = bcrypt.hashSync(addQuery.password, saltRounds);

            const user = {
                username : addQuery.username,
                name : addQuery.name,
                password: hash,
                role : addQuery.role
            }

            await userRepository.add(user);

            // success
            const message: string = messages.I013;

            // save message into session
            (req.session as Express.Session).message = {
                message,
            };

            return res.redirect('/user');
        }

        return res.render('user/add', {
            addQuery,
            errorMessage
        });

    } catch (error) {
        // write log
        logger.logInfo(
            req,
            `Failed add attempt: query(${req.query || ''})`,
        );
    
        res.render('user/add', {
            addQuery,
            errorMessage
        });
    }
};

/**
 * GET edit
 */
export const getEdit = async (req: Request, res: Response, next:  NextFunction) => {
    try {
        let id = req.params.id;
   
        const userRepository = getCustomRepository(UserRepository);

        // Find user by id
        const user = await userRepository.findById(id);

        if (user) {        
            res.render('user/edit', {
                userEdit: user
            });

        } else {
            next();
        }

    } catch (error) {
        // write log
        logger.logInfo(
            req,
            `Failed edit attempt: query(${req.params.id || ''})`,
        );
    
        res.render('user/edit', {
            userEdit: user
        });
    }
};

/**
 * POST edit
 */
export const edit = async (req: Request, res: Response, next:  NextFunction) => {
    try {
        const id = req.params.id;

        const editQuery = {
            id,
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role,
        }

        const userRepository = getCustomRepository(UserRepository);

        const loginUser = await userRepository.findById(req.user.id);

        if(loginUser) {

            const saltRounds = Number(process.env.SALTROUNDS) || 10;

            const hash = bcrypt.hashSync(editQuery.password, saltRounds);

            const user = new User();
            user.username = editQuery.username;
            user.name = editQuery.name;
            user.role = editQuery.role;
            user.password = hash;

            await userRepository.updateUser(user);

            // success
            req.session.message = messages.I013;

            return res.redirect('/user');
        }  
         
         res.render('user/edit', {
            userEdit: editQuery
        });

    } catch (error) {
        res.render('user/edit', {
            userEdit: editQuery
        });
    }
};

/**
 * GET exportCSV
 */
export const exportCSV = async (req: Request, res: Response, next:  NextFunction) => {
    let username = req.query.username;
    let name = req.query.name;
    let role = req.query.role;

    if(typeof role == 'string') {
        role = [...role.split(',')];
    }

    let users = await usersService.search({
        username: username as string,
        name:  name as string,
        role: role as []
    }, true);

    const columns = [
        { key: 'id', header: 'user_id' },
        { key: 'username', header: 'username' },
        { key: 'name', header: 'name' },
        { key: 'role', header: 'role' },
        { key: 'deleted', header: 'deleted' },
        { key: 'createdBy', header: 'created_by' },
        { key: 'createdAt', header: 'created_at' }
    ];

    const str = stringify(users?.data!,{ header: true, columns: columns, quote: '"', quoted: true, 
    cast: {
        number: function(value){
            return {value: `"${value}"`, quote: false};
        }
    }
    });

    res.json(str);
};