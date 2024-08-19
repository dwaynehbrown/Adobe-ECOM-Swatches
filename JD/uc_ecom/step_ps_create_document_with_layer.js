const Step = require('../../_step');
const Utils = require('../../_utils')
const _keys = require('../../_keys');
//// photoshop helper
const { PhotoshopClient } = require("@adobe/photoshop-apis");
const { FireflyClient } = require("@adobe/firefly-apis");
const { ServerToServerTokenProvider } = require("@adobe/firefly-services-common-apis");
const clientId = _keys.adobe.clientId;
const authProvider = new ServerToServerTokenProvider({
    clientId: clientId, // Provide your client id
    clientSecret: _keys.adobe.clientSecret, // Provide your client secret
    scopes: "openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis" // Provide the scopes Example: "openid,AdobeID,read_organizations,firefly_api,ff_apis"
},
    {
        autoRefresh: true // In case false is passed then the api authProvider.authenticate() should be explicitly called before making any API call
    });

const config = {
    tokenProvider: authProvider,
    clientId: clientId, // Provide your client id
};

const firefly = new FireflyClient(config);
const photoshop = new PhotoshopClient(config);

const step_ps_create_document_with_layer = new Step(
    {
        title: 'Step 4 - do photoshop create PSD ',
        desc: 'create PSD at ratio size with offset and add inital image as a layer'
    },
    async (values) => {

        // console.log('step 4 got ', values)

        let
            images = values[0],
            uploads = values[1],
            actions = values[2],
            sizes = [];

        Object.keys(values[3]).forEach(async (key, i) => {
            if (!isNaN(parseInt(key))) {
                sizes.push (values[3][key]);
            }
        })

        console.log('photoshop ...', images.length, ` : start ${Date.now()}`);

        return await Utils.promises.allSettledTimed(
        
            images.map(async (image, i) => {

                return await photoshop.createDocument({
                    options: {
                 
                        document: {
                            "height": sizes[i].height,
                            "width": sizes[i].cropwidth,       
                            "resolution": 72,
                            "fill": "transparent",
                            "mode": "rgb",
                            "depth": 8
                        },
                        layers: [
                            {
                                type: 'layer',
                                name: 'original_image',
                                input: {
                                    storage: 'dropbox',
                                    href: image
                                },
                                bounds: {
                                    "height": sizes[i].height,
                                    "left": sizes[i].offset,
                                    "top": 0,
                                    "width": sizes[i].width  
                                }
                            }
                        ]
                    },
                    outputs: [{
                        href: uploads[i],
                        storage: 'dropbox',
                        type: 'image/vnd.adobe.photoshop'
                    },

                    ]
                })


            })
        )
            .then(results => {

                // console.log(results?.value?.result);
                console.log('------- create document -------');

                results.forEach((result, i) => {

                    result.report = `${i}: ${result.status}: ${(result?.reason?.details?.outputs[0]?.errors?.title || 'no error')} : ${result.time}`;

                    console.log(result.report);

                });

                // console.log (results);
                return results;

            })

    },
)

module.exports = step_ps_create_document_with_layer;