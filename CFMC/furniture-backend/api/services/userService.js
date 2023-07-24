const userTokens = require("../models/token");
const response = require("../utility/helpers");
const moment = require("moment");
const srs = require("secure-random-string");

// Add Access Key
exports.createAccessKey = async (userId, email) => {
  try {
    const userFinds = await userFind(userId);
    if (userFinds == null) {
      const key = srs({ length: 16 });
      const text = email;
      const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
      const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
      const applySaltToChar = (code) => textToChars(key).reduce((a, b) => a ^ b, code);
      const accessKeyEncrypt = text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
      const newDate = moment().add(30, "days").format("DD-MM-YYYY");
      const accessToken = await userTokens.create({
        clientId: userId,
        accessKey: { key: key, accessKey: accessKeyEncrypt },
        expiryTime: newDate,
      });
      if (!accessToken) {
        return response.errorResponse("Error while generating access key");
      } else {
        return response.successResponse(accessKeyEncrypt, "Successfully generated access key");
      }
    } else {
      return response.errorResponse("One user create only one access key");
    }
  } catch (error) {
    return response.errorResponse("Error while generating access key 16");
  }
};
// Add Secret Key
exports.createSecretKey = async (userId, key, iv, secretKey, res) => {
  try {
    let updateSecretKey = await userTokens.findOneAndUpdate(
      { clientId: userId },
      { secretKey: { key: key, iv: iv, secretKey: secretKey } },
      { new: true }
    );
    if (!updateSecretKey) {
      return response.errorResponse(res, "Error while generating secret key");
    } else {
      return updateSecretKey;
    }
  } catch (error) {
    return response.errorResponse(res, "Error while generating secret key");
  }
};
// Delete secret key
exports.deleteSecretKey = async (userId, res) => {
  try {
    let deleteKey = await userTokens.findOneAndUpdate(
      { clientId: userId },
      { secretKey: { secretKey: "" } },
      { new: true }
    );
    if (!deleteKey) {
      return response.errorResponse(res, "Error while deleting secret key");
    } else {
      return deleteKey;
    }
  } catch (error) {
    return response.errorResponse(res, "Error while deleting secret key");
  }
};
// Find Access key
async function userFind(userId, res) {
  try {
    let usersFind = await userTokens.findOne({ clientId: userId });
    if (!usersFind) {
      return usersFind;
    } else {
      return usersFind;
    }
  } catch (error) {
    return response.errorResponse(res, "Error while finding user");
  }
}
