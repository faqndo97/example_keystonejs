const { Text } = require('@keystonejs/fields');

const Post = (keystone) => {
  keystone.createList('Post', {
    fields: {
      title: {
        type: Text,
        isRequired: true,
      },
      description: {
        type: Text,
        isMultiline: true
      }
    },
  })
}

module.exports = Post 