/*
const http =require("http");
const server =http.createServer((req,res)=>{
     res.writeHead(200,{"Content-Type":"text/html"});
     res.write("Hello World\n");
     const modules=require("./modules")

     res.write(`Addition answer: ${modules.add(2,3)}`);
     
     res.write("Subtraction answer: " + modules.subtract(13,7));
    
     //console.log(modules.subtract(2,3)); //this would just print the output in server and is not passed to the client
     // must use res.write() to print it on to the browser
     res.end();
});
server.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000")
})

*/


/*

// writing to a file and then creating it

const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/plain"});
    fs.readFile('./sample.json','utf8',(err,data)=>{
        if(err){
            console.log("Cannot open file");
            return;
        }
 //     res.write(data);
 //     res.end();

    const jsonData =JSON.parse(data);
    const filteredData=jsonData.filter((user)=>user.amount >1500);
    fs.writeFile("./data.json",JSON.stringify(filteredData),(err)=>{
        if(err){
            console.log("Error writing File");
            return;
        }
    });
       
    });
});

server.listen(3000,()=>{
    console.log("Server running on port http://localhost:3000");
});

*/


/*
const fs=require('fs');
const create=(student)=>{
    let student=[]
    fs.readFile('./sample.json','utf8',(err,data)=>{
        let ac= data ? JSON.parse(data) : [];
        if(ac.length>0){
            students=[...ac,student]
        }
        else{

        }
    })
}
*/


/*
const fs = require('fs');

// Create function
const create = (student) => {
    fs.readFile('./sample.json', 'utf8', (err, data) => {
        const students = data ? JSON.parse(data) : []; 
        students.push(student); 

        fs.writeFile('./sample.json', JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Student added successfully!');
            }
        });
    });
};
module.exports = { create };
   
//const fs = require('fs');

// Read function
const read = () => {
    fs.readFile('./sample.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('No data found! The file does not exist.');
            } else {
                console.error('Error reading the file:', err);
            }
            return;
        }

        const students = data ? JSON.parse(data) : [];
        console.log('Students:', students);
    });
};

module.exports = { read };


*/