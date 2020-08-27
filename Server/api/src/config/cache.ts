import { RedisOptions } from "ioredis"
import dotenv from 'dotenv'

dotenv.config()

const {
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD
} = process.env

export const REDIS_OPTIONS: RedisOptions = {
    port: +REDIS_PORT!, //The '+' mean parse/convert the value to int meaning integer
    host: REDIS_HOST,
    password: REDIS_PASSWORD
}