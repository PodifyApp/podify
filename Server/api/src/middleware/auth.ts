import { Request, Response, NextFunction } from "express";
import { isLoggedIn, logOut } from '../auth'
import { Unauthorized, BadRequest } from "../errors";
import { SESSION_ABSOLUTE_TIMEOUT } from "../config";

export const guest = (req: Request, res: Response, next: NextFunction) => {
    if (isLoggedIn(req)) {
        return next(new BadRequest('You are already logged in'))
    }

    next()
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (!isLoggedIn(req)) {
        return next(new Unauthorized('You must be logged in'))
    }

    next()
}

//Force the user to re login after 6 hours session
export const active = async (req: Request, res: Response, next: NextFunction) => {
    if (isLoggedIn(req)) {
        const now = Date.now()
        const { createAt } = req.session as Express.Session

        if (now > createAt + SESSION_ABSOLUTE_TIMEOUT) {
            await logOut(req, res)

            return next(new Unauthorized('Session expired'))
        }
    }
}