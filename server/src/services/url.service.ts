import UrlModel from '@models/url.model';
import { isEmpty } from 'class-validator';
import validUrl from 'valid-url';
import shortId from 'shortid';
import { CreateUrlDto } from '../dtos/url.dto';
import { HttpException } from '../exceptions/HttpException';
import { URL } from '../interfaces/url.interface';
import config from 'config';
import { DateTime } from 'luxon';

class URLService {
    public urls = UrlModel;

    public async findAllUrls(): Promise<URL[]> {
        const date = DateTime.now().minus({ day: 1 }).toISO()
        const urls: URL[] = await this.urls.find().where('date').gt(new Date(date).getTime());
        return urls;
    }

    public async saveUrl(urlData: CreateUrlDto): Promise<URL> {
        if (isEmpty(urlData.longUrl)) throw new HttpException(400, "You should supply url");


        const findUrl: URL = await this.urls.findOne({ longUrl: urlData.longUrl });
        if (findUrl) throw new HttpException(409, `Your url ${urlData.longUrl} already exists`);

        const baseUrl = config.get<string>('baseUrl')

        if (!validUrl.isUri(baseUrl)) throw new HttpException(401, `Your base url ${baseUrl} is invalid`);

        const urlCode = shortId.generate();
        const longUrl = urlData.longUrl

        if (validUrl.isUri(baseUrl)) {
            try {
                let url = await this.urls.findOne({ longUrl });

                if (url) {
                    return url
                } else {
                    const shortUrl = baseUrl + '/' + urlCode;

                    url = new UrlModel({
                        longUrl,
                        shortUrl,
                        urlCode,
                        date: new Date()
                    });

                    await url.save()
                    this.urls.create
                    return url
                }
            } catch (err) {
                console.error(err);
                throw new HttpException(500, `Server error`);
            }
        } else {
            throw new HttpException(401, `Your base url ${baseUrl} is invalid`);
        }

    }
}

export default URLService;
