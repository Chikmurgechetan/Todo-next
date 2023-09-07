import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const client = await MongoClient.connect(
      "mongodb+srv://todoData:8cOkAPedVp3fB7Fz@cluster0.woi1pck.mongodb.net/todo?retryWrites=true&w=majority"
    );
    const db = client.db();

    const todoCollection = db.collection("todo");
    const result = await todoCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Request successful" });
  } else if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://todoData:8cOkAPedVp3fB7Fz@cluster0.woi1pck.mongodb.net/todo?retryWrites=true&w=majority"
      );
      const db = client.db();

      const todoCollection = db.collection("todo");
      const result = await todoCollection.find().toArray();

      client.close();
      res.status(200).json(result);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Request failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
