var SENDGRID_API_KEY =
  "";
var sg = require("sendgrid")(SENDGRID_API_KEY);
// var sgMail = require('@sendgrid/mail');
const async = require("async");
var express = require("express");
var router = require("express").Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

router.post("/mail/:to/:from/:subject/:text", (req, res, next) => {
  var toAddy = req.params.to;
  var fromAddy = req.params.from;
  var subject = req.params.subject;
  var text = req.params.text;
  console.log(toAddy, fromAddy, subject, text);
  const message = {
    to: toAddy,
    from: fromAddy,
    subject: subject,
    text: text
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  console.log("message", message);

  // debugger
  sgMail
    .send(message)
    .then(() => {
      res.send("Sucessfully sent");
    })
    .catch(error => {
      //Log friendly error
      console.error(error.toString());

      //Extract error msg
      const { message, code, response } = error;

      //Extract response msg
      const { headers, body } = response;
    });
});

// Get Home Page.
// router.get("/mail", (req, res, next) => {
// res.render('email',{firstName: 'Russ'});
// });
// var request = sg.emptyRequest({
//   method: 'POST',
//   path: '/v3/mail/send',
//   body: {
//     personalizations: [
//       {
//         to: [
//           {
//             email: 'beatlockerpro@gmail.com',
//           },
//         ],
//         subject: 'Hello World from the SendGrid Node.js Library!',
//       },
//     ],
//     from: {
//       email: 'beatlockerpro@gmail.com',
//     },
//     content: [
//       {
//         type: 'text/plain',
//         value: 'Hello, Email!',
//       },
//     ],
//   },
// });

// //With promise
// sg.API(request)
//   .then(response => {
//     console.log(response.statusCode);
//     console.log(response.body);
//     console.log(response.headers);
//   })
//   .catch(error => {
//     //error is an instance of SendGridError
//     //The full response is attached to error.response
//     console.log(error.response.statusCode);
//   });

// //With callback
// sg.API(request, function(error, response) {
//   if (error) {
//     console.log('Error response received');
//   }
//   console.log(response.statusCode);
//   console.log(response.body);
//   console.log(response.headers);
// });

module.exports = { router };
