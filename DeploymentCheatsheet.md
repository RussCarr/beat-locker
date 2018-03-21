SETTING UP THE SERVER SIDE

1 copy package.json from server folder to top level of project, change the entry point and start script to point to server/index.js and add engines below dependencies

 "engines": {
   "node": "^8.0.0",
   "npm": "^5.0.0"
 }

2 inside the index.js add this line under urlencoded: server.use(express.static(__dirname + "/../public/dist")) it has to point to your static files once youve built them
 and change the port to var port = process.env.PORT || 3000;

3 add your heroku app to your whitelist(exact url) in heroku click open app and copy the web url.


SETTING UP THE FRONT END

1 inside the store update your axios request builder, use this fancy ternary to be able to use your localhost when testing, and heroku server when running online

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//zdkanban.herokuapp.com/' : '//localhost:3000/';

let api = axios.create({
 baseURL: baseUrl + 'api',
 timeout: 4000,
 withCredentials: true
})

let auth = axios.create({
 baseURL: baseUrl,
 timeout: 4000,
 withCredentials: true
})

2 On the command line: npm run build to create your static front end files this creates the dist folder

3 notice that in vs code your dist folder is grey, .gitignore is ignoring that folder but we need to push it to heroku so we remove it from the gitignore(s).


SETTING UP HEROKU

1 go to heroku and make an account

2 Create a new app

3 heroku login from command line

4 Add heroku remote repo to project on cmd line:   heroku git:remote -a kanbannana

5 git add * then git commit -m "build for heroku" then git push heroku master