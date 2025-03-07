import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Ensure the model exists before accessing properties
    if (!models[modelName] || !models[modelName].db || !models[modelName].db.db) {
      throw new Error(`Model ${modelName} is not properly initialized.`);
    }

    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error("Error in cleanDb.ts:", err);
    throw err;
  }
};