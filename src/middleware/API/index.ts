import express from 'express';
import Video from './Video';
import VideoInfo from './VideoInfo';
import bodyParser from "body-parser";
import ValidateURL from './ValidateURL';

import * as crypto from 'crypto';
import { sign, verify } from 'src/common/crypto';
import Authentication from './Authentication';

const jsonParser = bodyParser.json({limit: '1000kb'});

export const APIRouter = express.Router();

APIRouter.use(Authentication);
APIRouter.post('/video', jsonParser, Video);
APIRouter.get('/video/info', VideoInfo);
APIRouter.get('/video/validate', ValidateURL);

export default APIRouter;
