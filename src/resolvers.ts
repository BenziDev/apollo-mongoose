// import auth controllers
import signupController from './controllers/signup';
import loginController from './controllers/login';

const resolvers = {
  Query: {
    ping: () => 'Pong!',
    signup: async (obj, args) => {
      return await signupController({obj, args});
    },
    login: async (obj, args) => {
      return await loginController({obj, args});
    }
  }
};

export default resolvers;