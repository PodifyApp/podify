import spotifyClient from '../client/spotify-client'

export const getShows = async(showId: string, market: string) => {
    //The client can specify the market, if no market is specified then default to 'MA'
    const { data } = await spotifyClient.get(`/shows/${showId}?market=${market || 'MA'}`);
    return data;
}

export const getEpisodes = async(showId: string, market: string) => {
    const { data } = await spotifyClient.get(`/shows/${showId}/episodes?market=${market || 'MA'}`);
    return data;
}

export const getSearchedShow = async(term: string, market: string) => {
    const { data } = await spotifyClient.get(`/search?q=${term}&type=show&market=${market || 'MA'}`);
    return data;
}