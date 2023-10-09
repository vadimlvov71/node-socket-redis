
async function getUserNames(client, status, keys){
    console.log('____keys');
    console.log(keys);
    const results = [];
    const obj = {};
    //return new Promise((resolve, reject) => {
        for (const [index, id] of keys.entries()) {
        //keys.forEach( async function(id) {
            //id = "user_id:1";
            //let user = await client.hGetAll('user_id:1');
            let user = await client.hGetAll(id);
            //if(user.status == status){
                //results.push(JSON.parse(JSON.stringify(user)));
                results.push(user);
                obj[user.user_id] = user 
            //}
            
        //});
        //console.log(results);
        //resolve( results);
    //});
    }
    //console.log('results');
    //console.log(results);
    //}

        return obj;
}
   
 async function getKeys(client, pattern="*", count=10) {
    const results = [];
    const iteratorParams = {
        MATCH: pattern,
        COUNT: count
    }
    for await (const key of client.scanIterator(iteratorParams)) {
        results.push(key);
       // console.log("key: " + key);
    }
    return results;
}
module.exports = {
    getKeys: getKeys,
    getUserNames: getUserNames,
};
//module.exports.getKeys = getKeys;
//module.exports.getUserNames = getUserNames;