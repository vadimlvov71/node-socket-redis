/*module.exports = function getUser(client, user_id) {
    let user = client.hGetAll('user:' + user_id);
    return user; 
 }*/
 async function doSomethingWith (client, users_ids, callback){
    //console.log('users_ids: ');

       // console.log(users_ids);
    //users_ids.forEach( function(id) {
       // console.log('id');
        //console.log(id);
    return new Promise((resolve, reject) => {
        client.hGetAll("user:1", function(err, items) {
            console.log('items');
            console.log(items);
            resolve( items );
        });
    });
  }
async function getUserNames(client, status, keys){
    //let keys = getKeys(client, "user*", 100)
    console.log('____keys');
            console.log(keys);
    const results = [];
    for (const [index, id] of keys.entries()) {
    //keys.forEach( async function(id) {
        
        let user = await client.hGetAll(id);
        //if(){
        results.push(user.status);
        //console.log(user.status);
        //}
    //});
    }
    console.log('results');
    console.log(results);
    //}
    //let user = await client.hGetAll('user:2');
    //console.log(user);
        /*await client.hGetAll("user:1", (err, reply) => {
            console.log('reply');
            console.log(reply);
            results.push(reply);
        });  */
        return results;
    /*.then((users_ids) => {
        console.log('users_ids____ ');
        console.log(users_ids);
        client.hgetall("user:1", (err, reply) => {
            console.log(reply);
        });  
        //return doSomethingWith(client, users_ids, callback);
       // return new Promise((resolve, reject) => {
            /*client.hgetall("user:1", (err, reply) => {
              if (err) {
                return reject(err);
              }
              console.log('items');
                console.log(reply);
              //resolve(reply);
            }, function(err) {
                console.log('err)');
                console.log(err);
                /*redisClient.hgetall(key, function(err, data) {
                    console.log(data);
                }); */   
           // });
        //});*/
    //})*/
    /*.then((users_ids) => {

    })*/
       /*users_ids.forEach( function(id) {
            console.log('id');
            console.log(id);
            client.hGetAll("user:1", function(err, items) {
                console.log('items');
                console.log(items);
            });
        });
    });

   //getItems (client, function(users_ids){
        //console.log('users_ids');
       // console.log(users_ids);
        //return users_ids;
        /*return new Promise((resolve, reject) => {
            client.hgetall("user:1", (err, reply) => {
              if (err) {
                return reject(err);
              }
              console.log('items');
                console.log(reply);
              resolve(reply);
            });
          });*/
          
        /*Promise.all(
            users_ids.map(async (id) => {
                console.log('id');
                console.log(id);
                await client.hGetAll(id, function(err, items) {
                    console.log('items');
                    console.log(items);
                });
            }),
          );*/
       /* users_ids.forEach( function(id) {
            console.log('id');
            console.log(id);
            client.hGetAll("user:1", function(err, items) {
                console.log('items');
                console.log(items);
            });
        });*/
    //})
    /*var results = new Array();
    const iteratorParams = {
        MATCH: "user*",
        COUNT: 100
    }
    for await (users_ids of client.scanIterator(iteratorParams)) {
        console.log(users_ids);
        //if ( users_ids.length == 0 )
        //return callback( results );
        //users_ids.forEach( function(id) {
            await client.hGetAll(users_ids, function(err, items) {
            console.log('items');
            console.log(items);
            var obj = {};
            obj[id] = items; // here id can be accessed since it is part of the closure
            results.push(obj);
            if ( results.length == users.length ) {
               callback( results );
            }
            });
      //});
    }*/
    /**/

}
/*
function some_function(arg1, arg2, callback) {
    // this generates a random number between
    // arg1 and arg2

    var my_number = Math.ceil(Math.random() * (arg1 - arg2) + arg2);

    // then we're done, so we'll call the callback and
    // pass our result
    callback(my_number);
}

// call the function
some_function(5, 15, function(num) {
    // this anonymous function will run when the
    // callback is called
    console.log("callback called! " + num);
});
*/
 async function getItems(client, callback){  
     
    const results = [];
    const iteratorParams = {
        MATCH: "user:*",
        COUNT: 100
    }
    for await (const users_ids of client.scanIterator(iteratorParams)) {
        
        //console.log('users_ids');
            //console.log(users_ids);
            //results.push(users_ids);
            await client.hGetAll("user:1", (err, reply) => {
                if (err) {
                  return reject(err);
                }
                console.log('items');
                  console.log(reply);
                //resolve(reply);
              }, function(err) {
                  console.log('err)');
                  console.log(err);
                  /*redisClient.hgetall(key, function(err, data) {
                      console.log(data);
                  }); */   
              });
            //return  new Promise((resolve, reject) => {
               /* await client.hGetAll("user:1", (err, reply) => {
                  if (err) {
                    console.log('hgetall');
                    return reject(err);
                  }
                  console.log('items');
                    console.log(reply);
                    results.push(users_ids);
                });
              //});   
        /*client.hGetAll(users_ids, function(err, users) {
            results.push(users);
            console.log('users____');
            console.log(users);
            callback(users);
        })*/
    }
    //callback(results);
    //return results;
};
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
    getItems: getItems,
};
//module.exports.getKeys = getKeys;
//module.exports.getUserNames = getUserNames;