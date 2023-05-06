import {Request, Response, NextFunction} from 'express';
import AppServer from '@AppServer';

export function Root(req: Request, res: Response) {
    // res.render('index.njk', {appName: AppServer.instance.app.get('appName'), msg: 'Hello World', query: JSON.stringify(req.query)});
    res.send("Server Running!");
}

export default Root;