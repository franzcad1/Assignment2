/* Assignment2, Franz Cadiente 301098663, 10/18/2020
 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to client model
let Client = require('../models/client');

module.exports.displayClientList = (req, res, next)=> {
    Client.find({}).sort([['name', 1]]).exec(function (err,clientList) {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('client/list', {title: 'Business Contacts', ClientList: clientList, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req,res,next)=> {
    res.render('client/add', {title: 'Add Client', displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req,res,next)=> {
    let newClient = Client({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    Client.create(newClient, (err, Client) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh client list
            res.redirect('/client-list');
        }
    });
}

module.exports.displayEditPage = (req,res,next)=> {
    let id = req.params.id;

    Client.findById(id, (err, clientToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show edit view
            res.render('client/edit', {title: 'Update Client', client: clientToEdit, displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req,res,next)=> {
    let id = req.params.id;

    let updatedClient = Client({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    Client.updateOne({_id: id}, updatedClient, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            res.redirect('/client-list')
        }
    });
}

module.exports.performDelete = (req,res,next)=> {
    let id = req.params.id;

    Client.remove({_id: id}, (err) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             //refresh client list
             res.redirect('/client-list');
        }
    });
}