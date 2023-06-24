import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import store from '../../src/store';
import usersSlice from '../../src/store/usersSlice';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user: { id: string };
        }
    }
}

const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
    const { accessToken } = req.cookies;

    if (['/login', '/register'].includes(req.path)) {
        return next();
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        res.status(500).send('Something went wrong');
        return;
    }


    if (!accessToken) {
        return res.redirect(`/login?from=${req.url}`);
    }

    jwt.verify(accessToken, secretKey, (err: VerifyErrors | null, user?: JwtPayload | string) => {
        if (err) {
            return res.redirect(`/login?from=${req.url}`);
        }

        req.user = user as { id: string };

        store.dispatch(usersSlice.actions.setAuthorized(true));

        next();
    });
}

export default verifyJwt;
