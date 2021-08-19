import { NextFunction, Request, Response } from 'express';
import { URL } from '@interfaces/url.interface';
import URLService from '@services/url.service';
import { CreateUrlDto } from '../dtos/url.dto';

class UsersController {
    public URLService = new URLService();

    public getAllUrls = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUrlsData: URL[] = await this.URLService.findAllUrls();

            res.status(200).json({ data: findAllUrlsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public saveUrl = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const urlData: CreateUrlDto = req.body;
            const createURLData: URL = await this.URLService.saveUrl(urlData);
            res.status(201).json({ data: createURLData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;