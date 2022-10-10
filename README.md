# icecream-party

API key is kept in the App.js for easy start up to see the app, the API key should never be exposed this way. If you are experiencing issues accessing the API, you may need to visit: https://cors-anywhere.herokuapp.com/corsdemo and click the button to temporarily grant CORS anywhere access.

Additionally, the Yelp API limits to 50 requests per hour. In the event the rate limit is reached, please simply go into the `package.json` and look for the `start` `script`. Change the `PORT=3001` to a new number like `3001` and restart the app. You should be able to make new 50 requests now.