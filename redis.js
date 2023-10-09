import express from 'express';
import { createServer } from 'http';
import { createClient } from 'redis';


const host = 'redis://redis';
const port = 6379; // Default Redis port


const app = express(); 
const server = createServer(app); 

/*
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  })
*/
const client = createClient({  url: host, port: port });
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

   /* let user = {
      name: 'John3',
      surname: 'Smith3',
      company: 'Redis3',
      age: 29
    };*/
   /* let vehicles = {
        {
            score: 4,
            value: 'car',
        },
        {
            score: 2,
            value: 'bike',
        }
    };*/
    /*await client.set('keyTESt', 'Newvalue');
    const value = await client.get('keyTESt');
    console.log(value);*/
    //////
    //await client.HSET('user:user-session:123',  "name", "jane", "age", 20);
   /*await client.HSET('user-session:123', {
      name: 'aaaa',
      surname: 'bbbb',
      company: 'ccccc',
      age: 29
    })*/
    /*let id = 1;
    client.HSET('user', id, JSON.stringify(user), function(err, reply) {
      if (err) throw err;
 
      console.log("Reply : "+ reply);     
  });*/
 /* 
numAdded = await client.zAdd('vehicles', 1, {
    score: 4,
    value: 'car',
});
 numAdded = await client.zAdd('vehicles', 1, {
    score: 2,
    value: 'bike',
});
*/



await client.hSet('user:1', {
    user_id: '1',
    status: 'online',
    firstName: 'John',
    lastName: 'Travolta',
    company: 'Redis',
    birthDay: '05/03/1984',
    image: "travolta.jpeg"
});
await client.hSet('user:2', {
    user_id: '2',
    status: 'online',
    firstName: 'Samuel',
    lastName: 'L Jackson',
    company: 'company12',
    birthDay: '09/02/1982',
    image: "samuel.jpeg"
  });
  await client.hSet('user:3', {
    user_id: '3',
    status: 'online',
    firstName: 'Quentin',
    lastName: 'Tarantino',
    company: 'company12',
    birthDay: '09/02/1982',
    image: "tarantino.jpeg"
  });
 
  await client.hSet('user:4', {
    user_id: '4',
    status: 'offline',
    firstName: 'Vadim',
    lastName: 'Podolian',
    company: 'company12',
    birthDay: '07/11/1971',
    image: "samuel.jpeg"
  }); 
  

//await client.SADD('users', { user_id: '1', name: "aaa"});
/*
client.sMembers("users", function(err,results) {
    //console.log(results);
})*/
/*
let getUser = (user_id) => { 
    let user = client.hGetAll('user:' + user_id);
    return user; 
  };
  */
  console.log('start');
  var cursor = '0';
 var pattern = "user*";
 var count = 100;
//function scan(){
    
    async function getKeys(pattern="*", count=10) {
        const results = [];
        const iteratorParams = {
            MATCH: pattern,
            COUNT: count
        }
        for await (const key of client.scanIterator(iteratorParams)) {
            results.push(key);
            //console.log(key);
        }
        return results;
    }
//.then((result) => {
    
//scan(); //call scan function
/*
getKeys("user*", 100)
.then((result) => {
    console.log(result)
})
.catch(err => console.error(err))
*/
//console.log(users);
 /*
  client.keys('user:*', function (err, keys) {
    if (err) return console.log(err);

    for(var i = 0, len = keys.length; i < len; i++) {
        async.map(userKeys, 
            function(userKey, callback) {
                client.hGetAll(userKey, function(err, user) {
                    if (!err) {
                        callback(null, user);
                    }
                    else {
                        callback(err);
                    }
                    console.log(user);
                });
            }, 
            function(err, userList) {
                if (!err) {
                    functionCallback(null, userList);
                }
                else {
                    functionCallback(err);
                }
            });
    }
});
*/
//console.log(userKeys);
 // console.log(await client.SMEMBERS("user:*:status:online"));
console.log(JSON.stringify(await getUser(1), null, 2));
console.log(JSON.stringify(await getUser(2), null, 2));
console.log(JSON.stringify(await getUser(3), null, 2));
console.log(JSON.stringify(await getUser(4), null, 2));
// add some users

//const result = await client.zrange("movie-ratings", 1, 3);
/*client.zrange("myzset", 0, 10, function (err, list) {
    if (err) throw err;
    console.log("plain range:", list);
});*/

//let userSession = await client.hGetAll('user:1');
//console.log(JSON.stringify(userSession, null, 2)); 
//let userSession2 = await client.hGetAll('user:2');
//console.log(JSON.stringify(userSession2, null, 2)); 
console.log(`end`);

function getUser(user_id) {
    let user = client.hGetAll('user:' + user_id);
    return user; 
};
