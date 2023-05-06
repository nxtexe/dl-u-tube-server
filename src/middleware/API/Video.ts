import {Request, Response, NextFunction} from 'express';
import ytdl from 'ytdl-core';
import { onError } from 'src/common/middleware';
import fs from 'fs';
import asyncFS from 'fs/promises';
import path from 'path';
import { request } from 'https';

export default function Video(req: Request, res: Response, next: NextFunction) {
    try {
        const info: ytdl.videoInfo = req.body;

        if (!info.formats.length)
            return res.status(404).send();
        // get content length
        const [format] = info.formats;
        const contentLength = format.contentLength;

        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Type', "video/mp4");
        if (contentLength)
            res.setHeader('Content-Length', contentLength);

        const range = req.headers.range;
        if (range) {
            res.setHeader('Content-Range', range);
        }

        console.log(contentLength);

        ytdl.downloadFromInfo(info, {
            requestOptions: {
                range
            }
        }).pipe(res);

    } catch (e) {
        res.status(500).send();
        console.error(e);
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
    //         const filePath = path.resolve('video.mp4');
    //         res.setHeader('Accept-Ranges', 'bytes');
    //         res.setHeader('Content-Type', 'video/mp4');
    //         res.setHeader('Content-Length', (await asyncFS.stat(filePath)).size);
    //         const fileStream = fs.createReadStream(filePath);
    //         ffmpeg(fileStream)
    //         .toFormat('mp3')
    //         .on('progress', (info) => {
    //             console.log(info.percent);
    //         })
    //         .pipe(res, {end: true});
    //     }
    // } catch (e) {
    //     onError(e as Error);
    //     return res.status(500).send();
    // }
}