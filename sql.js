const http = require("http")
// const sql = require("mysql")

// const con = sql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"app"
// });

// con.connect((e)=>{return e})

// con.query("",[,d,sd],cas)
function sqlPromise(conn,query,entries = []){
    return new Promise((resolve,reject)=>{
        const sql = require("mysql")

        const con = sql.createConnection(conn);
        con.connect((e)=>{return e})
        con.query(query,entries,(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

async function users(){
    const con = {
        host:"localhost",
        user:"root",
        password:"",
        database:"app"
    };
    query = "select * from user"
    const users = await sqlPromise(con,query);
    console.log(users)
}

users()