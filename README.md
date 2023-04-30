# FS Project 2 REST API - Movie database

This REST API web application uses MongoDB as a database and utilizes mongoose in the database queries.

The routes for this API are:
 /api/getall
  This route returns all the movies in the database, but will limit it to only the first five.
 
 /api/:id
  This route returns a movie that is searched byu its ID, i.e. The ID for the movie "Interstellar" is "573a13b9f29313caabd4ddff", so when searching for                     /api/573a13b9f29313caabd4ddff, it will only return the movie Interstellar.
  
 /api/title/:text
  This route returns a movie that has the text search string included in it, but it will limit it to only the first five. I.e. when searching for /api/title/trek, it       will return the first five movies in the database that have the "trek" somewhere in the title.
   
 /api/add
  This route lets you add a new movie to the database. The "title" and "year" fields are required fields and the "poster" field is optional.
   
 /api/update/:id
  This route lets you update a movie in the database using its ID.
  
 /api/delete/:id
  This route lets you delete a movie in the database using its ID.
  
  The application will console log information about what is currently happening and print status codes during every activity.
  
 
