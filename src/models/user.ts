import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  email: string,
  hash: string,
  _id: mongoose.Schema.Types.ObjectId
}

const User:mongoose.Schema = new Schema({
  email: {type: String, required: true},
  hash: {type: String, required: true}
});

export default mongoose.model<IUser>("users", User);