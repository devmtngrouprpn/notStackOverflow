const nodemailer = require("nodemailer");
module.exports = {
  SendMail: async (req, res) => {
    const output = `
      <p>Hello This is sent over mail</p>
      <ul>
      <il>This</il>
      <il>Is</il>
      <il>A <il>
      <il>New</il>
      </ul>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "ryanzhutch@gmail.com", // generated ethereal user
        pass: "D!rtbike98" // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Im Scary 👻" <rzhutch98@gmail.com', // sender address
      to: "rzhutch98@gmail.com", // list of receivers
      subject: "New World", // Subject line
      text: "Hello world?", // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err, info);
      }
    });

    // console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // res.render(`Home`, { msg: "Mail has been sent" });
    res.status(200).send({ msg: "Mail Has Been Sent" });
  }
};
