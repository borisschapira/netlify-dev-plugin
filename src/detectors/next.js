const {
  hasRequiredDeps,
  hasRequiredFiles,
  getYarnOrNPMCommand,
  scanScripts
} = require("./utils/jsdetect");
module.exports = function() {
  // REQUIRED FILES
  if (!hasRequiredFiles(["package.json"])) return false;
  // REQUIRED DEPS
  if (!hasRequiredDeps(["next"])) return false;

  /** everything below now assumes that we are within gatsby */

  const possibleArgsArrs = scanScripts({
    preferredScriptsArr: ["dev", "develop", "start"],
    preferredCommand: "next"
  });

  if (!possibleArgsArrs.length) {
    // ofer to run it when the user doesnt have any scripts setup! 🤯
    possibleArgsArrs.push(["next"]);
  }
  return {
    type: "next.js",
    command: getYarnOrNPMCommand(),
    port: 8888,
    proxyPort: 3000,
    env: { ...process.env },
    possibleArgsArrs,
    urlRegexp: new RegExp(`(http://)([^:]+:)${3000}(/)?`, "g"),
    dist: "out"
  };
};
