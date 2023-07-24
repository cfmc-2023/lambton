const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userService = require("../services/userService");
const response = require("../utility/helpers");
const crypto = require("crypto");
const srs = require("secure-random-string");
const Redis = require("redis");
const { timeStamp, time } = require("console");
const redisClient = Redis.createClient({ legacyMode: true });
async function connection() {
  await redisClient.connect();
}
connection();

exports.getallusers = async (req, res) => {
  try {
    redisClient.get("users", async (error, users) => {
      if (error) console.error(error);
      if (users != null) {
        console.log("REDIS HIT");
        return res.json(JSON.parse(users));
      } else {
        console.log("Missed");
        const getUser = await User.find();
        redisClient.set("users", JSON.stringify(getUser));
        res.json(getUser);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
// exports.updateuser = async (req, res) => {
//   const id = req.params.id;
//   try {
//     redisClient.get(`updatedusers?ID=${id}`, async (error, updatedusers) => {
//       if (error) console.error(error);
//       if (updatedusers != null) {
//         console.log("REDIS HIT");
//         return res.json(JSON.parse(updatedusers));
//       } else {
//         console.log("REDIS MISSED");
//         const updateUser = await User.findByIdAndUpdate(id, req.body, {
//           new: true,
//         }).exec();
//         redisClient.set(`updatedusers?ID=${id}`, JSON.stringify(updateUser));
//         res.json(updateUser);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
exports.user_signup = (req, res, next) => {
  try {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "User already exists",
            success: false,
          });
        } else {
          console.log("*************", req.body);

          // Generate a salt
          const salt = bcrypt.genSaltSync(10);

          // Hash the password using the salt
          const hashedPassword = bcrypt.hashSync(req.body.password, salt);

          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword,
          });
          user.save().then((result) => {
            res.status(200).json({
              data: result,
              massage: "User Registered Successfully!",
              success: true,
            });
          });
        }
      });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: err,
      success: false,
    });
  }
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "User not exists",
          success: false,
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log("Error in compare ****************", err);
          return res.status(401).json({
            message: "Auth failed",
            success: false,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              password: user[0].password,
            },
            process.env.JWT_KEY || "maheshvar@233",
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Logged in successfully!",
            token: token,
            data: user[0],
            success: true,
          });
        }
        res.status(401).json({
          message: "Auth failed",
          success: false,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: err,
        success: false,
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User Deleted Successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

async function encrypt(text, key, iv) {
  try {
    const cipher = await crypto.createCipheriv("aes-128-cbc", key, iv);
    const encryptedMessage =
      cipher.update(text, "utf8", "hex") + cipher.final("hex");
    return encryptedMessage;
  } catch (error) {
    return response.errorResponse(res, "Incorrect String");
  }
}

async function decrypt(text, key, iv) {
  try {
    const decipher = await crypto.createDecipheriv("aes-128-cbc", key, iv);
    var decryptedMessage = decipher.update(text, "hex", "utf8");
    decryptedMessage += decipher.final("utf8");
    return decryptedMessage;
  } catch (error) {
    return response.errorResponse(res, "Incorrect String");
  }
}
// Secret key generate
exports.secretKeyCreate = async (req, res) => {
  try {
    const { userId } = req.userData;
    const key = srs({ length: 16 });
    const iv = srs({ length: 16 });
    const secretKey = await encrypt(userId, key, iv);
    const saveResult = await userService.createSecretKey(
      userId,
      key,
      iv,
      secretKey,
      res
    );
    if (!saveResult || saveResult == null) {
      return response.errorResponse(res, "Error while generating secret key");
    } else {
      return response.successResponse(res, secretKey, "Secret key generated");
    }
  } catch (error) {
    return response.errorResponse(res, error.message);
  }
};

exports.accessKeyCreate = async (req, res) => {
  try {
    const { userId, email } = req.userData;
    const saveResult = await userService.createAccessKey(userId, email);
    return res.status(saveResult.status).send(saveResult);
  } catch (error) {
    return response.errorResponse(res, error.message);
  }
};

exports.accessKeyDecrypt = (req, res) => {
  const salt = req.userData.userId;
  const encoded = req.body.token;
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  const decryptAccessKey = encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
  console.log("decryption key", decryptAccessKey);
};
// Delete Secret Key
exports.deleteSecretKey = async (req, res) => {
  try {
    const { userId } = req.userData;
    const deleteResult = await userService.deleteSecretKey(userId, res);
    if (!deleteResult || deleteResult == null) {
      return response.errorResponse(res, "Error while deleting secret key");
    } else {
      return response.successResponse(res, "success", "Secret key deleted");
    }
  } catch (error) {
    return response.errorResponse(res, error.message);
  }
};
