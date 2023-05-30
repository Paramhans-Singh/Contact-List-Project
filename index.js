const express = require("express");
const path = require('path');
const port = 7000;
const bodyParser = require('body-parser');
const db = require('./config/mongoose.js');
const Contact = require("./models/contact.js")

const app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use (express.static('assets'));


app.get('/', function(req,res){

    Contact.find({}, function(err,contact){
        if(err){
            console.log("error in fetching contacts");
            return;
        }
        return res.render('home',{
            title:"My Contact List",
            contact_list: contact
    })

    });
})


app.post('/create-contact',function(req,res){

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    } , function(err ,newConatct){
        if(err){
            console.log('Error is running',err);
        }
        console.log('******',newConatct);
        return res.redirect('back');
    });
});

app.get('/delete-contact',function(req,res){
        let id = req.query.id;

        Contact.findByIdAndDelete(id, function(err){
            if(err){
                console.log('error is runnning');
                return;
            }
            return res.redirect('back');
        })
});

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }

    console.log('yup! my express server is running on port:',port);
});           
