import mongoose from 'mongoose';
import config from 'config';

export default async () => {

  try {

    let db = await mongoose.connect(config.get("mongo"), {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

    return db;

  } catch (err) {

    throw "Unable to connect to database";

  }

}