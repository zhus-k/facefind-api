
import Clarifai from 'clarifai';

const clarifai = new Clarifai.App({
    apiKey: "301c4890d31746f28debf4db25f606ff"
});

const handleAPIcall = (req, res) => 
{
    clarifai.models
        .predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to fetch with API.'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1 )
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => {
        res.status(400).json('Unable to get entries');
    });
}

modules.export = {
    handleImage,
    handleAPIcall
}