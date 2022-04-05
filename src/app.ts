import express, {Application} from 'express';
import AppServer from '@AppServer';
import {Root, NotFound, APIRouter} from './middleware';

const app: Application = express();
app.set('__dirname', __dirname);

const server = AppServer.initialise(app);

app.get('/', Root);
app.use('/api', APIRouter);

app.get('*', NotFound); // 404

if (require.main === module) {
    server.open();
} else {
    AppServer.initialise(app);
    console.log("Ruuning app as module");
}