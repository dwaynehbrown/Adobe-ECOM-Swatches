
// Steps should call the stores directly to allow for different steps to use different stores
const _keys = require('../../_keys');
const Step = require('../../_step');

const Store = require('../../_store'),

    FileStore = new Store({
        provider: 'dropbox',
        key: _keys.dropbox
    });

const step_get_remote_links = new Step(
    {
        title: 'Step 3 - get remote upload links and source image remote file links',
        desc: 'dropbox'
    },
    async (prevStepOutput) => {

        console.log ('got file sizes ', prevStepOutput)

        let
            DIR_IMG = '/JD/ecom/Images',
            DIR_ACT = '/JD/ecom/Actions',
            DIR_OUT = '/JD/ecom/Output/Images',
        //     // TO DO replace file extension for use with createPSD for upload link.
            FMT_OUT = ".psd";

        console.log(`working ... : start ${Date.now()}`);

        console.log('actions ...');
        let act_files = await FileStore.getFileList(DIR_ACT)
        console.log('got actions ...', act_files.length);

        // GET IMAGE ASSETS
        console.log('images ...');
        let img_files = await FileStore.getFileList(DIR_IMG)
        console.log('got images ...', img_files.length);


        console.log('links ...');
        return await Promise.all([
            FileStore.getDownloadLinks(img_files)
            , FileStore.getUploadLinks(img_files, DIR_OUT, FMT_OUT)
            , FileStore.getDownloadLinks(act_files)
        ])
            .then(values => {
                return ([...values, prevStepOutput]);
            })

    }

)

module.exports = step_get_remote_links;