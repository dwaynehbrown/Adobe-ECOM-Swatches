const _keys = require('../../_keys');
const Step = require('../../_step');
const fs = require('fs');


// Steps should call the stores directly to allow for different steps to use different stores

const step_local_files_get_list = new Step(
    {
        title: 'Step 0 - get local files by name',
        desc: 'local on machine'
    },
    async () => {

        let
            dir_local = '../../../../../Dropbox/Apps/AdobeJS/JD/ecom/Images',
            files_local = [],
            filesWithSize = [],
            file_size = {};

        let fp = [];


        filenames = fs.readdirSync(dir_local);

        filenames = filenames.filter(file =>  file.indexOf('.DS_Store') == -1);
       
        return  filenames.map (file => { return `${dir_local}/${file}` })

})



module.exports = step_local_files_get_list;