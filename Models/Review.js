const mongoose = require("mongoose")
const ReviewSchema = mongoose.Schema({
    username:String,
    subjectTitle:String,
    reviewTitle:String,
    reviewBody:String,
    upVotes:{type:Number,default:0},
    downVotes:{type:Number,default:0},
    timeStamp:{type:Date, default:Date.now},
})

module.exports = mongoose.model("Reviews",ReviewSchema)