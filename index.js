const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.axsqk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    await client.connect();

    console.log('MongoDB Connected');

    // Database collections
    const eventCollection = client.db('checkInCheckOut').collection('events');

    // POST API to add a new event
    app.post('/event', async (req, res) => {
        const event = req.body;
        const postResult = await eventCollection.insertOne(event);
        res.send(postResult);
    });

    // GET API to get all the events
    app.get('/event', async (req, res) => {
        const query = {};
        const getResult = await eventCollection.find(query).toArray();
        res.send(getResult);
    });
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('assignment server running');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});