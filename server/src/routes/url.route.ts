import URLController from '@controllers/url.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';

class UrlRoute implements Routes {
    public path = '/url';
    public router = Router();
    public URLController = new URLController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/all`, authMiddleware, this.URLController.getAllUrls);
        this.router.post(`${this.path}`, this.URLController.saveUrl);

    }
}

export default UrlRoute;