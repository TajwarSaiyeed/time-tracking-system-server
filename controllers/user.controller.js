const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const getPrisma = require("../lib/prisma");
/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  PUBLIC
 * @body    {String} name
 * @body    {String} email
 * @body    {String} password
 */

const registerUser = asyncHandler(async (req, res) => {
  const prisma = getPrisma();
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (user) {
      return res.status(201).json({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * @description Authenticate User /set token
 * @route   POST /api/users/auth
 * @access  Public
 * @method  POST
 */

const authUser = asyncHandler(async (req, res) => {
  const prisma = getPrisma();
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  registerUser,
  authUser,
};
