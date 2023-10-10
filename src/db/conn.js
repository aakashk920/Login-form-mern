const mongoose = require("mongoose"); 

//connection creation and creating a new Database  
mongoose.connect("mongodb://127.0.0.1:27017/Loginform", { 
useNewUrlParser: true, useUnifiedTopology: true 
}) 
 
.then(() => console.log("connection is done")) 

.catch((err) => console.log("failure condition", err)); 