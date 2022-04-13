const csvToJson = require('csvtojson');
const express = require('express');
const fs = require('fs');
const { Server } = require('http');
const app = express();
//const { nextTick } = require('process');
//app.use((req, res, nextTick) => {
app.set('json spaces', 2);   


// write your logging code here
// write your code to respond "ok" here
app.get('/', (req, res) => {
    let agent= req.headers['user-agent'].replace(/,/g, '');
    let time= new Date().toISOString();
    let method= req.method;
    let resource= req.path;
    let version= `HTTP/${req.httpVersion}`;
    let status= res.statusCode;
    let data=  '\n'+ `${agent},${time},${method},${resource},${version},${status}`;
    console.log(data)
    fs.appendFile('./server/log.csv', data, function(err){
        if(err)throw err;
        //if no err 
        //nextTick();
    })
    res.send("ok").status(200);
    //console.log('😇', agent, time)
    
    
    
    //console.log(get)
    
    
});

app.get('/logs', (req, res) => {
    csvToJson()
    .fromFile('./server/log.csv')
    .then((jsonObj)=>{
    res.json(jsonObj);
})
    // write your code to return a json object containing the log data here
    /*fs.readFile('/server./log.csv', 'utf8', function read(err, data){
        
        let jsonObj = '[';
        let splitData = data.split('\n');
    console.log('🛩', splitData);
    let items = undefined;
    for(let i=1; i < splitData.length; i++){
        if(splitData[i].length > 2){
            //items = splitData[i].split(',');
            jsonObj+='{' + 
            '"Agent":"'+ items[0] + '",' +  
            '"Time":"' + items[1] + '",' +
            '"Method":"' + items[2] + '",' +
            '"Resources":"' + items[3] + '",' + 
            '"Version":"' + items[4] + '",' + 
            '"Status":"' + items[5] + '",' +
        '}';
            if(i < splitData.length - 2){
                jsonObj+= ',';
            }
        }
    }
    jsonObj+= ']';
        res.json(JSON.parse(jsonObj));
})*/
});
module.exports = app;
