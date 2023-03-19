import Logger from './core/Logger';
import * as Config from './config';
import app from './app';
import * as dotenv from 'dotenv';
dotenv.config();
app
  .listen(Config.Server.port, () => {
    Logger.info(`server running on port : ${Config.Server.port}`);
  })
  .on('error', (e) => Logger.error(e));
