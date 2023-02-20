const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID =
  "697741933845-jj5mkjo1ohpu08nf9vaag4e4ajps3jje.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN =
  "1//04z65RJCLNj-kCgYIARAAGAQSNwF-L9IretJkUfbZCtrQlhuRoIO1GHWalVFQVhp5sLqp26qTgwQ27vj1_74bw1LzMt--7sD69II";

const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const getTransporter = async () => {
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  return (transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "lieuquynh3001@gmail.com",
      accessToken,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
  }));
};

module.exports = {
  SEND_MAIL: async (to, otp) => {
    try {
      const transporter = await getTransporter();
      const mailOptions = {
        from: '"ONE SOUND" <lieuquynh3001@gmail.com>',
        to: to,
        subject: "Gửi mã OTP",
        html: ` 
        <div>
            <p>ONE SOUND gửi bạn mã OTP quên mật khẩu</p>
            <p>Mã OTP của bạn là <span style="color:blue;">${otp}</span></p>
            <p style="color: red;">Lưu ý không cung cấp OTP này cho bất kì ai</p>
        </div>`,
      };

      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            resolve(false);
          } else {
            resolve(true);
            console.log("Email sent: " + info.response);
          }
        });
      });
    } catch (error) {
      return false;
    }
  },
};
