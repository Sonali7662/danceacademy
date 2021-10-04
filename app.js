const express=require("express");
const path =require("path")
const app =express();
const mongoose=require("mongoose")


mongoose.connect('mongodb://localhost/contactdance',{useNewUrlParser:true,},{useUnifiedTopology:true});
var bodyParser = require('body-parser')

const contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    date:String,
    about:String,
    phone:String,


});
var contact = mongoose.model('contact', contactSchema);
app.use('/static',express.static('static'))
app.use(express.urlencoded());
app.set('view engine','pug')
app.set('views',path.join(__dirname,"views"))
app.get('/home',(req,res)=>
{
    res.status(200).render('index.pug');

})
app.get('/contact',(req,res)=>
{
    res.render('contact.pug')

})
app.post('/contact',(req,res)=>
{
   var myData=new contact (req.body)
   myData.save().then(()=>{
       res.send("item has saved")
   }).catch(()=>{res.send("item has  not saved")})
})
app.listen(80)