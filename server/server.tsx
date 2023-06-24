import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import store from '../src/store';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/utils/createEmotionCache';
import Router from '../src/router/Router';
import cookies from 'cookie-parser';
import verifyJwt from './middlewares/verifyJwt';
import { s3 } from './s3';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cookies());
app.use(express.json());
app.use(fileUpload({}));

const theme = createTheme();

app.get( /\.(js|css|map|ico|woff|woff2)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

app.post('/upload', [verifyJwt, async (req, res) => {
    try {
        const { name, type } = req.body;

        if (name.split('/')[0] !== req.user.id) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const fileParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: name,
            Expires: 600,
            ContentType: type,
        };

        const url = await s3.getSignedUrlPromise('putObject', fileParams);
        res.status(200).json({ url });
    } catch (e) {
        res.status(400).json({ message: e });
    }
}]);

app.get('*', [verifyJwt, async (req, res) => {
    res.socket.on('error', (error) => console.log('Fatal', error));

    const preloadedState = store.getState();

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    res.write(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Crash course</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />`
    );

    const stylesCache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(stylesCache);

    const html = ReactDOMServer.renderToString(
        <CacheProvider value={stylesCache}>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <CssBaseline />
                    <StaticRouter location={req.url}>
                        <Router />
                    </StaticRouter>
                </Provider>
            </ThemeProvider>
        </CacheProvider>,
    );

    const emotionChunks = extractCriticalToChunks(html);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    res.write(`${emotionCss}
        </head>
          <body>
            <div id="root">`
    );

    res.write(html);

    res.write(`</div>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\u003c')}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>`);

    res.end();
}]);

app.listen( '9000', () => {
    console.log( 'Express server started at <http://localhost:9000>' );
} );
