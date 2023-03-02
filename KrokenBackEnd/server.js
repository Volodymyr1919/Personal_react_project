const   express     = require('express'),
        bodyParser  = require('body-parser'),
        app         = express(),
        cors        = require('cors'),
        MongoClient = require('mongodb').MongoClient,
        data        = require('./config'),
        ObjectId    = require('mongodb').ObjectId;

MongoClient.connect(data.url)
.then(client => {
    console.log('Connected sucessfully to DB');

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const   db                  = client.db('rest-users'),
            usersCollection     = db.collection('users'),
            postsCollection     = db.collection('rest_posts');

    app.post('/login', (req, res) => {
        // console.log(req.body);
        usersCollection.findOne({
            name: req.body.username, 
            password: req.body.password
        })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404)
            }
        })
    });

    app.post('/signup', (req, res) => {
        // console.log(req.body);
        usersCollection.findOne({
            name: req.body.username, 
        })
        .then(result => {
            if (result) {
                res.sendStatus(403);
            } else {
                usersCollection.insertOne({
                    business_name: req.body.business_name,
                    type_business: req.body.type_business,
                    name: req.body.username,
                    password: req.body.password,
                    who: req.body.who,
                    bonus: req.body.bonus
                })
                res.sendStatus(200);
            }
        })
    });

    app.get('/me/:id', (req, res) => {      
        let id = new ObjectId(req.params.id);
        usersCollection.findOne({
            _id: id
        })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404)
            }
        })
    });

    app.get('/posts/:business_name', (req, res) => {
        postsCollection.find({
            business_name : req.params.business_name
        }).toArray()
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
    })

    app.listen(data.port, function() {
        console.log(`Listening on port ${data.port}`);
    });
})
.catch(error => console.log(error));