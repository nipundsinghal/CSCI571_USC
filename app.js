/* global require */
/*jslint node:true */
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

/* eslint-disable */
'use strict';



var express = require('express');
var bodyParser = require('body-parser');
var https = require("https");
var delay = require('delay');
var cors = require('cors');
var app     = express();
//var sleep = require('sleep');
//app.use(cors());
app.use(cors({origin: '*'}));
//app.options('*', cors());
//app.use(express.static(path.join(__dirname, 'public')));






app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
    console.log("request came here"+req.body);
  res.send('You sent the name "' + req.body.name + '".');
   // res.send('You sent the name "' + req.body.name + '".');
});

app.get('/myaction',function(request,response){

    var send_response = false;
    var lat_new_york,lng_new_york;
    var location;
    var lat_loc;
    var lon_loc;
    var got_location = false;


    if(request.query['city_name'] == "false"){
     location = JSON.parse(request.query['location']);
    var lat = location.lat;
      lat_loc =   location.lat;
      lon_loc = location.lon;

        console.log("$$$$$$$$$$$$$$$$$$$$$$$ came here for current location");
        send_response = true;
        got_location = true;
        do_this();

    }
    else    //city name is false
        {

        console.log(typeof request.query['city_name']);
          console.log(request.query['city_name']);
    location =  request.query['location'];
            console.log(location);
          //  console.log(typeof location);

    var url =  "https://maps.googleapis.com/maps/api/geocode/json?address="+location+'&key=****';

    console.log("This is geocoding API"+url);

    https.get(url, function(res) {
  res.setEncoding("utf8");
  var body = "";
  res.on("data", function(data)  {
    body += data;
  });
  res.on("end", function()  {

      send_response = true;
      var error_json = body;
    body = JSON.parse(body);
      if(body.status == "ZERO_RESULTS")
          {
              send_response = false;
              response.write( error_json);
                        response.end();
          }
      else{
          console.log("came here before URL2 ???");
      lat_new_york = body.results[0].geometry.location.lat;
    lat_loc = body.results[0].geometry.location.lat;
            console.log("latitude location is "+lat_loc);

      lng_new_york = body.results[0].geometry.location.lng;
    lon_loc = body.results[0].geometry.location.lng;
    console.log(
      body.results[0].geometry.location.lat);
          got_location = true;
          do_this();
      }
  });
});

        }

    function do_this()
    {


     console.log("latitude location is "+lat_loc);
    var url2;




      var url2 =   "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat_loc+','+lon_loc+"&radius="+request.query['radius']+"&type="+request.query['category']+"&keyword="+request.query['name']+"&key=**";


    var place_api;
    console.log("This is nearby search API"+url2);

   // var url2 = require('url3');

     https.get(url2,  function(response_of_places) {
  response_of_places.setEncoding("utf8");
  var body = "";
  response_of_places.on("data", function(data)  {
    body += data;





  });



  response_of_places.on("end", function()  {
      var  next_page = JSON.parse(body);
      console.log("************" + next_page.next_page_token);
      place_api = body;
      console.log("JSON response of place api" + place_api);
     // response.write("sending places api response"+place_api);
    body = JSON.parse(body);

   // console.log(body.results[0].name);

      if(next_page.next_page_token){
      var url3 = url2 + "&pagetoken="+next_page.next_page_token;
     console.log("URL OF PAGE 2"+url3);

   console.log("This query should happen ########## for 2 page");
         // sleep.sleep(2);
        //  setTimeout(function(){  }, 3000);
          function sleep (time) {
  return new Promise(function(resolve){
                     setTimeout(resolve, time)});
}



     sleep(5000).then(function()  {
    // Do something after the sleep!


         // delay(200);
        https.get(url3, function(response_of_next_page) {
  response_of_places.setEncoding("utf8");
  var body_next = "";
            console.log("Inside get of Second qyery");

  response_of_next_page.on("data", function(data)  {
    body_next += data;

     // console.log("data received"+body_next);


  });
    response_of_next_page.on("error",function(error_res){

        body_next += error_res;
        console.log("error "+ error_res);
    });

    response_of_next_page.on("end", function()  {

        var next_page2 = JSON.parse(body_next);
     //   console.log("***%%%%****" + next_page2.next_page_token);
        console.log("*********body  is here for 2 page"+body_next);
        console.log("next page token 2 for page 3  is present"+next_page2.next_page_token);
        var new_string = body + body_next;
        var response_2_pages = [];
        response_2_pages[0] = body;
        var body_next1 = JSON.parse(body_next);
        response_2_pages[1] = body_next1;

        response_2_pages = JSON.stringify(response_2_pages);

        if(next_page2.next_page_token)
            {

            var places_3_page = url3 + "&pagetoken="  +   next_page2.next_page_token;
                console.log(places_3_page);
               // sleep.sleep(2);
          //     setTimeout(function(){  }, 3000);

                console.log("URL OF page3"+places_3_page);

                sleep(3000).then(function(){

                https.get(places_3_page, function(result_3_page){

                    result_3_page.setEncoding("utf-8");
                    var body_3_page = "";
                    result_3_page.on("data",function(data){

                        body_3_page += data;

                });

                    result_3_page.on("end", function(){

        //                console.log("third page data ************************");

                console.log("*********body  is here for 3 page"+body_3_page);
                        console.log(body_3_page);
                        console.log(typeof body_3_page);

                        body_next = JSON.parse(body_next);
                        body_3_page= JSON.parse(body_3_page);

                        var response_final = [];
                        response_final[0]= body;
                        response_final[1] = body_next;
                        response_final[2] = body_3_page;

                     response_final =    JSON.stringify(response_final);


                        if(send_response){
                      //  response.write('name: ' + request.query['name']+' location: '+ request.query['location']+'\n');
                            response.write(response_final);
                        response.end();
                        }

                    });

                });

            });
            }
        else{
                          if(send_response){
                         console.log("Nipun ******* sending response from here");
                        //  response.write('name: ' + request.query['name']+' location: '+ request.query['location']+'\n');
                         response.write(response_2_pages);

                         response.end();
                          }
        }





         if(send_response){

        }


    });







        });
         });

      } //next page token
      else {
             response.write(place_api);
          response.end();
      }

  });

});

    } // do this



});

app.get('/myaction1',function(request,response){
//code to perform particular action.
//To access GET variable use.
//request.var1, request.var2 etc
    response.send('name: ' + request.query['name']);


});

var yelp = require('yelp-fusion');
var apiKey = "PZGHD2K-eMAMxfUyf536_WogzcsihGZxt8v-Sp8zOurQVAlxdnoIkYPpyYB50p6fj_KBvTnIfoJipD6xjxWQgWfCVJnieN2vSCGZJyrwzPuJxqo0of9d30rBaJHAWnYx";
var  client = yelp.client(apiKey);
app.get('/yelp_query1', function(request, response){

    console.log("came in YELP");
   // console.log(request.body);
    console.log(request.query['name']);
    console.log(request.query['address1']);
    console.log(request.query['city']);
    console.log(request.query['state']);

    if((request.query['name'] ) && (request.query['address1']) && (request.query['city']) && (request.query['state']))
        {



    client.businessMatch('lookup', {
  //name: 'Pannikin Coffee & Tea',
  name: request.query['name'],
  address1 :  request.query['address1'],
//  address1: '510 N Coast Hwy 101',
  //address2: 'Encinitas, CA 92024',
  city: request.query['city'],
  state: request.query['state'],
  country: request.query['country']

}).then( function(response2)  {
  console.log("This response is ID  "+response2.jsonBody.businesses[0].id);


    client.reviews(response2.jsonBody.businesses[0].id).then( function(response1)  {

  console.log(response1.jsonBody.reviews[0].text);

        response.setHeader('Access-Control-Allow-Methods', 'GET');
        response.header("Access-Control-Allow-Origin", "*");

        response.send(response1.jsonBody.reviews);

}).catch( function(e) {
  console.log("Error in finding business "+e);
  response.send("empty");
});



}).catch( function(e) {
  console.log("This is error in findind id"+e);
        response.send("empty");
});
        }
    else{
        console.log(typeof request.query['name'] );
     response.send("empty");
    }
});


app.listen(8081, function() {
  console.log('Server running at http://127.0.0.1:8081/');
});
