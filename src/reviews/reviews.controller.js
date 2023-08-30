const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed")
//------------------------------------------------------

//if id is valid, store in res.locals
// If the ID is incorrect, return a 404
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(req.params.reviewId);
//   console.log(review, reviewId, "REVIEW!!~!~!!~!")
  if (review) {
    res.locals.review = review;
    return next();
  } 
    return next({
      status: 404,
      message: "Review cannot be found.",
    });
}
//------------------------------------------------------
async function read(req, res, next){
  res.json({data: res.locals.review});
}
//------------------------------------------------------

//needs to be able to return all reviews for a movie
//needs to be able to return specific review of movie

async function list(req, res, next) {
    const data = await service.list(req.params.movieId);
//     console.log(data,"LIST DATAAAAAAAA")
    res.json({ data });
}

//------------------------------------------------------

// **Hint:** Since the test requires a PUT method, you can update the review in the following manner:

async function destroy(req, res) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}
//------------------------------------------------------

async function update(req, res, next) {
  const { review_id } = res.locals.review;
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id:res.locals.review.review_id ,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

function hasId(req,res,next){
  if(req.params.movieId){
  return next()
  }
  methodNotAllowed(req, res, next)
}

function noId(req,res,next){
  if(req.params.movieId){
  return methodNotAllowed(req, res, next)
  }
  return next()
}

//------------------------------------------------------
  module.exports = {
    destroy: [noId, asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    list: [hasId, asyncErrorBoundary(list)],
    update: [noId, asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],

  };
  

