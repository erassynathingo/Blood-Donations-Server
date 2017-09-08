const Permissions = require("../libraries/permissions.lib");
let Log = require("../libraries/logger.lib")
let permissions = new Permissions();
let logger = new Log();
let mapper = require("../helpers/map")
let dict = require("../helpers/dictionary")
let Model = require("../models/count.model")

module.exports = {
    getOne: req => {
        return Model.findOne({ idNumber: req.params.id });
    },

    create: req => {
        return mapper.map(req.body, dict.blood_types).then(data => {
            return Model.create(data);
        })

    },
    update: (req) => {
        if (permissions.updateItems(req.session) == true) {
            return Model.update(req.body = {
                blood_type: '',
            });
        }
    }
};