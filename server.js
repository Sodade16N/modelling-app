const express = require('express');
require('dotenv').config();
require('./config/database');
const userRouter =  require('./routes/userRouter')

const PORT =process.env.PORT;

const app = express();
app.use (express.json());
app.use(userRouter)

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
  
})