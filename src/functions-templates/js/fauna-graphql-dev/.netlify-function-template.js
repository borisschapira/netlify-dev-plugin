const execa = require("execa");
module.exports = {
  name: "fauna-graphql-dev",
  description: "GraphQL function using Fauna DB [Private Beta]",
  addons: [
    {
      addonName: "fauna",
      addonDidInstall(fnPath) {
        execa.sync(fnPath + "/sync-schema.js", undefined, {
          env: process.env,
          stdio: "inherit"
        });
      }
    }
  ]
};
