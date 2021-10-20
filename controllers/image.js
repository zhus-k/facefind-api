
require('dotenv').config();
const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
});

const handleAPIcall = (req, res) => {
    console.log('make clarifai api request');
    // Use Face Recognition Model
    clarifai.models
        .predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Clarifai: Unable to fetch with API.'));
}

const handleImage = (req, res, db) => {
    const { id, url } = req.body;

    let entries;

    db('users').where('id', '=', id)
        .increment('requests', 1)
        .returning('requests')
        .then(count => {
            entries = count;
        })
        .catch(err => {
            res.json('Unable to get entries');
        });

    // Check if this user has a history
    // db.schema.hasTable(`history${id}`).then( exists =>
    // {
    //     // Create user history if does not exist
    //     if(!exists)
    //     {
    //         db.schema.createTable(`history${id}`, function (table)
    //         {
    //             table.increments().primary;
    //             table.string('imageURL');
    //             table.string('date');
    //         });
    //     }

    //     // Insert {imageurl, date} into user history
    //     db(`history${id}`).insert([{ imageURL: url }, { date: new Date() }])
    //     .catch(err => res.json('Error with User History'));
    // });
}

module.exports = {
    handleImage,
    handleAPIcall
}