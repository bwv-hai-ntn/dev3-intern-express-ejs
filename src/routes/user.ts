/**
 * User Router
 */
import {Router} from 'express';
import * as userController from '../controllers/user.controller';
import { permission } from '../middlewares/screenPermission';
import userValidator from '../validators/user.validator'
import validators from '../validators/validators';

const userRouter = Router();

userRouter.get('/add', permission([1]), userController.getAdd);
userRouter.post('/add', permission([1]), userValidator.add(), validators, userController.add);
userRouter.get('/:id(\\d+)', permission([1]), userController.getEdit);
userRouter.post('/:id(\\d+)', permission([1]), userValidator.edit(), validators, userController.edit);
userRouter.get('/export', permission([1]), userController.exportCSV);
userRouter.get('/', permission([1]), userController.user);


export default userRouter;