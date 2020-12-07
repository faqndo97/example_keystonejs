const User = require("./User")

const loadModels = (keystone) => {
  User(keystone)
}

module.exports = {
  loadModels
}