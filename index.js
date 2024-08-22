const oj = require("ojparty")
//const oj = require("./ojp/index")
const app = oj.ojparty.app();
const con = {
    host:"localhost",
    password:"",
    user:"root",
    database:"app"
}
app.settings({
    serveStatic:true,
    hideFiles:[
        '/index.js'
    ],
    404:'404.html'
});
app.get("/logout",(req,res)=>{
    req.unsetSession('userId')
    res.setHeader("Location","/");
    res.statusCode = 301
    res.end();
})
app.get("/",(req,res)=>{
   if(req.session.userId == undefined){
    res.setHeader("location","/signin");
    res.statusCode = 301;
    res.end();
   }else{
   
    const data = {
        pageTitle:"Trust Coin - Leading Cryptocurrency Mining Solutions",
        bal:"31,300"
    }
    
    res.ojp('index.html',data)
    res.end()
   }
});


app.get("/signup",(req,res)=>{
    res.ojp('signup.html')
    res.end()
});
app.post("/signup",async (req,res)=>{
    const {username,email,password,ref} = req.body; 
    const userId = oj.ojparty.utill.random("mix",23);
    const otp = oj.ojparty.utill.random("num",6);
   const query = await req.sql(con,"INSERT INTO `user`(`user_id`, `username`, `email`, `password`,`otp`, `ref`, `last_visit`) VALUES ('"+userId+"','"+username+"','"+email+"','"+password+"','"+otp+"','"+ref+"','"+new Date().getTime()+"')");
   req.setSession('userId',userId)
   res.setHeader("Location","/");
   res.statusCode = 301
   res.end()
});

app.get("/signin",(req,res)=>{
   // console.log(req.session.userId)
    res.ojp('signin.html');
    res.end()
});

app.post("/signin",async (req,res)=>{
    const {login,password} = req.body; 
    const query = await req.sql(con,"SELECT * FROM user WHERE email='"+login+"' && password='"+password+"' || username='"+login+"' && password='"+password+"' ")

    if(query.length > 0){
    req.setSession('userId',query[0]['user_id'])
    res.setHeader('Content-Type','text/json')
    var result = `{"status":1,"error":""}`
    res.send(result);
   }else{
    res.setHeader('Content-Type','text/json')
    var result = `{"status":0,"error":""}`
    res.send(result);
   }  
});


app.listen(167)