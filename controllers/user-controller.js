const { UserModel, BookModel } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Users Found In The Database",
      });
    }

    res.status(200).json({
      success: true,
      message: "These are the user info",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Oops! Something went wrong while fetching users. Please try again later.",
      error: error.message,
    });
  }
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist. Maybe they took a vacation!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found! Here's the info:",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Hmm, something went wrong on our end. Please give it another go!",
      error: error.message,
    });
  }
};

exports.createNewUser = async (req, res) => {
  const { name, surname, email, subscriptionType, subscriptionDate } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "A user with this email already exists. Try using another email!",
      });
    }

    const newUser = new UserModel({
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User added successfully! Welcome aboard!",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Yikes! We encountered an issue while creating the user. Please try again.",
      error: error.message,
    });
  }
};

exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const updatedUserData = await UserModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!updatedUserData) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist. Please check the ID and try again.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully! Here's the new info:",
      data: updatedUserData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Oh no! We couldn't update the user. Let's give it another shot later.",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist. Maybe they already left?",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully! They will be missed.",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Oops! We hit a snag while trying to delete the user. Please try again later.",
      error: error.message,
    });
  }
};
