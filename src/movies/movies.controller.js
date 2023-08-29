//write service file first
const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list will have two puropse:
  //- it will either display all movies
  //- it will display only movies where query param is true
async function list(req,res){
  const {is_showing} = query.params;
  if(is_showing){
    res.json({ data: await service.showingList() })
  }else{
    res.json({ data: await service.list() })
  }
}

//read validator
async function movieExists(req,res,next){
  const movieId = Number(req.params.movieId);
  const foundMovie = movies.find(movie => Number(movie.id === movieId.toString()))
  if(foundMovie){
    res.locals.movie= foundMovie;
    return next()
  }else{
    next({
      status:404,
      message:`Movie Id not found ${movieId}`
    })
  }
}

//read returns a single movie by id
//if given ID does not match respond with error message with a status 404
function read(req,res,next){
  res.status(200).send({data:res.locals.movie})
}

module.exports = {
    list:[asyncErrorBoundary(list)],
    read:[asyncErrorBoundary(movieExists),asyncErrorBoundary(read)]
};