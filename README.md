Project: Adobe APIs Node JS step by step automation script
Contact: dwayneb@adobe.com

## 🧐 About <a name = "about"></a>

This is a sample Node JS script that runs 'steps' one after the other, waiting for the previous step to complete before moving onto the next one.
Initially the script was built using a series of promises but for time it was updated to work with async anonymous functions. 

The project containts the following folder structure : 

Customer Implementation Files
```
./[customer]                                   | customer namespace
./[customer]/[use case]                        | use case namespace
./[customer]/[use case]/Output                 | output folder collects JSON output for each distinct run 
./[customer]/[use case]/index.js               | *entry point* for the use case (implements ../[...module files].js)
./[customer]/[use case]/config.js              | optional config option to pass to the runner / steps 
./[customer]/[use case]/[step_...].js          | each individual steps


./JD                | contains subfolders with distinct implentations of the runner
./JD/uc_ecom        | files concerned with the image crop/resize use case
./JD/uc_swatches    | files concerned with the image auto swatch use case
```

Module Files
```
./_[filename].js    | files associated with the runner

./_runner.js        | The core runner class (implements _step.js)
./_step.js          | The core step class 
./_sample_step.js   | reference - sample implementation of the step class 

./_dropbox.js   | Dropbox helper class 
./_s3.js        | [TODO] Amazon s3 helper class 

./_store.js   | RemoteFile handling helper class (implements _dropbox.js & _.s3.js)
./_utils.js   | Helper utils 
./_keys.js    | "Keystore" helper 
```

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software and how to install them.

```
node js
```

### Installing

A step by step series of examples that tell you how to get a development env running.

After downloading / cloning -> open project root in your editor 

[_keys.js] Add file storage access tokens / Adobe authentication keys to _keys.js or .env as appropriate

```
module.exports = {
     ... your keys,
     dropbox: process.env.DROPBOX_KEY,
     adobe: {
         clientId: process.env.ADOBE_CLIENT_ID,
         clientSecret: process.env.ADOBE_CLIENT_SECRET
     }
 }
```

* open chosen use case folder * in terminal

```
cd ~/JD/uc_ecom
```

Install dependancies 

```
npm i 
```


[index.js] Order the steps as you would like them to run

```
const Runner = require('../../_runner'); // import the runner 
const config = require('./config');              // import config vars (optional)
const step_one = require('./step_one');          // import your steps
const step_two = require('./step_two');          // import your steps

// Declare the runner

const
    run = new Runner({
        // information used in the JSON report created after the run is complete
        // ...config.meta

        title: 'Overarching goal of the script',      // output to console
        desc: 'extra info / considerations of note'   // output to console
    },
        [
            // steps in order of execution
            step_one,  // returns data to the running instance on completion
            step_two   // receives data from previous step from the runner
            ... 
        ]
    );

try {
    run.start();
} catch (e) {
    console.log('Exception ', e)
}
```

Invoke entry point

```
node index
```

## TODO / Limitations

- [ ] Readme for each use case 
- [ ] Support for s3 (can be added at request)  
- [ ] report total execution time
  - [ ] each step explicitly
  - [ ] all steps collectively
- [ ] notifications when complete
- [ ] preview outputs when complete

<!-- CONTACT -->
## Contact

Your Name - Dwayne Brown dwayneb@adobe.com

Project Link: [https://github.com/dwaynehbrown/Adobe-ECOM-Swatches](https://github.com/dwaynehbrown/Adobe-ECOM-Swatches)

Distributed under the MIT License. See `LICENSE.txt` for more information.




