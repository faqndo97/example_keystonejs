const User = require("./User")
const Post = require("./Post")

const loadModels = (keystone) => {
  User(keystone)
  Post(keystone)
}

module.exports = {
  loadModels
}