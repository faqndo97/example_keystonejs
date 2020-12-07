# KeystoneJS Starter Template

You've created a KeystoneJS project! This project contains a simple list of users and an admin application (`localhost:3000/admin`) with basic authentication.

## Running the Project.

To run this project first run `npm install`. Note: If you generated this project via the Keystone cli step this has been done for you \\o/.

Once running, the Keystone Admin UI is reachable via `localhost:3000/admin`.

## Next steps

This example has no front-end application but you can build your own using the GraphQL API (`http://localhost:3000/admin/graphiql`).

## Project setup

1. Pull repo
2. Run `npm install`
3. rename `.env.example` file to `.env` file
4. Set DB_URL variable to your postgres url, example: `DB_URL=postgres://localhost/todo`
5. Set COOKIE_SECRET variable running `openssl rand -hex 32` in your terminal and assigning the result of that command to that variable.
6. Run  `yarn dev`
7. Check if everything is working, the output of the `yarn dev` command should say the credentials of the first user to enter to the admin.
8. Check if you can acces to `localhost:3000/admin` and if you can use the credentials from the step before to log into the admin.
9. Stop the server.
10. Install knex cli `npm install knex -g`
11. Run `knex migrate:up`
12. Start the server again.