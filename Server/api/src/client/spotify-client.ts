import axios from 'axios'

const clientId = '93b2775e9c74415fa54369b84bcb0906';
const clientSecret = '30eeb5cfe7554290923c0d3a3b0daa26';
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
                  username: clientId,
                  password: clientSecret
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