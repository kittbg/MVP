const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const { Client } = require('pg');
const client = new Client({connectionString: process.env.DATABASE_URL});
client.connect();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
const port = process.env.PORT || 3000;

app.get('/', (req, res)=> {
    res.send('Success!')
})

app.get('/api/cars', async(req, res)=>{
    try {
    let results = await client.query('SELECT * FROM cars');
    res.json(results.rows)
    } catch (err){
        console.error(err);
        res.status(500).send('Internal server error.')
    }
})

app.post('/api/cars', async(req, res)=>{
    let make = req.body.make;
    let model = req.body.model;
    let year = req.body.year;
    let color = req.body.color;
    let price = req.body.price;
    try {
     await client.query('INSERT INTO cars (make, model, year, color, price) VALUES ($1, $2, $3, $4, $5)', [make, model, year, color, price]);
     res.send('Car added to the inventory.')
    } catch (err){
        console.error(err);
        res.status(400).send('Addition to the inventory failed.')
    }
})

app.delete('/api/cars/:id', async (req, res)=>{
    let id = req.params.id
    try {
       await client.query('DELETE FROM cars WHERE id = $1', [id]);
       res.send('Car deleted from the inventory.')
    } catch (err){
        console.error(err);
        res.status(400).send('Deletion of car entry failed.')
    }
})


app.listen(port, (error)=>{
    if (error){
        console.error(error)
    } else {
        console.log(`This server is listening to port ${port}.`)
    }
})