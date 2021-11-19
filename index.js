const http = require("http");
const querystring = require('querystring');
const fs = require('fs');

var nameArr = [];
var posts;

var welcomepage = `<html>
    <head><title>Welcome Page</title></head>
    <body>
    <h3>Please enter a player's Name.</h3>
    <form action="../create-player" method="post">
        <input type="text" name="playerName" />
        <input type="submit" />
    </form>

    <a href="/player"> Player List </a>
    </body></html>`;

var creatplayer = `<html>
    <head><title>Player'Name Page</title></head>
    <body>
    <h3>Parsing the incoming data....</h3>
    <a href="/"> Back to Welcome Page </a>
    </br>
    <a href="/player"> Player List </a>
    </body></html>`;

var playerList = `<html>
    <head><title>Player'Name Page</title></head>
    <body>
    <h3>there are list.</h3>
    <a href="/"> Back to Welcome Page </a>
    </br>
    <form action="../player" method="post">
        <input type="text" name="delectName" />
        <input type="submit" value="delect"/>
    </form>
    <ul>
        PLAYERLIST
    </ul>
    <p> PS: Bitte nochmal Button clicken, nachdem Sie es wirklich loeschen wollen.</p>
    </body></html>`;
    
const server = http.createServer((req,res) => {

    const methode = req.method;
    const thisUrl = req.url;
    const path = thisUrl.split('?')[0];
    res.statusCode = 200;
    res.setHeader = ("Content-Type","text/html");

    if( path === '/'){
        return  res.end(welcomepage);
    }

    if(path === '/create-player'){       
        var postData = '';

        req.on('data',chunks => {
            postData += chunks.toString();
            // console.log('Before replace:'+ postData);
            if(postData.indexOf('playerName='&&'=')!=-1){
                postData = postData.replace('playerName=','');
                postData = postData.replace('+',' ');
                console.log(postData);
            }
           nameArr.push(postData);
           postData = '';
           posts = nameArr.join('\n');
        });

        req.on('end',function(){
            fs.writeFileSync("player.txt", posts);
            res.end(creatplayer);
        });
    }

    if( path === '/player'){
       
        const names = fs.readFileSync("player.txt",'utf8').split('\n');
        let replace = '';
        var delectData = '';

        req.on('data',chunks => {
            delectData += chunks.toString();
            if(delectData.indexOf('delectName='&&'=')!=-1){
                delectData = delectData.replace('delectName=','');
                delectData = delectData.replace('+',' ');               
            }           
        });

        req.on('end',function(){
            names.map((val, i)=>{
                for(let len=0;len<names.length;len++){
                    if(val === delectData){
                        names.splice(i,1);
                        console.log(names);
                    }
                }            
            });
            delect = names.join('\n');
            fs.writeFileSync("player.txt", delect);
            delectData = '';
          
        });
   
        const news = fs.readFileSync("player.txt",'utf8').split('\n');     
        for(const name of news){
            replace += '<li>' + name +'</li>\n';      
        }     
        const result = playerList.replace('PLAYERLIST', replace);
        return res.end(result);
    }
   
});

const hostname = "127.0.0.1";
const port = 3000;
server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});

