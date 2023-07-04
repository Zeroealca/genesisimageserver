require("dotenv").config();
import { ObjectId } from "mongodb";
import client from "../database/db"; // Importa el cliente de MongoDB

const imagesCollection = client.db(process.env.DATABASE_NAME || "GenesisImages")
  .collection("Images");

const imageService = {
  createImage: (image) => {
    try {
      const result = imagesCollection.insertOne(image);
      // await companiesCollection.insertOne(company);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getImage: (image) => {
    try {
      const query = {
        $and: [{ image: image.image }, { password: image.password }],
      };
      const result = imagesCollection.find(query).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getImageById: (id) => {
    try {
      const query = { _id: new ObjectId(id) };
      const result = imagesCollection.find(query).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getImagesByIds: (ids) => {
    try {
      const query = { _id: { $in: ids } };
      const result = imagesCollection.find(query).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllImages: () => {
    try {
      const result = imagesCollection.find({}).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllImagesByCompany: (company) => {
    try {
      const query = { company: company };
      const result = imagesCollection.find(query).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getManyByIds: (ids) => {
    try {
      const query = { _id: { $in: ids.map((id)=>new ObjectId(id)) } };
      const result = imagesCollection.find(query).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateImage: async (id, password, rol) => {
    try {
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          rol,
          password,
        },
      };
      const result = await imagesCollection.updateOne(query, update);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  changePassword: async (id, password) => {
    try {
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          password: password,
        },
      };
      const result = await imagesCollection.updateOne(query, update);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteImage: async (id) => {
    try {
      const query = { _id: new ObjectId(id) };
      const result = await imagesCollection.deleteOne(query);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export default imageService;
