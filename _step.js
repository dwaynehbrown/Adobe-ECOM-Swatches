const Utils = require('./_utils');

let stepExecSample = async () => {
    return await Promise.all([
        new Promise((resolve, reject) => {

            // whatever needs to be done in this block for this step

            resolve({});
        })
    ])
        .then(values => {
            // return values to the Runner instance
                // these values will be passed to the next step in the running order if there is one
            return (values);
        })
}

class Step {

    constructor(data = {}, exec = stepExecSample) {
        this.exec = exec;
        this.data = data;
    }

    _validate = (step) => {

        // TO DO
        // has metadata for reporting
        // has exec for code to execute
        // exec is promise
        // has data - even if empty

        return {
            metadata,
            exec,
            data
        }

    }

}


module.exports = Step;