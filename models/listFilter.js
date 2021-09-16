const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

//defines query for user list filtering
const listQuery = new mongoose.Schema({
    queryPermission:{
        type: String
    },
    queryEmail:{
        type: String
    }
})

module.exports = mongoose.model('query for list retrieval', listQuery)