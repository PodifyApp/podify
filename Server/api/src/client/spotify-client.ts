import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const {
    SPOTIFY_CLIENTID,
    SPOTIFY_CLIENTSECRET
} = process.env

let access_token: string

const Spotify = {
    getAccessToken() {
        if (access_token) {
            return access_token;
        } else {
            axios({
                url: 'https://accounts.spotify.com/api/token',
                method: 'post',
                params: {
                  grant_type: 'client_credentials'
                },
                headers: {
                  'Accept':'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                  username: SPOTIFY_CLIENTID!,
                  password: SPOTIFY_CLIENTSECRET!
                }
            }).then(function(response) {
                //console.log(response);
                //console.log(response.data.access_token);
                access_token = response.data.access_token
            })//.catch(function(error) {});
        }
    }
}

const config = {
    baseURL: 'https://api.spotify.com/v1',
    headers: { 
                'Content-Type': 'application/json',
            },
}

class SpotifyClient {
    access_token = Spotify.getAccessToken();
    //console.log(access_token)
    instance: any

    constructor() {
        this.instance = axios.create(config)

        this.instance.interceptors.request.use((config: { headers: { Authorization: string; }; }) => {
            config.headers.Authorization = `Bearer ${access_token}`;
    
            return config
        })
    }

    get(path:any) {
        return this.instance.get(path);
    }
}
export default new SpotifyClient