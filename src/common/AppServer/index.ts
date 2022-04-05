import { Server } from "http";
import express, {Application} from 'express';
import { Logger } from "../middleware";
import path from 'path';
import nunjucks from 'nunjucks';
import favicon from 'serve-favicon';

export default class AppServer {
    private static _app: Application;
    private static _instance: AppServer;
    private _server: Server | null = null;

    private constructor() {}

    static initialise(app: Application): AppServer {
        if (!AppServer._instance) {
            AppServer._instance = new AppServer();
            AppServer._app = app;
            AppServer.configure(app);
        }
        
        return AppServer._instance;
    }

    static get instance(): AppServer {
        if (!AppServer._instance) {
            throw new Error(
                "Server Instance Invalid.\n"
                +
                "If you are trying to access the instance outside of a middleware callback, make sure to initialise the AppServer API."
            );
        }
        return AppServer._instance;
    }

    open(port: number = 5000, callback?: (() => void) | undefined) {
        this._server = AppServer._app.listen(port, callback || (() => console.log(AppServer._app.settings.env)));
    }

    close(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this._server !== null) {
                this._server.close((error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                });
            } else {
                reject(new Error("App Did Not Start"));
            }
        });
    }

    private static configure(app: Application) {
        const base = app.get('__dirname'); // where app is being run is base url
        app.use(express.static(path.resolve(base, 'templates')));
        app.use(favicon(path.resolve(base, 'public', 'favicon.ico')));
    
        nunjucks.configure(path.resolve(base, 'templates'), {
            autoescape: true,
            express: app,
            watch: app.settings.env === "development"
        });
    
        app.set('appName', 'dl-u-tube');
        app.set('trust proxy', app.settings.env === "production"); // set to true if app is working behind reverse proxy
        app.set('x-powered-by', false); // hides Express from response headers
    
        app.use(Logger); // logger middleware
    }

    get app() {
        return AppServer._app;
    }
}