import {Request, Response, NextFunction} from 'express';
import ytdl from 'ytdl-core';
import { onError } from 'src/common/middleware';

export default function VideoInfo(req: Request, res: Response<any>, next: NextFunction) {
    if (req.query.url && typeof req.query.url === "string") {
        (async (url: string) => {
            try {
                const info = await ytdl.getInfo(url);
                info.formats = info.formats.filter((format) => {
                    const {hasVideo, hasAudio, qualityLabel, contentLength} = format;
                    return hasVideo && hasAudio && qualityLabel !== null && contentLength !== null;
                });

                if (info.formats.length) {
                    res.json(info);
                    

                } else {
                    res.status(404).send();
                }
            } catch (e) {
                res.status(500).send();
                onError(e as Error);
            }
        })(req.query.url);
    } else {
        res.status(400).send();
    }
}