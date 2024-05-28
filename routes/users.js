const express = require("express");
const { getAllUsers, getSingleUserById, deleteUser, updateUserData, createNewUser } = require("../controllers/user-controller");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models/index");

const router = express.Router();
/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: none
 */

//localhost:8081/users
router.get("/", getAllUsers);

/**
 * Route: /:id
 * Method: GET
 * Description: Get a single user by their id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleUserById);

/**
 * Route: /
 * Method: POST
 * Description: Creating a new user
 * Access: Public
 * Parameters: none
 */
router.post("/", createNewUser);

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameters: id
 */
router.put("/:id", updateUserData);

/**
 * Route: /:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameters: id
 */
router.delete("/:id", deleteUser);

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user subscription Details
 * Access: Public
 * Parameters: id
 */
router.get("/subscription-details/:id",(req,res) => {
  const {id} = req.params;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User With the Id Does Not Exist",
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if(data === ""){
      date = new Date();
    } else {
      date = new Date(data)
    }
    let days = Math.floor(date / (1000*60*60*24));
    return days;
  };

  const subscriptionType = (user, date) => {
    let newDate = date; // Define date here
    if ((user.subscriptionType == "Basic")) {
      newDate = newDate + 90; // Use newDate instead of date
    } else if ((user.subscriptionType == "Standard")) {
      newDate = newDate + 180; // Use newDate instead of date
    } else if ((user.subscriptionType == "Premium")) {
      newDate = newDate + 365; // Use newDate instead of date
    }
    return newDate;
  };

  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(user, subscriptionDate); // Pass user and subscriptionDate to subscriptionType

  const data = {
    ...user,
    isSubscriptionExpired : subscriptionExpiration < currentDate,
    daysLeftForExpiration : 
      subscriptionExpiration <= currentDate 
        ? 0 
        : subscriptionExpiration - currentDate,
    fine : 
      returnDate < currentDate 
        ? subscriptionExpiration <= currentDate 
          ? 100 
          : 50 
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription detail for the user is: ",
    data,
  });
});

module.exports = router;


module.exports = router;