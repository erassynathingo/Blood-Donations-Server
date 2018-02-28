const Permissions = require("../libraries/permissions.lib");
let Log = require("../libraries/logger.lib")
let permissions = new Permissions();
let logger = new Log();
let mapper = require("../helpers/map")
let dict = require("../helpers/dictionary")
let Model = require("../models/count.model")
let _ = require('underscore');

module.exports = {
    getOne: req => {
        let 
        return Model.findOne({ "blood_type": req.params.type }).select("count");
    },

    create: req =>  Model.create(req.body),

    update: (req) => {
        console.log("Update Details: ", req.body);
        let newValue = 0;
        return Model.findOne({blood_type: req.body.blood_type}).select("count").then(count=>{
            let oldValue = count.count;
            newValue = parseInt(oldValue) + parseInt(req.body.value);
            return Model.findOneAndUpdate({"blood_type": req.body.blood_type}, {"count": newValue}, {new: true});
        })
    },

    getMany: ()=>{
        return Model.find({});
    },

    getByType: (type) => {
        return Model.findOne({blood_type: type})
    }
};