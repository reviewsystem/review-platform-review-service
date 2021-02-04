const express = require('express')
const fs = require('fs')
const review = require('./review.json')

const app = express()

app.use(express.json())

var obj = {
    review: []
}

app.post('/postReview', (req, res) => {

    const username = req.query.username;
    const subjectTitle = req.query.subjectTitle;
    const reviewTitle = req.query.reviewTitle;
    const reviewBody = req.query.reviewBody;

    let user = {
        Username: username,
        SubjectTitle: subjectTitle,
        ReviewTitle: reviewTitle,
        ReviewBody: reviewBody,
        TimeStamp: Date()
    }

    if(username === '' || subjectTitle === '' || reviewTitle === '' || reviewBody === ''){
        res.send("Please enter all details.")
    } else {
        fs.readFile('review.json', 'utf8', function readFileCallback(err, data1){
            if(err) throw err;
            else {
                obj = JSON.parse(data1)
                obj.review.push(user)
                var data = JSON.stringify(obj, null, 2)
                fs.writeFileSync('review.json', data, 'utf8')
                res.send("Review has been posted successfully.")
            }
        });
    }
})

app.get('/getReview', (req, res) => {
    fs.readFile('review.json', 'utf8', function readFileCallback(err, data){
        if(err) throw err;
        else{
            obj=JSON.parse(data)

            var searchname=function(reviewData, searchValue){
                var result=[];
                var flag;
                if(searchValue === '') result.push("Please Enter some values.");
                else{
                    for(var i = 0; i < reviewData.length; i++) {
                        if (reviewData[i]['ReviewTitle'].indexOf(searchValue)>-1){
                            flag = 0;
                            result.push(reviewData[i]['ReviewTitle']);
                        }
                    }
                    if(flag != 0) result.push("No items found.");
                }
                return result;
            }
            res.send(searchname(obj["review"], req.query.ReviewTitle));
        }
    })
})

app.listen(3000)