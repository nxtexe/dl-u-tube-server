import { NextFunction, Request, Response } from 'express';
import HttpsProxyAgent from 'https-proxy-agent';


const proxy = 'http://95.31.5.29:54651';
const agent = HttpsProxyAgent(proxy);

export interface ProxyLocals {
    agent: typeof agent;
}

export function Proxy(req: Request, res: Response<any, ProxyLocals>, next: NextFunction) {
    res.locals.agent = agent;
    return next();
}

export default Proxy;