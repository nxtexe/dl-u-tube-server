import { NextFunction, Request, Response } from "express";

export function NotFound(req: Request, res: Response, next: NextFunction) {
    return res.status(404).send('404 Not Found');
}

export default NotFound;