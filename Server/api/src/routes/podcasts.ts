import Router from 'express'
import * as spotifyService from '../services/spotify-service'
import { auth, catchAsync } from '../middleware';

const router = Router()

//Maks sure to run this again and again to allow it to work, 
//also the authorization bearer doesn't work with POSTMAN as sending the bearer with the header, 
//with POSTMAN it uses the authorization from a different key and not from the headers keys
//Allow this route to only users who are logged in (auth role)
router.get('/show/:showId/:market?', auth, catchAsync(async(req, res, next) => {
    try {
        const podcast = await spotifyService.getShows(req.params.showId, req.params.market);
        res.json(podcast);
      } catch (error) {
        next(error);
    }
}))

//Allow this route to only users who are logged in (auth role)
router.get('/episodes/:showId/:market?', auth, catchAsync(async(req, res, next) => {
    try {
        const episodes = await spotifyService.getEpisodes(req.params.showId, req.params.market);
        res.json(episodes);
      } catch (error) {
        next(error);
    }
}))

//Allow this route to only users who are logged in (auth role)
router.get('/search/:term/:market?', auth, catchAsync(async(req, res, next) => {
    try {
        const podcasts = await spotifyService.getSearchedShow(req.params.term, req.params.market);
        res.json(podcasts);
      } catch (error) {
        next(error);
    }
}))

export default router