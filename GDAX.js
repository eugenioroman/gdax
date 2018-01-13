  /**
  * Part 1: sha256 hmac signature
  * 
  * Source: https://docs.gdax.com/?javascript#signing-a-message
  * Create a sha256 hmac with the base64-decoded secret, 
  * then signs that message, base64-encode it and send it
  * in the response
  */

module.exports = function (context, req, res) {
  
  //res.writeHead(200, { 'Content-Type': 'text/html '});
  //res.end(message);
  
  var crypto = require('crypto');
  
  var secret = context.secrets.secret;
  console.log('secret is ' + secret);
  var timestamp = Date.now() / 1000;
  var requestPath = '/orders';
  var body = JSON.stringify({
    "size":"10",
    //"price":"0.100",
    "type":"market",
    "side":"buy",
    "product_id":"BTC-EUR"
  });
  var method = 'POST';
  
  // create the prehash string by concatenating required parts
  var what = timestamp + method + requestPath + body;
  console.log(what);
  // decode the base64 secret
  var key = Buffer(secret, 'base64');
  
  // create a sha256 hmac with the secret
  var hmac = crypto.createHmac('sha256', key);
  
  return hmac.update(what).digest('base64');
  
  // sign the require message with the hmac
  // and finally base64 encode the result
  // NOTE: In GDAX example, it returns the value
  //var message = hmac.update(what).digest('base64');
  //console.log('message is ' + message);
  // I convert the string to a JSON to be loaded from Bubble
  //var messageObj = {
    //secret: secret,
    //explanation: 'This is a signed message',
    //body: body,
    //timestamp: timestamp,
    //signed_message: message
  }  

  /**
  * Part 2: Deploy service
  * 
  * Source: https://medium.freecodecamp.org/create-a-simple-rest-api-endpoint-using-webtask-io-d9607fc00c17
  * Deploy a service without any additional configuration or 
  * administration. It allows you to integrate webhooks from
  * external APIs and interact with the data or query using other backends.
  */  
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  switch(req.method ){
    case 'GET':
      //res.end(message);
      res.end(JSON.stringify(messageObj));
    break;
    case 'POST':
      //writeJSON(res, {error: 'POST method not implemented'});
      res.end((message));
    break;
    case 'DELETE':
      writeJSON(res, {error: 'DELETE method not implemented'});
    break;
    case 'PUT':
      writeJSON(res, {error: 'PUT method not implemented'});
    break;
  }
  res.end(message);
};

/**
* NOTE: The calls are made to this endpoint:
* https://wt-74c77ac7054f15147e6253e20b81655c-0.run.webtask.io/cryptomatic
*/