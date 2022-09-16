const http=require('http');
const port=3000;
const fs=require('fs');


function requestHandler(req,res){
    console.log(req.url);
    res.writeHead(200,{'content-type':'text/html'})
     var filepath;
     switch(req.url){
        case '/index':
            filepath='./index.html'
            break;
        case '/about':
            filepath='./about.html'
            break;
        case '/contact':
            filepath='./contact.html'
            break; 
        default:
            filepath='./404.html'           
     }
    fs.readFile(filepath,function(err,data){
        if(err){
            console.log("error:" ,err);
            res.end("<h1>ERROR</h1>");
            return;

        }
       return res.end(data);
    })
}

const server= http.createServer(requestHandler);
server.listen(port,function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log("server is listening on port",port)
})