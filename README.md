# Open Movie Database (sample)

This sample App is deployed on the following Heroku link:

[https://api-yearone.herokuapp.com/](https://api-yearone.herokuapp.com/)

<a href="https://user-images.githubusercontent.com/62862233/101227197-e6f20580-364b-11eb-9c57-cbf92a38b352.gif"><img src="https://user-images.githubusercontent.com/62862233/101227197-e6f20580-364b-11eb-9c57-cbf92a38b352.gif" title="omdb sample gif" alt="gif of open movie database" /></a>

# About

This App is a proof of concept that allows you to search for a movie title, click on the movie title for more information, and give that movie a thumbs up or thumbs down.

It utilizes [OMDB API](http://www.omdbapi.com/) to fetch metadata about each movie and a PostgreSQL database to store the number of likes and dislikes about each movie.

<a href="https://imgur.com/WMGhiKu"><img src="https://i.imgur.com/WMGhiKu.png" title="homepage" alt="homepage with movie title cards" /></a>

<a href="https://imgur.com/1RanvMh"><img src="https://i.imgur.com/1RanvMh.png" title="movie details page" alt="movie title card with details and poster of movie" /></a>

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

The repository can be cloned to your local machine - though the PostgreSQL database and OMDB API will not work locally without a .env file since the keys are not stored in the repository.

```
PG_URI=''
OMDB_API_KEY=''
```

Please make sure you have Node and Yarn installed.

```
git clone https://github.com/bhayashi/api-yearOne.git
```

Install dependencies.

```
yarn
```

## Development Mode

You can now quickly run the application in development mode - this command will automatically open a tab on your browser at [http://localhost:8080/](http://localhost:8080/).

```
npm run dev
```

## Production Mode

Alternatively, you can compile the TypeScript server files and bundle the rest of the application.

```
npm run postinstall
```

And then access the site on [http://localhost:3000/](http://localhost:3000/) after running the 'start' command.

```
npm start
```

# Database

The database consists of a 'movie_likes' table with a primary key column and columns for imdbID, Title, Likes, and Dislikes.

```
id  |  imdbid   |         title        | likes | dislikes
----+-----------+----------------------+-------+----------
  2 | tt0109040 | Inception            |     1 |        0
  5 | tt4244162 | Beta Test            |     0 |        1
  1 | tt0454349 | Inception            |     3 |        1
  3 | tt0112281 | Inception            |     2 |        0
  6 | tt0106611 | Cool Runnings        |     1 |        0
  7 | tt3850214 | Dope                 |     1 |        0
  9 | tt0309377 | Blood Work           |     0 |        1
 10 | tt4519400 | Check Point          |     0 |        1
```
