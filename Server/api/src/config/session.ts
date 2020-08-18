import { SessionOptions } from 'express-session'
import { IN_PROD } from './app'

const ONE_HOUR = 1000 * 60 * 60 //meaning 1000 mil secs x 60 secs x 60

const SIX_HOURS = ONE_HOUR * 6

const { env } = process

export const {
    SESSION_SECRET = 'Keep secret',
    SESSION_NAME = 'sid',
    //User session is set to 1 hour, with each request to the API the sessions re new to 1 hour, 
    //after 1 hour with no request to the API the user is kicked out (automatically logout) meaning the user have to login again to continue using the system
    SESSION_IDLE_TIMEOUT = ONE_HOUR,
} = env

//This force the user to re login after 6 hours session, this value can be a string or undifined, 
//if it's undefined then default to SIX_HOURS, and also cast it to int
export const SESSION_ABSOLUTE_TIMEOUT = +(env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS)

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
      maxAge: +SESSION_IDLE_TIMEOUT, //The '+' mean parse/convert the value to int
      secure: IN_PROD,
      sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
}