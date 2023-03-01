// import exec from 'child_process' module
const { exec } = require('child_process');

function runScript(scriptPath, arg) {
  // return a promise
  return new Promise((resolve, reject) => {
    // print the script path and argument
    console.log('scriptPath: ' + scriptPath);
    console.log('arg: ' + arg);

    // execute the script
    exec(scriptPath + ' ' + arg, (error, stdout, stderr) => {
      if (error) {
        // reject the promise if there is an error
        reject(error);
      } else if (stderr) {
        // reject the promise if there is an error
        reject(stderr);
      } else {
        console.log('stdout: ' + stdout);
        // resolve the promise if the script runs successfully
        resolve(stdout);
      }
    });

  });
}

// export the function
module.exports = runScript;
