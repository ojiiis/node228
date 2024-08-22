var tapAni = false;
const root = "http://localhost:511";
//const root = "http://localhost/coin";
function k(n){
    if(n > 1000){
        var t = n/1000;
        var t = (t % 1 === 0)?t:t.toString().split(".")[0]+"."+t.toString().split(".")[1][0]
        return t+"k";
    }else if(n > 1000000){
        return n.toString()[0]+"m";
    }
}
if(document.getElementById("tap-box")){
document.getElementById("tap-box").addEventListener("click",function(){
if(tapAni)
return;
tapAni = true, tap = this;
var content = document.getElementById("tap-box-content"),dir = "up",moved = 270;
var aniTap = setInterval(function(){
    if(dir == "up")  {
    moved += 5;
    if(moved > 290){
        dir = "down";
        moved = 290;
    } 
    }else{
     moved -= 5;   
     if(moved < 270){
        clearInterval(aniTap);
        if(energy){
            var aA = document.createElement("div");
            aA.classList.add("add-coin");
            aA.innerText = `+${perClick}`;
            tap.appendChild(aA);
            animateAdd(aA);
            balance += perClick;
            document.getElementById("bal").innerText = new Intl.NumberFormat().format(balance);
            tapAni = false;
            moved = 270;
            energy -= 5;
            document.getElementById("energy-used").innerText = new Intl.NumberFormat().format(energy);
           //run adding balance logic//
            addAction();
        }
     
    } 
    }
    
    content.style.width = `${moved}px`;
    content.style.height = `${moved}px`;
},20);
 
});
}

var tapped = 0, lastTap;
function addAction(){
    tapped += 1;
    lastTap = new Date().getTime();
    setTimeout(function(){
        sendAction();
    },500);
}
var runAction;
function sendAction(){
    runAction = setInterval(function(){
        now = new Date().getTime();
    if((now - 1000 * 2) > lastTap && tapped > 0){
        tap = tapped;
        tapped = 0; 
        lastTap = new Date().getTime();
        fetch(root+"/tapped",{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Trust-Id':localStorage.getItem("trust-id")
        },
        body:JSON.stringify({
           "tap":tap
        })
    }).then(r=>r.json()).then(r=>{
        console.log(r)
    });
}
},500)
}
function animateAdd(x){
   var limit = Math.floor((Math.random() * 150) + 40), s = 0;
  var aA =  setInterval(function(){
        s += 2;
        if(s > limit){
        x.remove();
        clearInterval(aA);
        }
        x.style.top = `${-1*s}px`;
    },20);
}
 
var balance = 0;
var energy = 0;
var perClick = 0;
var parser = document.createElement("a"); 
parser.href = window.location.href;


// var b = document.getElementsByTagName("form");
// for(i = 0 ; i < b.length; i++){
//     b[i].addEventListener("submit",async function(e){
//         e.preventDefault()
//         result = await fetch(this.action,{
//             method:"POST",
//             body:new FormData(this)
//         });
//         const res = await result.json();
//         if(res.status){
//             location = "/"
//         }
//         })
// } 
