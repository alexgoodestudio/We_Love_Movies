const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// If the ID is incorrect, return a 404
//if id is valid, store in res.locals
async function reviewExists(re,res,next){
    const {reviewId} = req.params
    const review = await service.read(reviewId)
    if(review){
        res.local.review = review
    }else{
        next({
            status: 404, message:`Review can not be found`
        })
    }
}

//------------------------------------------------------
//needs to be able to return all reviews for a movie
//needs to be able to return specific review of movie
async function list(req, res, next){
   
    }

// **Hint:** Since the test requires a PUT method, you can update the review in the following manner:

// ```js
//   const updatedReview = {
//     ...response.locals.review,
//     ...request.body.data,
//     review_id: response.locals.review.review_id,
//   };
//   const data = await service.update(updatedReview);

module.exports = {
    list: asyncErrorBoundary(list),
    update: asyncErrorBoundary(update),
    delete: asyncErrorBoundary(destroy)\
}