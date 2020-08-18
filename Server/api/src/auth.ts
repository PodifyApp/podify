import { Request, Response } from 'express'
import { SESSION_NAME } from './config'

//Determine if the request session already contains the userId, 
//if undefined is the value return false, if string is the value return true
export const isLoggedIn = (req: Request) => !!req.session!.userId

export const logIn = (req: Request, userId: string) => {
    req.session!.userId = userId //session can be undefined without using the app.user(session ...) that's why's better adding "!" by the session word
    req.session!.createdAt = Date.now() //this is useful so that we can kick the user after x hours of usage and force a re login
}

export const logOut = (req: Request, res: Response) => {
    new Promise((resolve, rejects) => {
        //Remove the user's session from Redis
        req.session!.destroy((err: Error) => {
            if (err) rejects(err)

            //Send a set cookie header which effectively unset the previous cookie
            res.clearCookie(SESSION_NAME)

            resolve()
        })
    })
}