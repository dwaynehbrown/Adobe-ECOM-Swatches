const Utils = {

    promises:{
        allSettledTimed : async (promises) => {

            const start = Date.now();
            const times = new Array(promises.length);
            return Promise.allSettled(promises.map((p, index) => {
                console.log ('timed ', p)

                return p.finally(() => {
                    times[index] = new Date(Date.now() - start).getSeconds ();
                });
            })).then(results => {
                // transfer times over to the result array
                for (let i = 0; i < results.length; i++) {
                    results[i].time = times[i];
                }
                return results;
            });
        }
    }

} 

module.exports = Utils