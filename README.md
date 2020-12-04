# Open Movie Database (sample)

# About

This sample App is deployed on the following Heroku link:

[https://api-yearone.herokuapp.com/](https://api-yearone.herokuapp.com/)

It's a proof of concept that allows you to search for a movie title, click on the movie title for more information, and give that movie a thumbs up or thumbs down.

It utilizes [OMDB API](http://www.omdbapi.com/) to fetch metadata about each movie.

# Tech Stack

- React
- TypeScript
- WebPack
- Node.js
- Express.js
- PostgreSQL
- HTML/SCSS
- Heroku
- [OMDB API](http://www.omdbapi.com/)

# Instructions

The repository can be cloned to your local machine - though the PostgreSQL database will not work locally since the key is not stored in the repository. This means 'likes' and 'dislikes' will not persist.

Please make sure you have Node and Yarn installed.

```
git clone https://github.com/bhayashi/api-yearOne.git
```

Install dependencies.

```
yarn
```

### Development Mode

You can now quickly run the application in development mode - this command will automatically open a tab on your browser at [http://localhost:8080/](http://localhost:8080/).

```
npm run dev
```

### Production Mode

Alternatively, you can compile the TypeScript server files and bundle the rest of the application.

```
npm run postinstall
```

And then access the site on [http://localhost:3000/](http://localhost:3000/) after running the 'start' command.

```
npm start
```
