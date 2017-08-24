/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Mapper
* @description 
* @params 
* @returns 
* @throws 
*/

let config = require('../config')
let Promise = require('bluebird')
let _ = require('lodash')

module.exports = {
  map: (data, dict) => {
    return new Promise((resolve, reject) => {
      let map = {}
      _.each(data, (value, key) => {
        if (_.has(dict, key)) {
          map[dict[key]] = value
        }
      })
      resolve(map)
    })
  },

  inverse: (data, dict) => {
    let collection = []
    dict = _.invert(dict)
    if (!_.isArray(data)) {
      collection = mapper(data)
    } else {
      _.each(data, (values) => {
        map = mapper(values)
        !_.isEmpty(map) ? collection.push(map) : void (null)
      })
    }
    function mapper (values) {
      let map = {}
      for (key in values) {
        if (_.has(dict, key)) {
          map[dict[key]] = values[key]
        }
      }
      return map
    }
    return Promise.resolve(collection)
  }
}
