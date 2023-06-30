import {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';
import { BAD_REQUEST } from 'http-status';
import { map } from 'lodash';
import { debug } from 'winston';

export default async (req: Request, res: Response, next: NextFunction) => {
    const validatorResult = validationResult(req);
    if (!validatorResult.isEmpty()) {
      const errors = map(
        validatorResult.array({ onlyFirstError: true }),
        (mappedError) => {
          return mappedError.msg;
        },
      );
      debug('validation result not empty...', errors);
      // res.status(BAD_REQUEST).json({
      //   errors,
      // });

      (req.session as any).message = errors;

    } 
    next();
  };