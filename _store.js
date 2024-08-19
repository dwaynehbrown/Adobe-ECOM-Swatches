const { Dropbox } = require('dropbox')
const DropboxHelper = require("./_dropbox");

class Store {
    constructor(config = { provider: '', key: ''}) {
        this.config = config;

        if (!this.config?.provider) throw 'Storage service required a provider name';
        if (!this.config?.key) throw 'Storage service required an auth key';
        switch (this.config.provider) {
            case 'dropbox':
                this.helper = this.helper || new DropboxHelper(this.config?.key)
                break;
            case 's3':
                // TODO
                break;
        }

        this.service = {
            's3': {
                // TODO
                getFileList: '',
                getDownloadLinks: '',
                getUploadLinks: ''
            },
            'azure': {
                 // TODO
                 getFileList: '',
                 getDownloadLinks: '',
                 getUploadLinks: ''
            },
            'box': {
                 // TODO
                 getFileList: '',
                 getDownloadLinks: '',
                 getUploadLinks: ''
            },
            'dropbox': {
                getFileList: this.helper?.getFiles,
                getDownloadLinks: this.helper?.getDropboxTempLinks,
                getUploadLinks: this.helper?.getDropboxTempUploadLinks
                // getFileList: DropboxHelper.getFiles,
                // getDownloadLinks: DropboxHelper.getDropboxTempLinks,
                // getUploadLinks: DropboxHelper.getDropboxTempUploadLinks
            }
        }

    }

    getFileList = async (path) => { return this.service[this.config.provider].getFileList(path) }
    getDownloadLinks = async (path) => { return this.service[this.config.provider].getDownloadLinks(path) }
    getUploadLinks = async (path, dir_out, format) => { return this.service[this.config.provider].getUploadLinks(path, dir_out, format) }

}

module.exports = Store;