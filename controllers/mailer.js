"use strict";
const nodemailer = require('nodemailer');
// const mailhost = process.env['maile'];
// const passhost = process.env['passe'];
const template_id_registration = process.env['template_id_registration'];
const apikey = process.env['API_KEY'];
const sgMail = require('@sendgrid/mail')

// async..await is not allowed in global scope, must use a wrapper
async function sendmailer(to1, name1) {
  sgMail.setApiKey(apikey)
           const msg = {
                  from: "admin@askoverflow.co",
                  template_id: template_id_registration,
                  personalizations: [{
                      to: { email: to1 },
                      dynamic_template_data: {
                          name: name1,
                      },
                  }],
                  
                };
            sgMail
              .send(msg)
              .then(() => {
                console.log('Email sent')
              })
              .catch((error) => {
                console.error(error)
              })
  
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: hoste,
  //   port: porte, // true for 465, false for other ports
  //   auth: {
  //     user: mailhost, // generated ethereal user
  //     pass: passhost, // generated ethereal password
  //   },
  // });

  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: "Askoverflow Admin", // sender address
  //   to: to1, // list of receivers
  //   subject: subject1, // Subject line
  //   text: text1, // plain text body
  //   html: html1, // html body
  // });
}
module.exports = { sendmailer };