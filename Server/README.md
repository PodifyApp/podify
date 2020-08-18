# Installation
- Run ```npm install``` on Server/api directory
- Run ```npm run up``` on Server directory


# API Endpoints
|Method|URI|authenticated?|
|------|---|--------------|
|POST|api/v1/register|No|
|POST|api/v1/login|No|
|POST|api/v1/logout|Yes|
|GET|api/v1/user|Yes|
|GET|api/v1/podcasts/shows/:showId/:market|Yes
|GET|api/v1/podcasts/episodes/:showId/:market|Yes
|GET|api/v1/podcasts/search/:term/:market|Yes

* NB: ```/:market``` is optional 