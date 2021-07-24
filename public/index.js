
var wdata=null;
var dv,btn;
var cityName;
var state=false;
document.querySelector(".inputButton").addEventListener("click",function(){
if(state==false){
    state=true;
cityName=document.querySelector("input").value;

const url=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${appID}`


// Here go to url and fecth the HTTP response if the status code is ok then extract 
// Promise from the HTTP response using response.json() and then extract data. 
fetch(url).then((res)=>res.json()).then(function(data){ 
    put(data);
    return;
}).catch(function(error){
    console.log(error);
})
}
});

function put(data){
    wdata=data;
    let imageURL=`http://openweathermap.org/img/wn/${wdata.weather[0].icon}@2x.png`;
    // dv=document.createElement("div");
    // dv.classList.add("container");
    // $(".userInput").after(dv);
    // $(".container").hide().slideDown();
//     var str="";
//     str+=
//     `<div class="jumbotron">
//   <h1 class="display-4">Hello, world!</h1>
//   <p class="lead">The Temperature in ${cityName} is `+wdata.main.temp+`&#176</p>
//   <hr class="my-4">
//   <p>The weather condition is +${wdata.weather[0].description}. <img src=${imageURL}></p>
//   <p class="lead">
//     <button class="backButton btn btn-primary btn-lg" onclick="run()">back</button>
//   </p>
// </div>`
    // str=str+`<br>`+`<br>`+`The Temperature in ${cityName} is `+wdata.main.temp+`&#176`;
    // str=str+'<br>'+"The weather condition is "+wdata.weather[0].description;
    // str=str+`<br>`+`<br>`+ `<img src=${imageURL}>`;
    $(".userInput").after(`<div class="jumbotron">
    <h1 class="display-4">The Temperature in ${cityName} is `+wdata.main.temp+`&#176 C</h1>
    <p>The weather condition is  ${wdata.weather[0].description}. <img src=${imageURL}></p>
    <p class="lead">
      <button class="backButton btn btn-outline-warning btn-lg" onclick="run()">back</button>
    </p>
  </div>`);
  $(".jumbotron").hide().slideDown();
    //  btn=document.createElement("button");
    // btn.setAttribute("type","submit");
    // btn.classList.add("backButton");
    // btn.innerText="back";
    // btn.setAttribute("onclick","run()");
    // document.querySelector(".container").append("",btn);
}
function run(){
state=false;
document.querySelector(".jumbotron").remove();
document.querySelector("input").value='';
    
}