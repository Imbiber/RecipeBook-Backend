const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const FormData = require("form-data");
const dotenv = require("dotenv");

const connectToDatabase = require("./database");
dotenv.config();

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

async function startServer() {
  // Connect to the database
  await connectToDatabase();

  //Create an Express app
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  // Create an Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply the Apollo middleware to the Express app
  server.applyMiddleware({ app });

  app.post("/upload-to-imgbb", async (req, res) => {
    // console.log(req.body);
    const { image } = req.body;
    const formData = new FormData();  
    formData.append("image", image);

    try {
      const imgbbResponse = await fetch(
        "https://api.imgbb.com/1/upload?expiration=" + `key=${process.env.IMGBB_KEY}`,
        {
          method: "POST",
          headers: {
            "access-control-allow-origin": "*",
          },
          body: formData,
        }
      );
      const imgbbData = await imgbbResponse.json();
      res.json(imgbbData);
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get recipe from huggingface model
  app.post("/generate-recipe", async (req, res) => {
    try {
      const response = await query(req.body);
      res.json(response);
    } catch (error) {
      console.error("Error querying Hugging Face API:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  // Start the Express server
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
