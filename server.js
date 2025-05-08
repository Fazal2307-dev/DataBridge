const express= require('express')
const path = require('path')
const mysql2 = require('mysql2')
const app = express();

 const database = mysql2.createConnection({ 
    host:"127.0.0.1",
    user:"root",
    password:"fazal2307",
    database:"users"
})
database.connect((error) =>{
    if(error){
        return  console.error(error)
    }
    console.log("My sql database is connected....")
})
// Middle ware for parsing the 
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
 const htmlfile = path.join(__dirname,'index.html')
 res.sendFile(htmlfile)
})
app.post('/handleform',(req,res)=>{
    try{
      const {name,email,password} = req.body;
      const SQL_COMMAND = "INSERT INTO usersdetails (name,email,password) VALUES (?,?,?)";
      database.query(SQL_COMMAND,[name,email,password],(err,result)=>{
        if(err){
            console.error(err);
            return res.send("Registration unsuccessful");
        }
        console.log(result);
        res.send("Registration successful")
      })

    }
    catch(err){
        console.error(err);
        res.send("Registration unsuccessful")
    }
})
app.listen(5000,()=>{
    console.log("server listening.....")
})