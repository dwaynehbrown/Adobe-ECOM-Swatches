const Runner = require('../../_runner');
const config = require('./config');
const step_local_files_get_list = require('./step_local_files_get_list');
const step_local_files_get_metadata = require('./step_local_files_get_metadata');
const step_get_remote_links = require('./step_get_remote_links');
const step_ps_create_document_with_layer = require('./step_ps_create_document_with_layer');
const step_define_ratios = require('./step_define_ratios');

const
    run = new Runner({
        // ...config.meta

        title: 'JD Sports Use Case ECOM',
        desc: 'autocrop and compose on PSD'

    },
        [
            // Browse local machine for files and return file name and photo dimensions
                // * returns a list of file names
            step_local_files_get_list,
            // Assign size ratio from size pulled locally 
                // * returns metadata for each image collected in previous step
            step_local_files_get_metadata,
            // define ratio for runner
                // * returns height, width & offset values to use later
            step_define_ratios, 
            // Get remote upload links for files length returned from original call
                // * returns upload URLs and temporary download URLs for the source image
            step_get_remote_links,
            // Create PSD with photo files as layer
                // * returns a job status [fulfilled : rejected]
            step_ps_create_document_with_layer
        ]
    );

try {
    run.start();
} catch (e) {
    console.log('Exception ', e)
}