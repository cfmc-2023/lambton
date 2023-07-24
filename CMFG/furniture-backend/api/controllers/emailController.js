const mongoose = require("mongoose");
const send = require("../mailer/sendMial");

exports.send_email = (req, res, next) => {
  send.sendMail(req.body.voucher, req.body.email);
};