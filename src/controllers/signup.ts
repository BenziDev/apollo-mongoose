import argon2 from 'argon2';
import config from 'config';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import * as apollo from 'apollo-server-express';
import User from '../models/user';

export default async ({obj, args}) => {

  const { error } = signupSchema.validate(args);
  if (error) throw new apollo.UserInputError(error.details[0].message);

  try {

    const email = await checkEmail(args.email)
    if (email) throw "email already registred";

    const hash = await argon2.hash(args.password, {type: argon2.argon2id});

    const newUser = new User({
      email: args.email,
      hash
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({
      uid: savedUser._id
    }, config.get("secret"), {
      expiresIn: 60*60*24*1
    });

    return {
      access_token: token
    }

  } catch (err) {

    console.log(err);

    if (err == "email already registred") {

      throw new apollo.UserInputError("Email already registred");

    } else {

      throw new apollo.ApolloError("Internal server error");

    }

  }

}

// check if email exists
const checkEmail = async (email) => {

  try {
  
    const e = await User.findOne({email});

    if (e) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    throw "internal server error";
  }

}

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30)
});