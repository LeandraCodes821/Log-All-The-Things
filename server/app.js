const express = require('express');
const fs = require('fs');
const app = express();
const morgan= require('morgan');
const { nextTick } = require('process');
app.use((req, res, nextTick) => {
    let agent= req.headers['user-agent'].replace(/,/, '');
    let time= new Date().toISOString();
    let method= req.method;
    let resources= req.path;
    let version= `HTTP/${req.httpVersion}`;
    let status= 200;

//morgan.token("custom", ":user-agent; :date[iso]; (:method); :url; :http-version; :status")


let data= agent + ',' + time + ',' + method + ',' + resources + ',' + version + ',' +  status + '\n';
//console.log( data );

//let stringData= JSON.stringify(data);
console.log(data)
//console.log('😈', stringData) 



//app.use(morgan("custom"));


// write your logging code here
fs.appendFile('./server/log.csv', data, function(err){
    if(err)throw err;
    console.log('saved')
    //if no err 
    nextTick();
})





// write your code to respond "ok" here
app.get('/', (req, res) => {
    res.send("ok").status(200);
    //console.log('😇', agent, time)
    
    
    
    //console.log(get)
    
    
});

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here
    fs.readFile('/server./log.csv', 'utf8', function read(err, data){
        
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
})
});
})
module.exports = app;
