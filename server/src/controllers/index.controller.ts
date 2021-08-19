import { NextFunction, Request, Response } from 'express';
import IndexService from '@services/index.service';


class IndexController {
  public indexService = new IndexService()

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public redirectUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params.code)
      const redirectUrl = await this.indexService.redirectUrl(req.params.code)
      res.redirect(301, redirectUrl.longUrl)
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
