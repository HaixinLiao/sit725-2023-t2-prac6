let client = require('../dbConnection');

let collection = client.db().collection('Cats');

function postCat(cat, callback) {
    collection.insertOne(cat,callback);
}

function getAllCats(callback) {
    collection.find({}).toArray(callback);
}

function deleteCat(catId, callback) {
    collection.deleteOne({ _id: catId }, callback);
}


module.exports = {postCat,getAllCats,deleteCat}