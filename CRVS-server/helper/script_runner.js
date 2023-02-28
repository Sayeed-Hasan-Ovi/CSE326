// import spawn from 'child_process' module
const { spawn } = require('child_process');

function runScript(scriptPath, arg) {
  return new Promise((resolve, reject) => {
    // Create a new child process for running the script file
    const child = spawn('node', [scriptPath, arg]);

    // Listen for stdout data from the child process
    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    // Listen for stderr data from the child process
    child.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    // Listen for the child process to exit
    child.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Script ${scriptPath} exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

// export the function
module.exports = runScript;
