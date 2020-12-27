import Joi from '@hapi/joi';
import * as apollo from 'apollo-server-express';
import User from '../models/user';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from 'config';

export default async ({obj, args}) => {

  const { error } = loginSchema.validate(args);
  if (error) throw new apollo.UserInputError(error.details[0].message);

  try {

    const user = await User.findOne({email: args.email});
    if (!user) throw "invalid email or password";

    const matches = await argon2.verify(user.hash, args.password, {type: argon2.argon2id});

    if (matches) {

      const token = jwt.sign({
        uid: user._id
      }, config.get("secret"), {
        expiresIn: 60*60*24*1
      });
  
      return {
        access_token: token
      }

    } else {

      throw "invalid email or password";

    }

  } catch (err) {

    if (err == "invalid email or password") {
      throw new apollo.UserInputError("Invalid email or password");
    } else {
      throw new apollo.ApolloError("Internal server error");
    }
  }

}

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30)
});