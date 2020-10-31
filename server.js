const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

var msg={};
const data=[{"id":0,"from":"Ahmad","text":"hello mama:express","time":"7:46:34"},{"id":1,"from":"mama","text":"hi dear","time":"8:46:34"}];
let clientData=[];
//////////////////////////////delete
app.delete("/messages/del/:id", function(req, res) {
let id=-1;
  id=req.params.id;
  if(!(req.params.id)){
    res.send("please enter pamameter e.g /messages/delete/2")
  }else{  
    const found=data.find(function(obj){
       
        return obj.id==id;
    })
 if(found){
      
      data.splice(data.indexOf(found),1)
       
      clientData=data;
      res.send("deleted")
       
    }else{
          res.status(400);
      res.send("no data found tod delete")
    }
  }
});
app.get("/messages/api",function(req,res){
   
        res.json(data)
    
        
})
//search

//root
app.get('/', function(req, res) {
  //response.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname+"/index.html")
   
});
//

//show all existing messages
app.get("/messages",function(req,res){
   clientData=data;
   res.sendFile(__dirname+"/all.html")
   
   // res.json(data)
  
   
})

///////////////////////////////////////////////////////search
app.get("/messages/search", function(req, res) {
  const search=req.query;
 //res.send(req.query.text)
  if(!(req.query.text)){
    res.send("please enter query e.g /messages/search?text=express")
  }else{
    const found=data.find(function(obj){
      return obj.text.toLowerCase().includes(req.query.text);
    })
    if(found){
      res.json(found)
    }else{
       res.status(400);
      res.send("no data found to search")
    }
  }
});

//////////////////////read last 10
app.get("/messages/last-ten", function(req, res) {
  clientData=data;
  res.json(clientData.slice(0,10))
})
//extract from parameter(1)
app.get("/messages/:id",function(req,res){
  
    const id=req.params.id;
   
    const found=data.find(function(obj){
       
        return obj.id==id;
    })

    if(found){
       
        clientData=found;
       // res.sendFile(__dirname+"/one.html")
      res.json(found)
    }else{
          res.status(400);
    res.send("n0 data found(last 10)")
    }
})

//*********add*/
app.post("/messages",function(req,res){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const name=req.body.name;
    const message=req.body.msg;
    const length=data.length;
    var id=0;
    if(length===0){
        id=0;
    }else{

        id=length;
    }
    if((name!="") && (message!="")){
        data.push({"id":id,"from":name,"text":message,"time":time})
        clientData=data;
        //res.send(clientData)
    }else{
         res.status(400);
    res.send("n0 data found(allmessage)")
    }
    
  // 
})


//***********delete on root****** */
////search

////////////////z//////////////////////////////////beda end

//see message by id
//delete mesage by id

const port=process.env.PORT||3000
app.listen(port);
