import express, { Application } from 'express';

import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import Controller from './controller.interface';
import errorMiddleware from './error.middleware';

dotenv.config();

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseMiddleware();
    this.initialiseController(controllers);

    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(morgan('dev'));
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private initialiseController(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port || process.env.PORT, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

export default App;
