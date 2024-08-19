const _keys = require('../../_keys');
const Step = require('../../_step');
const Store = require('../../_store'),

    FileStore = new Store({
        provider: 'dropbox',
        key: _keys.dropbox
    });

const step_define_ratios = new Step(
    {
        title: 'Step 2 - define ratios',
        desc: 'returns the original height and width plus the cropwidth and offset for the new PSD layers'
    },
    async (values) => {

        let sizes = [];
        Object.keys(values).forEach((key) => {

            let s = values[key];

            /*
                {
                    format: 'jpeg',
                    width: 2909,
                    height: 3740,
                    modhw: 831,
                    modwh: 2909,
                    heightWidth: 1.2856651770367824,
                    widthHeight: 0.7778074866310161,
                    depth: 'uchar',
                    resolutionUnit: 'inch'
                }
            */

            let
                targetWidth = 4288,
                targetHeight = 3039,
                cropwidth = s.height * (targetWidth / targetHeight),  // Height x (4288/3039)
                offset = ((s.width - cropwidth) / 2) * -1 // ((Width - Crop Width) / 2 ) x -1 

            sizes.push({
                height: parseInt(s.height),
                width: parseInt(s.width),
                cropwidth: parseInt(cropwidth),
                offset: parseInt(offset)
            });
        });

        console.log(sizes);
        return sizes;

    }

)

module.exports = step_define_ratios;