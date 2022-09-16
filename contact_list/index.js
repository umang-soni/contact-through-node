
const express= require("express")
const path= require('path')
const port=8000;
const db=require("./config/mongoose")
const Contact=require("./models/contacts")
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded());
app.use(express.static('assets'))
//middleware
// app.use(function(req,res,next){
//     console.log("middleware ");
//     next();
// })
// app.use(function(req,res,next){
//     console.log("middleware2");
//     next();
// })
var contactList=[
    {
        name:"Arpan",
        phone:"111111111"
    },
    {
        name:"umang",
        phone:"8899797979"
    },
    {
        name:"shashwaat",
        phone:"7976686866"
    }
]


app.get('/',function(req,res){
 Contact.find({},function(err,newContacts){
    if(err){
        console.log("error in fetching documents")
        return;
    }
    return  res.render('home',{
        title:"my contact",
        contacts_list:newContacts

})
  
})

})




app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating contact");
            return;
        }
        console.log("****",newContact);
        return res.redirect("back");
    })
    
    
})
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params);

// })
app.get('/delete-contact',function(req,res){
  console.log(req.query);
  let id= req.query.id;
  Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log(err)
    console.log("there is an error  while deleting from the database")
    return;
    }
    res.redirect("back")
  })
  
})
app.listen(port,function(err){
    if(err){
        console.log("error is running on the server",err)
        return;
    }
    console.log("my express server is running on port",port)
})