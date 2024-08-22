const http = require("http");
//const path = "C:/Users/Sam instructor/Desktop/app/"
function formData(req,callback){
    const rData = [];
    req.on("data",(c)=>{
        rData.push(c);
    });
    req.on('end',()=>{
        
       var resData,data = Buffer.concat(rData).toString();
       try{
        resData = JSON.parse(data)
       }catch(e){
        resData = data;
       }
       callback(resData)
    });
}

function formDataPromise(req){
    return new Promise((resolve,reject)=>{
        const rData = [];
    req.on("data",(c)=>{
        rData.push(c);
    });
    req.on('end',()=>{
        
       var resData,data = Buffer.concat(rData).toString();
       try{
        resData = JSON.parse(data)
       }catch(e){
        resData = data;
       }
       if(!resData || resData == undefined || resData == ""){
        reject('no data');
       }
       resolve(resData);
    });
    })
}

function readFile(path,callback){
    const fs = require('fs');
    fs.readFile(path,'utf-8',(err,data)=>{
        if(err) throw err;
        callback(data)
    })

}

function readFilePromise(path){
   return new Promise((resolve,reject)=>{
    const fs = require('fs');
    fs.readFile(path,'utf-8',(err,data)=>{
        if(err)  reject(err);
        resolve(data)
    })
   });
}

function serveFiles(req,res,){
return new Promise((resolve,reject)=>{
    const fs = require('fs');
    const path = require('path')
     var url = req.url.split("?")[0];
     var filePath = path.join(__dirname,decodeURIComponent(url.slice(1,url.length)));
    fs.stat(filePath,async (err,stat)=>{
        if(err) reject(0);
       if(stat && stat.isDirectory()){
        reject(0)
       }else{
        //var fileUrl = path.basename(filePath)
       try{
        const data = await readFilePromise(filePath);
        res.write(Buffer.from(data))
        resolve(1)
       }catch(e){
        res.write('')
        resolve(1)
       }
       }
       });
})

}
        // const data = await formDataPromise(req);
        // console.log(data)
        // formData(req,(data)=>{
        //  console.log(data)
        //  res.end();
        // });
//         readFile('signin.html',(data)=>{
// console.log(data);
// res.end();
//         })
// const data = await readFilePromise('signin.html');
// console.log(data)
const server = http.createServer(async (req,res)=>{
  
   if(req.method == "GET"){
    if(req.url == "/"){
      //  const css = await readFilePromise('style.css');
      //  const javascript = await readFilePromise('script.js');
        const page = await readFilePromise('index.html');
        // res.write('<style>');
        // res.write(css);
        // res.write('</style>');
        
        res.write(page);
        // res.write('<script>');
        // res.write(javascript);
        // res.write('</script>');
        res.end();
    }else{
        try{
            const path = require('path')
            const page = await readFilePromise(path.join(__dirname,req.url.split("?")[0]));
            res.setHeader('Content-Type',`plain/${path.basename(req.url.split("?")[0]).split(".")[1]}`)
            res.write(Buffer.from(page));
            res.end();
        }catch(e){
            //console.log(e)
        }
    }
   }
});
server.listen(2000);