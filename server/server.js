const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require ('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

const{ User } = require('./models/user');
const{ Event } = require('./models/events');
const{ auth } = require('./middleware/auth');
app.use(bodyParser.json());
app.use(cookieParser());


// GET //
//check if user logged in
app.get('/api/auth', auth, (req, res)=>{
    res.json({
        isAuth: true,
        id: req.user._id,
        email:req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
});


//logout
app.get('/api/logout', auth,(req, res)=>{
    req.user.deleteToken(req.token, (err, user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)

    })
})
//GET ONE EVENT
app.get('/api/getOneEvent', (req,res)=>{
    let id = req.query.id;
    Event.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})
//GET ALL EVENTS
app.get('/api/getevents', (req,res)=>{
    //api example localhost:3001/api/Events?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    //ORDER = asc || desc
    Event.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);

    })

})
//get user name
app.get('/api/getUserName', (req, res)=>{
    let id = req.query.id;

    User.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname,
            course: doc.course
        })
    })
})

//GET ONE USER
app.get('/api/getOneUser', (req,res)=>{
    let id = req.query.id;
    User.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})
//get users
app.get('/api/users', (req, res)=>{
    User.find({}, (err, users)=>{
        res.status(200).send(users)
    })

})
//get user invites - not sure if needed but will include
/*app.get('/api/user_invites', (req, res)=>{
    let id = req.query.id;

    Event.find({invitedId:req.query.user}).exec((err, docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})*/


app.get('/api/user_invites', (req, res)=>{
    let id = req.query.id;

    User.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname,
            email: doc.email,
            invited: doc.isInvited
        })
    })
})
app.get('/api/user_events', (req, res)=>{
    Event.find({invitedId: req.query.user}).exec((err, docs) => {
    if(err) return res.status(400).send(err);
    res.send(docs)
    })
})

//******************************************************************************
// POST //
//POST EVENT
app.post('/api/event', (req, res)=> {
    const event = new Event(req.body)

    event.save((err, doc)=> {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            eventId: doc._id,

        })
    })
})

//POST USER
app.post('/api/register', (req,res)=>{
    const user = new User(req.body);

    user.save((err, doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

app.post('/api/login',(req,res)=>{

    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false, message: 'Auth failed, email not found'})

        user.comparePassword(req.body.password, (err, isMatch)=>{

            if(!isMatch) return res.json({
                isAuth:false,
                message: 'Wrong password'
            });


            user.generateToken((err, user)=>{

                if(err) return res.status(400).send(err);

                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id:user._id,
                    email:user.email,
                    role: user.role
                })
            })

        })

    })
})
//*********************************************************************************
// UPDATE //
//UPDATE EVENT
app.patch('/api/event_update', (req, res)=>{
    Event.findByIdAndUpdate(req.body._id,req.body, {new:true}, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})

//UPDATE USER
app.patch('/api/user_update', (req, res)=>{
    User.findByIdAndUpdate(req.body._id,req.body, {new:true}, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})
//************************************************************************************
// DELETE //
//DELETE EVENT
app.delete('/api/delete_event', (req, res)=>{
    let id = req.query.id;

    Event.findByIdAndRemove(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
})

//DELETE USER
app.delete('/api/delete_user', (req, res)=>{
    let id = req.query.id;

    User.findByIdAndRemove(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
})




const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log('SERVER RUNNING');
})