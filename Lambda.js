// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };
// Define handler function, the entry point to our code for the Lambda service
// We receive the object that triggers the function as a parameter
// Include the AWS SDK module
const AWS = require('aws-sdk');
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient();
// Use built-in module to get current date & time

// Store date and time in human-readable format in a variable
//let now = date.toISOString();

// Define handler function, the entry point to our code for the Lambda service
// We receive the object that triggers the function as a parameter
exports.handler = async (event) => {
    // Extract values from event and format as strings
    let name = JSON.stringify(`Hello from Lambda, ${event.cost}`);
    let now = new Date().toLocaleDateString(); 
    // Create JSON object with parameters for DynamoDB and store in a variable
    let params = {
        TableName:'HelloWorldDatabase',
        Item: {
            'ID':name,
            'COST' : event.cost,
            'LatestGreetingTime': now
        }
    };
    let params_ = {
        TableName: "HelloWorldDatabase",
        FilterExpression: "LatestGreetingTime = :v_LatestGreetingTime",
        ExpressionAttributeValues: {":v_LatestGreetingTime":  now },
        ProjectionExpression: "ID,COST,LatestGreetingTime",
    
    };
    

    // Using await, make sure object writes to DynamoDB table before continuing execution
    await dynamodb.put(params).promise();
    await dynamodb.scan(params_, function(err, data) {
        if (err) 
            console.log(err);
        else {
                let val = 0;
                data.Items.forEach(function(res){
                    val += res["LatestGreetingTime"];
                })
                const response = {
                    statusCode: 200,
                    body: val
                };
                return response;
            // More code here
        }
    }).promise();
};