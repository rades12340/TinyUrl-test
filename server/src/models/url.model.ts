import { model, Schema, Document } from 'mongoose';
import { URL } from '@interfaces/url.interface';

const urlSchema: Schema = new Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: { type: Date, default: Date.now }
});

const urlModel = model<URL & Document>('URL', urlSchema);

export default urlModel;