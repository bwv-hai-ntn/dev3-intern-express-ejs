import { check } from 'express-validator';
import _, { flatMap } from 'lodash';
import { messages } from '../constants';
import {UserRepository} from '../repositories/user.repository';
import { getCustomRepository } from 'typeorm';

const userValidator = {
  add() {
    return [ 
      check('username', messages.E001('username')).not().isEmpty(),
      check('username').not().isEmpty().isLength({ max: 100 }).withMessage(email => {
          return messages.E002('Username', 100, email.length);
      }),
      check('username').not().isEmpty().custom(async value => {
          const userRepository = getCustomRepository(UserRepository);
          
          const user = await userRepository.findByUsername(value);
          if (user) {
            throw new Error(messages.E009('Username'));
          }
      }),
      check('fullName', messages.E001('Fullname')).not().isEmpty(),
      check('fullName').not().isEmpty().isLength({ max: 50 }).withMessage(fullName => {
          return messages.E002('Fullname', 50, fullName.length);
      }),
      check('password', messages.E001('Password')).not().isEmpty(),
      check('rePassword', messages.E001('Re-password')).not().isEmpty(),
      check('rePassword', messages.E011).not().isEmpty().custom((value, { req }) => {
          return value === req.body.password;
        }),
      check('role', messages.E001('Role')).not().isEmpty()
    ];
  },

  edit() {
    return [ 
      check('username', messages.E001('username')).not().isEmpty(),
      check('username').not().isEmpty().isLength({ max: 100 }).withMessage(email => {
          return messages.E002('Username', 100, email.length);
      }),
      check('username').not().isEmpty().custom(async (value, {req}) => {
          const userRepository = getCustomRepository(UserRepository);
          
          const user = await userRepository.findByUsername(value);
          if (user && user.id != req.params?.id) {
            throw new Error(messages.E009('Username'));
          }
      }),
      check('fullName', messages.E001('Fullname')).not().isEmpty(),
      check('fullName').not().isEmpty().isLength({ max: 50 }).withMessage(fullName => {
          return messages.E002('Fullname', 50, fullName.length);
      }),
      check('password', messages.E001('Password')).not().isEmpty(),
      check('rePassword', messages.E001('Re-password')).not().isEmpty(),
      check('rePassword', messages.E011).not().isEmpty().custom((value, { req }) => {
          return value === req.body.password;
        }),
      check('role', messages.E001('Role')).not().isEmpty()
    ];
  }
}

export default userValidator;

