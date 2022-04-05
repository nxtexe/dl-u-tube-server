import express from 'express';
import { Proxy } from 'src/common/middleware';
import Video from './Video';
import VideoInfo from './VideoInfo';
import ImageProxy from './ImageProxy';

export const APIRouter = express.Router();

APIRouter.use(Proxy);
APIRouter.get('/proxy/image', ImageProxy);
APIRouter.get('/video', Video);
APIRouter.get('/video/info', VideoInfo);

export default APIRouter;
