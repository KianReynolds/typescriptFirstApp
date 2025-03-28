// import { MongoClient } from "mongodb";
// import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// const client = new MongoClient(process.env.DB_CONN_STRING as string);

// export const getBudgets = async (): Promise<APIGatewayProxyResult> => {
//   try {
//     await client.connect();
//     const db = client.db("Web2_2024");
//     const budgets = await db.collection("budgeting").find().toArray();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(budgets),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Failed to fetch budgets" }),
//     };
//   }
// };
