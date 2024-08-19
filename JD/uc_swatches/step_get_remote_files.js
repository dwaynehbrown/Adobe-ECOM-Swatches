const _keys = require('../../_keys');
const Step = require('../../_step');
// Steps should call the stores directly to allow for different steps to use different stores
const Store = require('../../_store'),

    FileStore = new Store({
        provider: 'dropbox',
        key: _keys.dropbox,
    });

const step_one = new Step(
    {
        title: 'Step 1 - load remote files ',
        desc: 'dropbox'
    },
    async () => {

            let files = [],
                filesCont = [],
                filesList = [],

                DIR_IMG = '/JD/swatches/Images',
                DIR_ACT = '/JD/swatches/Actions',
                DIR_OUT = '/JD/swatches/Output/Images',
                // TO DO - change file extension for upload links for ps.createRendition ();
                FMT_OUT = ".jpg";

            console.log(`working ... : start ${Date.now()}`);

            let assets = {
            }

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
                    // return values to runner and next step
                    return(values);
                })

    }

    ,
)

module.exports = step_one;