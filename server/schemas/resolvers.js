// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // check if users exist
            if (context.user) {
                // looks for user by id and looks at the password for that user
                const userData = await User.findOne({ _id: context.user._id }).select(
                    "-__v -password"
                );
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
    },

    Mutation: {

    },

};

module.exports = resolvers;

