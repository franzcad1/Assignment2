/* Assignment2, Franz Cadiente 301098663, 10/18/2020
 */

let mongoose = require('mongoose');

//create a model class
let clientModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String
},
{
    collection:"clients"
});

module.exports = mongoose.model('Client', clientModel)