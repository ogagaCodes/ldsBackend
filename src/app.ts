import express from 'express';
import Logger from './core/Logger';
import cors from 'cors';
import * as Config from '../src/Config/index';
// import './database'; // initialize database
// import './cache'; // initialize cache
import {
  NotFoundError,
  ApiError,
  InternalError,
  ErrorType,
} from './core/APiError';
import routes from './routes';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
app.use(cors);

// Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: express.Request, res: express.Response) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
      return res.status(500).send(err);
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    Logger.error(err);
    if (Config.Config.environment === 'development') {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
    return res.status(500).send(err);
  }
});

export default app;
