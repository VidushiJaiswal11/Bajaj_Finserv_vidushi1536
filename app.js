const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let userId = "Vidushi_11012003"

app.post("/bfhl", (req, res) =>{
  const arr = req.body.data;
  let currObj = {
    "userId": userId,
    "email" : "vidushi1536.be21@chitkara.edu.in",
    "is_success": false,
    "roll_no" : "2110991536",
  }
  if(!arr){
    res.json(currObj).status(400);
    return;
  }
  try{
    const resp = arr.reduce(function(acc, curr){
      let isAll = false;
      for(let i = 0; i < curr.length; i++){
        if(curr[i] >= 'a' && curr[i] <= 'z' || curr[i] >= 'A' && curr[i] <= 'Z'){
          isAll = true;
        }
      }
      if(isAll){
        curr = curr.toUpperCase();
        if(!acc["alphabets"]){
          acc["alphabets"] = [curr];
        }
        else{
          acc["alphabets"].push(curr);
        }
      }else{
        const num = parseInt(curr);
        if(num%2==0){
          if(!acc["even_num"]){
            acc["even_num"] = [curr];
          }
          else{
            acc["even_num"].push(curr);
          }
        }else{
          if(!acc["odd_num"]){
            acc["odd_num"] = [curr];
          }
          else{
            acc["odd_num"].push(curr);
          }
        }
      }
    return acc;
  },{});
    currObj["alphabets"] = resp["alphabets"];
    currObj["odd_num"] = resp["odd_num"];
    currObj["even_num"] = resp["even_num"];
    currObj["is_success"] = true;
    res.json(currObj).status(200);
}catch(err){
    res.json(currObj).status(400);
    console.log(err);
  }
});
app.use((err,req,res,next)=>{
  res.json({
    "userId": userId,
    "is_success": false,
    "error":err.message
  })
})

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
});
