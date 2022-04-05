import {Request, Response, NextFunction} from 'express';
import axios from 'axios';
import { onError } from 'src/common/middleware';
import { getImageExtFromURL } from 'src/common/utils';

export default function ImageProxy(req: Request, res: Response, next: NextFunction) {
    if (typeof req.query.url === "string") {
        axios({
            url: req.query.url,
            responseType: 'stream'
        }).then(response => {
            res.setHeader('Content-Type', `image/${getImageExtFromURL(req.query.url as string)}`);
            return response.data.pipe(res);
        }).catch(e => {
            onError(e as Error);
            return res.status(500).send();
        })
    } else {
        return res.status(400).send();
    }
}