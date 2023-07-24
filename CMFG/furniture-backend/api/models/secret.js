const secretKey = require("secret-key");

console.log("secretKey", secretKey.create("1245EEB6KCJAM4DL2PHVYPBNV0XCJ9X"));

let source = "HQYOT19-JMXGQLH-333GFQK";
let target = "HQY0T19-JMXGQ1H-3331231QK";
console.log("compare keys", secretKey.compare(source, target));

exports.createToken = async (data) => {
    try {
      var CurrentDate = moment().format('DD-MM-YYYY');
      var newDate = moment(CurrentDate, "DD-MM-YYYY").add(30, 'days').format('DD-MM-YYYY');
      console.log('currentDate', CurrentDate);
      console.log('newDate', newDate);
      console.log('compare', CurrentDate===newDate);
      // var data = { secretKey: { token: data.secret, expiryTime:newDate } };
      // userTokens.create(data, async function(err, token){
      //   if (err) {
      //     console.log("err", err);
      //   } else {
      //     console.log("token", token);
      //   }
      // });
    } catch (error) {
      console.log("error ", error.message);
    }
  };
  