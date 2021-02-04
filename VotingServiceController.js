const Review = require("./Models/Review")
const HandleVoteEventController = (req,res)=>{
    const reviewId = req.params.reviewId;
    const event = req.body
    const EVENT_TYPE = event.EVENT_TYPE
    const payload = event.payload


    //TODO : Handle user management to prevent duplicates
    if(EVENT_TYPE === "UP_VOTE" ){
       Review.findOneAndUpdate({_id:reviewId},{ $inc: {  upVotes:1 } },(err,result)=>{
           if(err){
               return res.json({success:false, message:"Could not vote"})
           }
       })

    }
    else if(EVENT_TYPE === "DOWN_VOTE"){
        Review.findOneAndUpdate({_id:reviewId},{ $inc: {  downVotes:-1 } },(err,result)=>{
            if(err){
                return res.json({success:false, message:"Could not vote"})
            }
        })
    }
    else{
        return res.json({success:false, message:"Could not vote"})
    }
    return res.json({success:true, message:"voted"})
    
}