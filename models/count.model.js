
let db = require("../libraries/db.js");
let Schema = db.Schema;
let countSchema = new Schema ({
    'O-': {type: Number, required: true, default: 0},
    'O+': {type: Number, required: true, default: 0},
    'A-': {type: Number, required: true, default: 0},
    'A+': {type: Number, required: true, default: 0},
    'B-': {type: Number, required: true, default: 0},
    'B+': {type: Number, required: true, default: 0},
    'AB-': {type: Number, required: true, default: 0},
    'AB+': {type: Number, required: true, default: 0}
    
})

module.exports = db.model("blood_counts", countSchema);