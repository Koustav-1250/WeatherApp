
const express=require('express')
const https=require('https')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.get("/", function(req,res){

res.sendFile(__dirname+"/public");
});
app.post("/",function(req,res){
    var  city_Name=req.body.cityName;
 
    const url=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city_Name}&appid=${appID}`
 
    https.get(url,function(response){
        // console.log(response);
        if(response.statusCode==200){
        response.on("data",function(data){
      
         const weatherData=JSON.parse(data);
        //  console.log(weatherData);
         const imageURL=`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        //  var align="center";
        res.write(`
        <style>
        .container{
            width:500px;
            height:500px;
            // box-shadow:5px 5px 5px 5px grey;
            // border:2px solid black;
            margin:auto;
            border-radius:4px;
            text-align:center;
        }
        .back{
            margin:10%;
        }
        a{ 

            margin-top:1.5rem;
            padding:0.5rem 1.8rem;
            text-decoration:none;
            color:black;
            // padding:1rem;
            border:2px solid black;
            border-radius: 5px;
            font-family:monospace;
            transition:  all 0.5s ease;
        }
        a:hover{
            box-shadow: inset 0px 210px 30px 20px #0e0e0f;
            color:#f3f3f7;
         
        }
        </style>
        <div class="container">
        <h1 style="text-align:center; margin-top:15%"> The Temperature in ${city_Name} is ${weatherData.main.temp}&#176 celcius</h1>
        <h3 style="text-align:center;"> The conditions is ${weatherData.weather[0].description}</h3>
        <img src=${imageURL} style="background-color:black;border:2px solid grey; border-radius:100px;opacity:1.5;display:block;margin:auto;"> 
        <div class ="back">
        <a href='/'>Back</a>  
        </div>
        </div>
        `)
         res.send();
        });
    }else{
        res.send("cityName not found!");
    }
    });
 
});
    

app.listen(3000,function(){
    console.log("Server Started!")
})
