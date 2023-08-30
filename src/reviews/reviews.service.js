const knex = require("knex");

//need to join reviews and critics on critic_id
function list() {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*");
}

//read function to read all reviews for a specific movie
function read(reviewId){
return knex("reviews")
.select("*")
.where({review_id: reviewId })
.first()
}

//needs updatedReview prop passed to it
function update(reviewData) {
  return knex("reviews as r")
    .where({ review_id: reviewData.review_id })
    .update(reviewData, "*")
    .then((updatedRows) => updatedRows[0]);
}

function destroy(review_id) {
    return knex("reviews").where({id: review_id }).del();
  }
  

module.exports={
    list,
    read,
    update,
    delete: destroy,
}

