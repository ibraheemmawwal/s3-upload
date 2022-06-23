import multer = require('multer');
import { uploadFile } from './s3';
import { Router, Request, Response, NextFunction } from 'express';
import Controller from './controller.interface';

class UploadController implements Controller {
  public path = '/upload';
  public router = Router();
  public upload = multer({
    dest: 'uploads',
  });

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      this.upload.single('image'),
      this.uploadImage
    );
  }

  private uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | any> => {
    const file = req.file;
    console.log(file);

    const result = await uploadFile(file);

    console.log(result);

    res.send({ imagePath: `${result.Location}` });
  };
}

export default UploadController;
