const express = require("express");
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const taskRouter= require('./routes/task.route');
const PORT = process.env.PORT || 3000;
// const mongoUrl='mongodb://localhost:27017'//local//dev
const mongoUrl='mongodb+srv://brahmeharish:Min32v8R61nVcz9U@cluster0.77zzyag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';//production
app.use('/',taskRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose.connect(mongoUrl)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));