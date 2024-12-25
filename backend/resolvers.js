const UserModel = require("./models/user.model");
const RecipeModel = require("./models/recipe.model");
const CommentModel = require("./models/comment.model");

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await UserModel.find();
    },
    getAllRecipes: async () => {
      return await RecipeModel.find();
    },
    getUserById: async (_, { user_id }) => {
      return await UserModel.findById(user_id);
    },
    getRecipeById: async (_, { recipe_id }) => {
      return await RecipeModel.findById(recipe_id);
    },
    getAllRecipeComments: async (_, { recipe_id }) => {
      return await CommentModel.find({ recipe_id });
    },
    getRecipeByUserId: async (_, { user_id }) => {
      return await RecipeModel.find({ user_id });
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password, profile_pic }) => {
      // Check if a user with the same email already exists
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const newUser = new UserModel({
        name,
        email,
        password,
        profile_pic,
      });
      return await newUser.save();
    },
    addRecipe: async (
      _,
      { user_id, title, description, recipe, thumbnail, creation_date }
    ) => {
      const newRecipe = new RecipeModel({
        user_id,
        title,
        description,
        recipe,
        thumbnail,
        creation_date,
      });
      return await newRecipe.save();
    },
    addComment: async (
      _,
      { user_id, recipe_id, comment_text, comment_date }
    ) => {
      const newComment = new CommentModel({
        user_id,
        recipe_id,
        comment_text,
        comment_date,
      });
      return await newComment.save();
    },
    getUserByLogin: async (_, { name, email, password }) => {
      const user = await UserModel.findOne({ name, email, password });
      if (!user) {
        throw new Error("User not found!");
      }
      return user;
    },
  },
};

module.exports = resolvers;
