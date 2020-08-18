import express from 'express'
import session, { Store } from 'express-session'
import { SESSION_OPTIONS } from './config'
import { register, login, user, podcasts } from './routes'
import { notFound, serverError, active, catchAsync } from './middleware'

export const createApp = (store: Store) => {
    const app = express()

    app.use(express.json())

    app.use(
        session({
            ...SESSION_OPTIONS,
            store
        })
    )

    const prefix = '/api/v1'
    
    app.use(prefix, user)
    
    app.use(prefix, login)
    
    app.use(prefix, register)

    app.use(prefix + '/podcasts', podcasts)

    app.use(notFound)

    app.use(serverError)

    app.use(catchAsync(active))
    
    return app
}