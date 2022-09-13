const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

//connect mongo
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nrqlb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const database = client.db("todos");
        const taskCollection = database.collection("taskCollection");
        //get api
        app.get('/task', async (req, res) => {
            const cursor = taskCollection.find({});
            const task = await cursor.toArray();
            res.send(task.reverse());
        })

        // add a task      
        app.post('/task', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        })

        //update a task data
        app.put('/task/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const updateData = {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    time: req.body.time,
                    date: req.body.date
                }
            };
            const result = await taskCollection.updateMany(query, updateData);
            console.log(result);
            res.json(result);
        })
        //pin a task route
        app.put('/pin/task/:id', async (req, res) => {

            console.log(req.path)
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const updatePin = {
                $set: {
                    pin: true
                }
            };
            const result = await taskCollection.updateOne(query, updatePin);
            console.log(result);
            res.json(result);
        })
        //unpin task route
        app.put('/unpin/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const updatePin = {
                $set: {
                    pin: false
                }
            };
            const result = await taskCollection.updateOne(query, updatePin);
            console.log(result);
            res.json(result);
        })
        //delete task api
        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await taskCollection.deleteOne(query);
            res.json(result);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Wow todo server is running');
})

app.listen(port, () => {
    console.log('Todo app is listening on port', port)
})