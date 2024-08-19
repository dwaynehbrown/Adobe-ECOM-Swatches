// timed runner 
const fs = require('fs');

class Runner {

    constructor(meta = { title: '', desc: '' }, steps = []) {
        this.meta = meta;
        this.steps = steps;
        this.stepsRes = [];
    }

    _prep = async () => {

        console.log('JOB ', this.meta);
        console.log ('#STEPS ', this.steps.length);

        let index = 0;
        for (let step of this.steps) {

            console.log('_pre ', index, step)

            // * TO DO 
            // ! Does not return a timed result for the each step only the sub steps  
            // ! returns a time for the in scope allPromisesSettled 
            let result = await
                step.exec(
                    this.stepsRes[index - 1]
                )
                    .then((result) => {
                        // console.log('step result ', result)

                        this.stepsRes.push(
                            { ...step.data, ...result }
                        );
                        console.log('-- runner end step --');
                        index++;
                    });

        }

        return { stepRes: this.stepsRes };
    }

    _report = (values) => {

        console.log('REPORT ', values)
        let timeFinish = Date.now();
        fs.writeFile(`./output/${timeFinish}.json`, JSON.stringify({ values }), 'utf8', () => { })

    };

    start = async () => {
        await this._prep()
            .then(values => {
                this._report(values);
            })

    };

}

module.exports = Runner;