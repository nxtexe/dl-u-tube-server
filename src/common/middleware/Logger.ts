import {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import path from 'path';
import AppServer from '@AppServer';

export function onError(error: NodeJS.ErrnoException | Error | null) {
    const errorLogPath = [path.resolve(), 'logs', 'error.log'];
    if (!error) return; 
    fs.writeFile(
        path.join(...errorLogPath),
        error.message + '\n' || 'Log failure\n',
        {flag: 'a+'}, 
        (error) => {
            console.log(error);
        }
    );
}

export function Logger(req: Request, res: Response, next: NextFunction) {
    queueMicrotask(() => {
        const log = `[${req.protocol.toUpperCase()}/${req.httpVersion} ${req.method} ${res.statusCode}] ${req.url} - ${new Date().toUTCString()} | ${req.headers['x-forwarded-for'] || ''} ${req.headers['user-agent']}\n`;
        if (AppServer.instance.app.get('env') === 'production') {
            // log results to local log file. Likely to be sym-linked to a folder outside of a docker container in prod
            const accessLogPath = [path.resolve(), 'logs', 'access.log'];
            fs.writeFile(path.join(...accessLogPath), log, {flag: 'a+'}, onError);
        } else {
            console.log(log);            
        }
    });
    return next();
}

export default Logger;