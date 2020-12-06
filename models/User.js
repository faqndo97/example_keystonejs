const { Text, Checkbox, Password } = require('@keystonejs/fields');

const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const access = { userIsAdmin };

const User = (keystone) => {
  keystone.createList('User', {
    fields: {
      name: { type: Text },
      email: {
        type: Text,
        isUnique: true,
      },
      isAdmin: {
        type: Checkbox,
        // Field-level access controls
        // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
        access: {
          update: access.userIsAdmin,
        },
      },
      password: {
        type: Password,
      },
    },
  })
}

module.exports = User