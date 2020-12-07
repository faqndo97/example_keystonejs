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
    hooks: {
      afterChange: async ({ operation, updatedItem }) => {
        if (operation === 'create') {
          // Here we should send an email for example
          console.log(updatedItem)
        }
      }
    }
  })
}

module.exports = Post 