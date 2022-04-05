import {Request, Response, NextFunction} from 'express';
import ytdl from 'ytdl-core';
import { onError, ProxyLocals } from 'src/common/middleware';


export default function VideoInfo(req: Request, res: Response<any, ProxyLocals>, next: NextFunction) {
    if (req.query.url && typeof req.query.url === "string") {
        (async (url: string) => {
            try {
                // const agent = res.locals.agent;
                // const info = await ytdl.getInfo(url, {
                //     // requestOptions: {agent}
                // });
                // const formats = info.formats.filter((format) => {
                //     return format.itag === 18;
                // });

                // if (formats.length) {
                //     // get content length
                //     const [format] = formats;
                    
                    
                //     res.json({
                //         author: info.videoDetails.author.name,
                //         thumbnails: info.videoDetails.thumbnails,
                //         duration: format.approxDurationMs,
                //         title: info.videoDetails.title,
                //         contentLength: format.contentLength
                //     });

                // } else {
                //     res.status(404).send();
                // }
                res.json({"author":"BabyKeemVEVO","thumbnails":[{"url":"https://i.ytimg.com/vi/1yPxQ0CSc34/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC-Sr_69xM1OMzPzCEEiWAVEwChmQ","width":168,"height":94},{"url":"https://i.ytimg.com/vi/1yPxQ0CSc34/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBrskoenJ4yBu5RrFYRKprpBQCzkg","width":196,"height":110},{"url":"https://i.ytimg.com/vi/1yPxQ0CSc34/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD1qrFlE73Wgd9ng3f2LebHtS6iHA","width":246,"height":138},{"url":"https://i.ytimg.com/vi/1yPxQ0CSc34/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLADF21zRiOXKywHAnVEQVQ5xlYzFw","width":336,"height":188}],"duration":"272207","title":"Baby Keem - trademark usa (Official Audio)","contentLength":"7192827"});
            } catch (e) {
                res.status(500).send();
                onError(e as Error);
            }
        })(req.query.url);
    } else {
        res.status(400).send();
    }
}