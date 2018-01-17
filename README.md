# :newspaper: Newsy
This is a `Node.js` &amp; `MongoDB` webapp that web-scrapes news data from the [San Diego Reader](http://www.sandiegoreader.com/) and allows users to comment about what they have read. Users can also delete unwanted comments.

Check it out: [Newsy](https://newsy1.herokuapp.com/)!


## Functionality
The app uses `express` to serve routes and `mongoose` to interact with a `MongoDB` database.

Then `handlebars` provides templating for each article. The app also uses `jQuery` and `AJAX` to help with making post requests.

And for webscraping, the app uses the `request` and `cheerio` node packages. 


## Cloning down the repo
If you wish to clone the app down to your local machine...
  1. Ensure that you have MongoDB set up on your laptop
  2. Once you are set up, `cd` into this repo and run `npm install`.
  3. Then open another bash or terminal window and run `mongod`
  4. Run the script with `node server.js`.
  5. Navigate to `localhost:3000` in your browser.


#### Note that the web scraping occurs on the `/scrape` route.
#### On visiting the index route, `/`, express redirects to `/scrape` and then `/articles` routes