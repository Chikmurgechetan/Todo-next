import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id } = req.query;

      // Connect to your MongoDB database
      const client = await MongoClient.connect(
        "mongodb+srv://todoData:8cOkAPedVp3fB7Fz@cluster0.woi1pck.mongodb.net/todo?retryWrites=true&w=majority"
      );
      const db = client.db();

      // Get a reference to the "todo" collection
      const todoCollection = db.collection("todo");

      // Find the task by ID and update the "isCompleted" field
      const result = await todoCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isCompleted: true } } // Set "isCompleted" to true for incomplete tasks
      );

      // Close the MongoDB connection
      client.close();

      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Task marked as completed" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error: Something went wrong" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      const client = await MongoClient.connect(
        "mongodb+srv://todoData:8cOkAPedVp3fB7Fz@cluster0.woi1pck.mongodb.net/todo?retryWrites=true&w=majority"
      );
      const db = client.db();

      const todoCollection = db.collection("todo");
      const result = await todoCollection.deleteOne({
        _id: new ObjectId(id),
      });

      client.close();

      if (result.deletedCount > 0) {
        return res.status(200).json({ message: "Delete successful" });
      } else {
        return res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Server error: Something went wrong" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
