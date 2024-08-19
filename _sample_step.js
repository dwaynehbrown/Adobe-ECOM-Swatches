const Step = require('../../_step');
const step_sample = new Step (
    {
        title: 'Step 3 - PS second action ',
        desc: ''
    },
    async (data) => {

        // * ^ data will include any args returned in the previous Step

        // ? reutrn an object for use with async function in _runner.js[_prep ()]
        return {}

        // ? return a promise for use with Utils.promises.allSettledTimed in _runner.js[_prep ()]
        return new Promise ((resolve, reject) => {
            setTimeout (async () => {

                // return await photoshop.createDocument({
                //     options: {
                //         document: {
                //             height: 4000,
                //             width: 4000,
                //             resolution: 72,
                //             fill: 'transparent',
                //             mode: 'rgb'
                //         },
                //         layers:[
                            // {
                            //     type: 'layer',
                            //     name: 'original_image',
                            //     input: {
                            //         storage: 'dropbox',
                            //         href: image
                            //     }
                            // }
                //         ]
                //     },
                //     outputs: [{
                //         href: uploads[i],
                //         storage: 'dropbox',
                //         type: 'image/vnd.adobe.photoshop'
                //     },

                //     ]
                // })



                resolve ('step sample');
            }, 2000)
        })
       
    },
)

module.exports = step_sample;