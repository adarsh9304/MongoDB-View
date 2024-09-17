const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const bodyparser=require('body-parser');
const { updateContribution, getTotalContributions, createUser, getAllUsers } = require('./controller.js');
const {connect} = require('./database.js');

dotenv.config()

const app = express();
app.use(express.json());
app.use(bodyparser.json())

connect()

app.post('/update-contribution',updateContribution);
app.get('/get-total-contributions',getTotalContributions)
app.post('/create-user',createUser)
app.get('/',getAllUsers)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
