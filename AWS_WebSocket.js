const AWS = require('aws-sdk');
const client = new AWS.ApiGatewayManagementApi({endpoint:process.env.REACT_APP_ENDPOINT});

const names=  {};
const tables = {};
const sendToOne = async (id, body) => {
  try {
    await client.postToConnection({
      'ConnectionId': id,
      'Data': Buffer.from(JSON.stringify(body)),
    }).promise();
  } catch (err) {
    console.error(err);
  }
};

const sendToAll = async (ids, body) => {
  const all = ids.map(i => sendToOne(i, body));
  return Promise.all(all);
};


exports.handler = async (event) => {
    if(event.requestContext){
        const connectionId = event.requestContext.connectionId;
        const routeKey = event.requestContext.routeKey;
        let body = {};
        try{
            if(event.body){
                body = JSON.parse(event.body);
            }
        }
        catch(err){
            //
            console.log(err)
        }
        switch(routeKey){
            case '$connect':
                break;
            case '$disconnect':
                delete names[connectionId];
                break;
            case '$default':
                break;
            case 'setName':
                names[connectionId] =body.name;
                break;
            case 'sendPublic':
                await sendToAll(Object.keys(names),{publicMessage : 'this is publicMessage'});
                break;
            case 'sendPrivate':
                await sendToOne(connectionId,{privateMessage : 'this is privateMessage'});
                break;
            case 'setCnt':
                await sendToOne(connectionId,{privateMessage : 'this is setCnt'});
                break;
            default:
            //
        }
    }
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
