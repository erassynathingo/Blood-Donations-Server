
let db = require("../libraries/db.js");
let Schema = db.Schema;

let bloodSchema = new Schema({
    blood_type: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 }
})

module.exports = db.model("blood_counts", bloodSchema);