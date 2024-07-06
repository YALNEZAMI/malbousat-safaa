import mongoose from "mongoose";
import connectToDatabase from "./mongoose";

// Define the Product schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photos: { type: [String], required: true }, // Corrected array type
  sizes: { type: [String], required: true }, // Corrected array type
  sold: { type: Number, required: true },
  update_date: { type: String, required: true },
});

interface Product extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  photos: string[];
  sizes: string[];
  sold: number;
  update_date: Date | string;
}

let ProductModel: mongoose.Model<Product>;

try {
  // Attempt to retrieve the existing Product model
  ProductModel = mongoose.model<Product>("Product");
} catch {
  // If the model does not exist, create it
  ProductModel = mongoose.model<Product>("Product", ProductSchema);
}

export default defineEventHandler(async (event) => {
  await connectToDatabase(); // Connect to the database
  const query = getQuery(event);

  const method = event.node.req.method; // Get the HTTP method of the request

  switch (method) {
    case "GET":
      try {
        const products = await ProductModel.find().exec(); // Fetch products from the database
        return {
          success: true,
          message: "Products have been found",
          products,
        };
      } catch (error: any) {
        return {
          success: false,
          message: "Error fetching products",
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
        const product = new ProductModel(body); // Create a new product instance
        await product.save(); // Save the product to the database
        return {
          success: true,
          message: "Product created successfully",
          product,
        };
      } catch (error: any) {
        return {
          success: false,
          message: "Error creating product",
          error: error.message,
        };
      }

    case "PATCH":
      try {
        const config = useRuntimeConfig();
        const password = query.password;

        if (password !== config.PASSWORD_ADMIN) {
          return {
            success: false,
            message: "User not authenticated",
          };
        }

        const body: any = await readBody(event); // Read the request body
        const { _id, ...updateData } = body;

        if (!_id) {
          return {
            success: false,
            message: "Product ID is required for updating",
          };
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
          _id,
          updateData,
          {
            new: true, // Return the updated document
          }
        );

        if (!updatedProduct) {
          return {
            success: false,
            message: "Product not found",
          };
        }

        return {
          success: true,
          message: "Product updated successfully",
          product: updatedProduct,
        };
      } catch (error: any) {
        return {
          success: false,
          message: "Error updating product",
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
      const productDeleting = await ProductModel.deleteMany({
        _id: query._id,
      }).exec(); // Fetch products from the database
      let success = false;
      if (productDeleting.deletedCount == 1) {
        success = true;
      }
      return {
        success,
        deleting: productDeleting,
      };

    default:
      return {
        success: false,
        message: "Method not allowed",
      };
  }
});
