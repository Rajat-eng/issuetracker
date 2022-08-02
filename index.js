const express=require('express');
require('dotenv').config();
const port=process.env.PORT || 8000;
const app=express();

const db=require('./config/mongoose');
const path=require('path');
//const session=require('express-session');

const sassMiddleware=require('node-sass-middleware');

const expressLayouts=require('express-ejs-layouts');
const { ppid } = require('process');


// app.use(session({
//     cookie:{maxAge:1000*60}
// }));

app.use(sassMiddleware({
    src:path.join(__dirname,'/assets/scss'),
    dest:path.join(__dirname,'/assets/css'),
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');


app.use(express.json());
app.use(express.text());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assets'));

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);

})

