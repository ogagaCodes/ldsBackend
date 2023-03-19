// import {Request, Response, NextFunction } from 'express';
// import { ForbiddenError } from '../core/APiError';

// export default (permission: string) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (!req.apiKey?.permissions)
//         return next(new ForbiddenError('Permission Denied'));

//       const exists = req.apiKey.permissions.find(
//         (entry: string) => entry === permission,
//       );
//       if (!exists) return next(new ForbiddenError('Permission Denied'));

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
