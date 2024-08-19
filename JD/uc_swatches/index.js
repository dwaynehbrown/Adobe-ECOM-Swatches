const Runner = require('../../_runner')
const config = require('./config');
const step_one = require('./step_get_remote_files');
const step_two = require('./step_play_ps_actions');

const

    runner = new Runner({
        // ...config.meta

        title: 'JD Sports Use Case Swatches',
        desc: 'crop > swatch > guides (from action)'
    
    }
        ,
        [
            // Get remote files 
                // * returns a list of file names for images, actions and uploadlinks
            step_one,
            // Photoshop play photoshop actions
                // * returns a list of job statuses [ fulfilled : rejected ]
            step_two

        ]
    );

try {
    runner.start ();
} catch (e) {
    console.log('Exception ', e)
}