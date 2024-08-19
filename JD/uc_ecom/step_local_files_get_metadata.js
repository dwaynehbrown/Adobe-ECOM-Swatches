const Step = require('../../_step');
const sharp = require('sharp');
const Utils = require('../../_utils');

const step_local_files_get_metadata = new Step(
    {
        title: 'Step 1 - get file sizes from local',
        desc: 'local'
    },
    async (values) => {

        let meta = [];

        let getMeta = async (path) => {
            const metadata = await sharp(path).metadata();
            return metadata;
        }

        let ps = [];
        Object.keys(values).forEach(async (key, i) => {

            if (!isNaN(parseInt(key))) {
                ps.push(
                    new Promise(
                        async (resolve, reject) => {
                            await
                                getMeta(values[key])
                                    .then(value => resolve(value))
                        }
                    )
                )
            }
        })

        let filesWithMeta;

        await Promise.all(ps)
            .then(values => {


                filesWithMeta = values.map(value => {
                    return {
                        format: value.format,
                        width: value.width,
                        height: value.height,
                        modhw: value.height % value.width,
                        modwh: value.width % value.height,
                        heightWidth: value.height/value.width,
                        widthHeight: value.width/value.height,
                        depth: value.depth,
                        resolutionUnit:value.resolutionUnit,
                    }
                })

            });

        // console.log('filesWithMeta', filesWithMeta);

        return filesWithMeta;

    }

)

module.exports = step_local_files_get_metadata;