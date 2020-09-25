import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import { REDIS_OPTIONS, APP_PORT } from './config'
import { createApp } from './app'
import "reflect-metadata"
import { createConnection } from 'typeorm'

;(async () => {

    await createConnection()

    const RedisStore = connectRedis(session)

    const client = new Redis(REDIS_OPTIONS)

    const store = new RedisStore({ client })
    
    const app = createApp(store)

    app.listen(APP_PORT, () => console.log(`🚀 => http://localhost:${APP_PORT}`))
})()