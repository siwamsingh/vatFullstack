import express from "express";
import User from "./models/user.model.js"; // Importing the User model
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//test
app.get("/", async (req, res) => {
  console.log("hellow Q T");
  return res.status(200).json({ message: "Hellow Q T" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login, return user data
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Register Route
app.post("/register", async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new user and save it to the database
    const newUser = new User({ email, userName, password });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Order Item
app.post("/add-to-ordered-items", async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Find the user by userId
    let user = await User.findById(userId);

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if itemId already exists in user's ordered items
    if (user.orderedItems.includes(itemId)) {
      return res.status(400).json({ message: "Item already in ordered items" });
    }

    // Add the itemId to the user's ordered items
    user.orderedItems.push(itemId);
    await user.save();

    // Return success message
    return res
      .status(200)
      .json({user });
  } catch (error) {
    console.error("Add to ordered items error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Remove from Ordered Items Route
app.post("/remove-from-ordered-items", async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Find the user by userId
    let user = await User.findById(userId);

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if itemId exists in user's orderedItems
    const itemIndex = user.orderedItems.indexOf(itemId);
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in ordered items" });
    }

    // Remove the itemId from the user's orderedItems
    user.orderedItems.splice(itemIndex, 1);
    await user.save();

    // Return success message
    return res
      .status(200)
      .json({ user });
  } catch (error) {
    console.error("Remove from ordered items error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
