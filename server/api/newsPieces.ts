import mongoose from "mongoose";
import connectToDatabase from "./mongoose";

// Define the Product schema
const NewsPieceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  message: { type: String, required: true },
});

interface NewsPiece extends mongoose.Document {
  date: Date;
  message: string;
}

let NewsPieceModel: mongoose.Model<NewsPiece>;

try {
  // Attempt to retrieve the existing Product model
  NewsPieceModel = mongoose.model<NewsPiece>("NewsPiece");
} catch {
  // If the model does not exist, create it
  NewsPieceModel = mongoose.model<NewsPiece>("NewsPiece", NewsPieceSchema);
}

export default defineEventHandler(async (event) => {
  await connectToDatabase(); // Connect to the database
  const query = getQuery(event);

  const method = event.node.req.method; // Get the HTTP method of the request

  switch (method) {
    case "GET":
      try {
        const newsPieces = await NewsPieceModel.find().exec(); // Fetch products from the database
        return {
          success: true,
          message: "newsPieces have been found",
          newsPieces,
        };
      } catch (error: any) {
        return {
          success: false,
          message: "Error fetching newsPieces",
          error: error.message,
        };
      }

    case "POST":
      try {
        const config = useRuntimeConfig();
        const auth = query.password == config.PASSWORD_ADMIN;
        if (!auth) {
          return {
            message: "user not authenticated",
          };
        }
        const body: any = await readBody(event); // Read the request body
        const newsPiece = new NewsPieceModel(body); // Create a new product instance
        console.log("newspieces", newsPiece);
        await newsPiece.save(); // Save the product to the database
        return {
          success: true,
          message: "newsPiece created successfully",
          newsPiece,
        };
      } catch (error: any) {
        return {
          success: false,
          message: "Error creating newsPiece",
          error: error.message,
        };
      }
    case "DELETE":
      const config = useRuntimeConfig();
      const auth = query.password == config.PASSWORD_ADMIN;
      if (!auth) {
        return {
          message: "user not authenticated",
        };
      }
      const newsPiecesDeleting = await NewsPieceModel.deleteMany({
        _id: query._id,
      }).exec(); // Fetch products from the database
      let success = false;
      if (newsPiecesDeleting.deletedCount == 1) {
        success = true;
      }
      return {
        success,
        deleting: newsPiecesDeleting,
      };
    default:
      return {
        success: false,
        message: "Method not allowed",
      };
  }
});
