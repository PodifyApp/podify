import { RedisOptions } from "ioredis"

const {
    REDIS_PORT = 6379,
    REDIS_HOST = 'localhost',
    REDIS_PASSWORD = 'Nt4VzWPtDhkCxESjXVJx'
} = process.env

export const REDIS_OPTIONS: RedisOptions = {
    port: +REDIS_PORT, //The '+' mean parse/convert the value to int meaning integer
    host: REDIS_HOST,
    password: REDIS_PASSWORD
}