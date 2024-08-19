const { Dropbox } = require('dropbox')

class DropboxHelper {
    constructor(key) {
        this.key = key;
        this.dbx = new Dropbox({ accessToken: this.key });

        this.defaults = {
            DIR_IMG : '/Images',
            DIR_ACT : '/Actions',
            DIR_OUT : '/Output/Images',
            FMT_OUT : ".psd"
        }
    
    }

    getFiles = async (path = '', connection = {}) => {
        return new Promise(async (resolve, reject) => {

            let files = [],
                filesCont = [],
                filesList = [];

            try {

                let folders = this.dbx.filesListFolder(
                    {
                        "include_deleted": false,
                        "include_has_explicit_shared_members": true,
                        "include_media_info": true,
                        "include_mounted_folders": false,
                        "include_non_downloadable_files": true,
                        "path": `${path}`,
                        "recursive": false
                    }
                )
                    .then(res => {

                        let more = res?.result?.has_more || false,
                            files = res?.result?.entries.filter(entry => entry['.tag'] == 'file') || [];

                        // console.log("call 1 \n", res?.result?.entries);

                        if (more) this.dbx.filesListFolderContinue({
                            cursor: res?.result?.cursor
                        })
                            .then(res => {
                                // res => console.log("call 2 \n", res),

                                filesCont = res?.result?.entries.filter(entry => entry['.tag'] == 'file') || [];

                            })

                        files = [...files, ...filesCont]

                        resolve(files);

                    })

            } catch (e) {
                reject(e);
            }

        })
    }

    getDropboxTempLinks = async (files) => {

        return new Promise(async (resolve, reject) => {

            let downlinks = [];
       
            await Promise.all(
                files.map(
                    async file => {

                        await this.dbx.filesGetTemporaryLink({
                            path: file.path_display
                        })
                            .then(res => downlinks.push(res?.result?.link))

                    }
                ))

            resolve(downlinks);

        })

    }

    getDropboxTempUploadLinks = async (files, dir_out = this.defaults.DIR_OUT, format) => {

        return new Promise(async (resolve, reject) => {

            try {
                let uplinks = [];

                await Promise.all(files.map(async file => {

                    let parts = file.path_display.split('/');

                    // return;

                    let filename = parts[parts.length - 1];

                    if (format == '.psd') filename = `${parts[parts.length - 1].split('.')[0]}.psd`;

                    let path = `${dir_out}/${filename}`;
                    console.log('expect: ', path);

                    await this.dbx.filesGetTemporaryUploadLink(
                        {
                            "commit_info": {
                                "autorename": false,
                                "mode": "add",
                                "mute": false,
                                "path": path,
                                "strict_conflict": false
                            },
                            // "duration": 14400
                        }).then(res => uplinks.push(res?.result?.link))
                }))

                resolve(uplinks);
            } catch (e) {
                reject(e)
            }

        })

    }

}




module.exports = DropboxHelper;