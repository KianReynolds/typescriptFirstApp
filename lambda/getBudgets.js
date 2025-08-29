// Import the MongoDB driver
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI ="mongodb+srv://S00237055:K4w0NzAK0EEUStgf@cluster0.mqzqp01.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(MONGODB_URI);

  // Specify which database we want to use
  const db = await client.db("Web2_2024");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {

  /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
  context.callbackWaitsForEmptyEventLoop = false;
  const db = await connectToDatabase();
  const budgets = await db.collection("budgeting").find({}).sort({"_id":-1}).limit(20).toArray();
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Header": "Content-Type", // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE" // Allowed methods
    },
    body: JSON.stringify(budgets),
  };

  return response;
};