import { Response, NextFunction } from 'express';
import { ForbiddenError } from '../core/ApiError';

export default (permission: string) =>
  (req: any, res: Response, next: NextFunction) => {
    try {
      if (!req.apiKey?.permissions)
        return next(new ForbiddenError('Permission Denied'));

      const exists = req.apiKey.permissions.find(
        (entry: string) => entry === permission,
      );
      if (!exists) return next(new ForbiddenError('Permission Denied'));

      next();
    } catch (error) {
      next(error);
    }
  };
