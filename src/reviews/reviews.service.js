const knex = require("knex");

function list(){
return knex("reviews")
.select("*")
}

//read function to read all reviews for a specific movie
function read(reviewId){
return knex("reviews")
.select("*")
.where({review_id: reviewId })
.first()
}

//need to join reviews and critics on critic_id
//needs updatedReview prop passed to it
function update(updatedReview){
return knex("reviews as r")
.select("*")
.join("critics as c", r.critics_id, c.critics_id)
.update(updatedReview, "*")
.then((updatedReview) => updatedReview[0]) 
}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }

module.exports={
    list,
    read,
    update,
    delete: destroy,
}

