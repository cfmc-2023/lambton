const mongoose = require("mongoose");
const Product = require("../models/product");
const moment = require("moment");

exports.verifyCoupon = (req, res, next) => {
  let response;
  console.log("request body---", req.body);
  Product.find({ voucher: req.body.voucher })
    .select("email voucher _id discount validity validityDate productType productName brandName minPrice valid")
    .exec()
    .then(docs => {
      // console.log("response on verify--",moment(docs[0].validityDate).format('ddd/mm/yyyy'), docs, docs.length > 0, docs[0].voucher === req.body.voucher, docs[0].minPrice <= req.body.minPrice);
      if(docs.length > 0 && docs[0].voucher === req.body.voucher && docs[0].valid){
        response = {
              email: docs[0].email,
              discount: docs[0].discount,
              voucher: docs[0].voucher,
              validityDate: moment(docs[0].validityDate).format('LL'),
              valid: docs[0].valid,
              message: "Valid"
        };
       return res.status(200).json(response);
      } else {
        console.log("email--verify",docs[0], response);
        return res.status(400).json({
              email: req.body.email,
              discount: 0,
              voucher: req.body.voucher,
              validityDate: moment(new Date()).format('LL').toString(),
              valid: false,
              message: "Invalid voucher!"
        });
      }
    })
    .catch(err => {
      console.log("error in catch",err, req.body, response);
      res.status(500).json({
              discount: 0,
              voucher: req.body.voucher,
              email: req.body.email ? req.body.email : '',
              validityDate: moment(req.body.validityDate).format('LL'),
              valid: req.body.valid || false,
              message: "Invalid voucher!"
      });
    });
};