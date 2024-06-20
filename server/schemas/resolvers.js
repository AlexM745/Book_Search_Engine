// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // logs in a user
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
        // this creates a user 
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        // this is for when user logs in
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect email or password");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect email or password");
            }

            const token = signToken(user);
            return { token, user };
        },
        // this is when user clicks on save book button 
        saveBook: async (parent, { userInput }, context) => {
            if (context.user) {
                const addedBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { addedBook: userInput } },
                    { new: true, runValidators: true }
                );
                return addedBook;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // this removes the book from the user when delete book button is pressed.
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedBook;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
};

module.exports = resolvers;

