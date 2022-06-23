import 'dotenv/config';
import App from './app';
import UploadController from './upload.controller';

const app = new App([new UploadController()], Number(process.env.PORT));

app.listen();
