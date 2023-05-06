import {Request, Response, NextFunction} from 'express';
import { verify } from 'src/common/crypto';

export default async function Authentication(req: Request, res: Response<any>, next: NextFunction) {
    const auth = req.headers["authorization"]?.replace(/^Basic\s*/, "");
    if (!auth) {
        return res.sendStatus(401);
    }

    const buffer = Buffer.from(auth, "base64");
    const [token, signature] = buffer.toString("utf-8").split(":");
    if (!token || !signature) {
        return res.sendStatus(400);
    }

    const isAuthenticated = await verify(token, signature);
    if (isAuthenticated) {
        return next();
    } else {
        return res.sendStatus(401);
    }
}