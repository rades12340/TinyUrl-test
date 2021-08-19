import UrlModel from '@models/url.model';
import { URL } from '../interfaces/url.interface';


class IndexService {
    public urls = UrlModel;

    public async redirectUrl(code: string): Promise<URL> {

        try {
            const domain = await this.urls.findOne({ urlCode: code }).exec();

            return domain;
        } catch (err) {
            console.log(err)
        }

    }


}

export default IndexService;
