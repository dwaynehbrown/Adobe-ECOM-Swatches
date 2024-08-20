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
./[customer]/[use case]/index.js               | *entry point* for the use case
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
./_s3.js        | Amazon s3 helper class [TODO]

./_store.js   | RemoteFile handling helper class (implements _dropbox.js & _.s3.js
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

Download / clone -> open in terminal -> * open chosen use case folder *

```
cd ~/JD/uc_ecom
```

Install dependancies 

```
npm i 
```

Invoke entry point

```
node index
```
