require("dotenv").config();
import { ObjectId } from "mongodb";
import client from "../database/db"; // Importa el cliente de MongoDB

const companiesCollection = client.db(process.env.DATABASE_NAME || "GenesisImages")
  .collection("Company");

const companyService = {
  createCompany: (company) => {
    try {
      const result = companiesCollection.insertOne(company);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getCompany: (company) => {
    try {
      const query = { _id: new ObjectId(company) };
      const result = companiesCollection.find(query).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getCompanyByRUC:(ruc) => {
    try {
      const query = { ruc };
      const result = companiesCollection.find(query).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllCompanies: () => {
    try {
      const result = companiesCollection.find({}).toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateCompany: (id, ruc) => {
    try {
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          ruc,
        },
      };
      const result = companiesCollection.updateOne(query, update);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default companyService;
