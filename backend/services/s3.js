const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./User')

const app = express()
const port = 3000

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/JobsPlanet',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(db => console.log('Db is connected'))
.catch(err => console.log(err))

app.put('/updateBalance/:userId', async (req, res) => {
    const { userId } = req.params;
    const { salary } = req.body;
    console.log(userId)
    try {
        await UserModel.findByIdAndUpdate(userId, { $inc: { balance: salary } });
        res.status(200).send('User balance updated successfully!');
    } catch (error) {
        res.status(500).send('An error occurred while updating user balance.');
    }
});

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})