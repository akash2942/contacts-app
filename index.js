const express = require('express');
const path = require('path');
const port = 8000;
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('assets'));

/* app.use(function(req,res,next){
    req.something = "ajay";
    // console.log("Middleware 1 called");
    next();
})

app.use(function(req,res,next){
    console.log(req.something);
    next();
}) */ 

var contactList = [
    {
        name : "Abhilash",
        phone : 1234567890
    },
    {
        name : "Satyam",
        phone : 987654321
    }
]

app.get('/', function(req,res){
    // res.send('Hello');
    // console.log(req.something + "else");

    return res.render('home', {
         title: "First Webpage",
         contact_list: contactList
        });
})

app.get('/practice', function(req,res){
    return res.render('practice',
    { title : "Second Webpage"});
})

app.post('/create-contact', function(req,res) {
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.phone); 
    
    contactList.push(
        {
            name: req.body.name,
            phone: req.body.phone
        }
    ); 

    return res.redirect('/');
});

// app.get('/practice2', function(req,res){
    // return res.render('practice2', { title:"Third Webpage"});
// })

app.get('/delete-contact/', function(req,res){
    console.log(req.query);
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
     if(contactIndex != -1){
         contactList.splice(contactIndex, 1);
     }
    
     return res.redirect('back');
})

app.listen(port, function(err){
    if (err) {console.log('Error in running the server', err);}

    console.log('Yup My express server is running', port);
})