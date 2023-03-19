import dotenv from 'dotenv'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Config  {
  export const port = process.env.port;
  export const environment = process.env.NODE_ENV;
   export const logDirectory = process.env.LOG_DIR;
}
