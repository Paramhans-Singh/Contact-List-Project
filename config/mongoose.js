const mongoose = require('mongoose');
// mongoose.connect('mongodb://0.0.0.0:27017/contacts_list_db' ,{mongoose.set('strictQuery', true);});

mongoose.connect("mongodb://0.0.0.0:27017/contacts_list_db", {useNewUrlParser: true});

mongoose.set('strictQuery', true);


const db = mongoose.connection;
db.on('error',console.error.bind(console,'error  connecting to db'));

db.once('open',function(){
    console.log('succesfully connected to database')
});