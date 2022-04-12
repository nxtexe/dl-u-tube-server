import {Request, Response, NextFunction} from 'express';
import ytdl from 'ytdl-core';
import { onError } from 'src/common/middleware';
import fs from 'fs';
import path from 'path';

export default function Video(req: Request, res: Response, next: NextFunction) {
    if (req.query.url && typeof req.query.url === "string") {
        (async (url: string) => {
            try {
                const agent = res.locals.agent;
                // pipe response
                ytdl(url, {
                    // requestOptions: {agent}
                }).pipe(res);
            } catch (e) {
                res.status(500).send();
                onError(e as Error);
            }
            // try {
            //     const range = req.headers.range;
            //     if (range && !range.includes('bytes=0')) {
            //         const parts = range.replace(/bytes=/, "").split('-');
    
            //         if (parts.length < 2) return res.status(400).send();
                    
            //         const start = parseInt(parts[0]);
            //         const end = parseInt(parts[1]);
    
            //         res.setHeader('Accept-Ranges', 'bytes');
            //         res.setHeader('Content-Range', `bytes ${start}-${end}/*`);
            //         res.setHeader('Content-Type', 'video/mp4');
            //         fs.createReadStream(path.resolve('video.mp4'), {start, end}).pipe(res);
            //     } else {
            //         res.setHeader('Accept-Ranges', 'bytes');
            //         res.setHeader('Content-Type', 'video/mp4');
            //         const fileStream = fs.createReadStream(path.resolve('video.mp4'));
            //         fileStream.pipe(res);
            //     }
            // } catch (e) {
            //     onError(e as Error);
            //     return res.status(500).send();
            // }

        })(req.query.url);
    } else {
        res.status(400).send();
    }
}