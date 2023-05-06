import {Request, Response, NextFunction} from 'express';
import ytdl from 'ytdl-core';
import { onError } from 'src/common/middleware';

export default function ValidateURL(req: Request, res: Response, next: NextFunction) {
    try {
        if (typeof req.query.url !== "string")
            return res.sendStatus(400);
        
        const url = req.query.url;
        const isValidURL = ytdl.validateURL(url);
        if (isValidURL)
            res.sendStatus(200);
        else
            res.sendStatus(400);
        
    } catch (e) {
        res.status(500).send();
        console.error(e);
        onError(e as Error);
    }
}