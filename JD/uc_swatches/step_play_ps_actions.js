const Step = require('../../_step');
const Utils = require('../../_utils')

//// photoshop helper
const { PhotoshopClient } = require("@adobe/photoshop-apis");
const { FireflyClient } = require("@adobe/firefly-apis");
const { ServerToServerTokenProvider } = require("@adobe/firefly-services-common-apis");
const _keys = require('../../_keys');
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

const step_two = new Step(
    {
        title: 'Step 2 - PS API ',
        desc: 'Play photoshop actions'
    },
    async (values) => {

        let
            images = values[0],
            uploads = values[1],
            actions = values[2];

        console.log('photoshop ...', images.length, ` : start ${Date.now()}`);

        await Utils.promises.allSettledTimed(
            images.map(async (image, i) => {

                let ps_options = {
                    actions: [...actions.map(action => { return { storage: 'dropbox', href: action } })]
                },

                    ps_outputs = [
                        // {
                        //     href: uploads[i],
                        //     storage: 'dropbox',
                        //     type: 'vnd.adobe.photoshop'
                        // },
                        // {
                        //     href: uploads[i],
                        //     storage: 'dropbox',
                        //     type: 'image/vnd.adobe.photoshop'
                        // },
                        {
                            href: uploads[i],
                            storage: 'dropbox',
                            type: 'image/jpeg'
                        }
                    ];

                return photoshop.playPhotoshopActions({
                    inputs: [{
                        href: image,
                        storage: "dropbox"
                    }],
                    options: { ...ps_options },
                    outputs: [...ps_outputs]
                })
            })
        )
            .then(results => {

                console.log('-------');
                results.forEach((result, i) => {

                    result.report = `${i}: ${result.status}: ${(result?.reason?.details?.outputs[0]?.errors?.title || 'no error')} : ${result.time}`;

                    console.log(result.report);
                });

                return (results);
            })


    },
)

module.exports = step_two;