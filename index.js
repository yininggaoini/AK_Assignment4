const http = require("http");
const querystring = require('querystring');
const fs = require('fs');

var welcomepage = `<html>
    <head><title>Welcome Page</title></head>
    <body>
    <h3>Please enter a player's Name.</h3>
    <form action="../creat-player" method="post">
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
        <input type="button" value="delect"/>
    </form>
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


    if(path === '/creat-player'){
        var postData = '';
        req.on('data',chunks => {
            postData += chunks.toString();
        });

        req.on('end',function(){
            postData = querystring.parse(postData);

            posts = postData.playerName;
            postsObj = {"Game's Name": posts};
            let str = JSON.stringify(postsObj,null,4);
            console.log(postData);
            fs.appendFileSync("player.txt", str ,function(err){
                if(err){
                   return console.log(err);
                }
            });
            res.end(creatplayer);
        });


    }

    if( path === '/player'){
        show = fs.readFileSync("player.txt",'utf8', function(err,files){
            var delect = files.replace(delectName,"");
            fs.writeFileSync("player.txt",delect,'utf8', function(err,files){

                if(err){
                   return console.log(err);
                }

            })
        });
        let jsonstr = JSON.stringify(show,"","\t");
        return res.end(playerList + jsonstr);
    }
   
});

const hostname = "127.0.0.1";
const port = 3000;
server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});

