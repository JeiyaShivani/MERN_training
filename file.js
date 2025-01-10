//code to read a file


const http=require('http');
const fs= require('fs');
fs.readFile('./sample.json','utf8',(err,data)=>{
    if(err){
        console.log("Cannot open file");
        return;
    }
    const jsonData=JSON.parse(data);
    const filterData=jsonData.filter((user)=>user.amount>1500);
    fs.writeFile('./data.json',JSON.stringify(filterData),(err)=>{
        if(err){
            console.log("Error writing file")
            return
        }
    });
});

