const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//if id is valid, store in res.locals
// If the ID is incorrect, return a 404
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  } else {
    return next({
      status: 404,
      message: "Review cannot be found.",
    });
  }
}

//------------------------------------------------------
//needs to be able to return all reviews for a movie
//needs to be able to return specific review of movie
async function list(req, res, next) {
  try {
    const data = await service.list();
    if (!data || data.length === 0) {
      return next({
        status: 404,
        message: "No reviews found",
      });
    }
    res.json({ data });
  } catch (error) {
    next(error);  // General error handling
  }
}

// **Hint:** Since the test requires a PUT method, you can update the review in the following manner:


async function destroy(req, res, next) {
  const { review_id } = res.locals.review;
  await service.destroy(review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const { review_id } = res.locals.review;
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

  module.exports = {
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  };
  

