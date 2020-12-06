const crypto = require('crypto');
const randomString = () => crypto.randomBytes(6).hexSlice();

module.exports = async keystone => {
  // Count existing users
  const {
    data: {
      _allUsersMeta: { count = 0 },
    },
  } = await keystone.executeGraphQL({
    context: keystone.createContext({ skipAccessControl: true }), // Si skipAccessControl es true significa que no va a chequear el access control
    query: `query {
      _allUsersMeta {
        count
      }
    }`,
  });

  // Si no hay ningun usuario lo crea
  if (count === 0) {
    const password = randomString(); // Generar password Random
    const email = 'admin@example.com';

    // Ejecutar query para crear un usuario
    const { errors } = await keystone.executeGraphQL({ // Ejecutar query para guardar  el usuario
      context: keystone.createContext({ skipAccessControl: true }),
      query: `mutation initialUser($password: String, $email: String) {
            createUser(data: {name: "Admin", email: $email, isAdmin: true, password: $password}) {
              id
            }
          }`,
      variables: { password, email },
    });

    if (errors) {
      console.log('failed to create initial user:');
      console.log(errors);
    } else {
      console.log(`

      User created:
        email: ${email}
        password: ${password}
      Please change these details after initial login.
      `);
    }
  }
};
