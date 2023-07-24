const mongoose = require("mongoose");

var tokenSchema = mongoose.Schema(
  {
    clientId: { type: String },
    accessKey: { key: { type: String }, accessKey:{ type: String} },
    secretKey: { key: { type: String }, iv: { type: String }, secretKey:{ type: String} },
    expiryTime: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("token", tokenSchema);
