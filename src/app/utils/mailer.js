import User from "@/models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
const mailer = async ({ email, emailType, id }) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(id.toString(), salt);

    if (emailType === "Verify") {
      await User.findByIdAndUpdate(id, {
        verifyToken: hashed,
        tokenValidity: Date.now() + 360000,
      });
    } else if (emailType === "ForgotPassword") {
      await User.findByIdAndUpdate(id, {
        forgotPasswordToken: hashed,
        tokenValidity: Date.now() + 360000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const content = `<p>Click here to ${emailType === "Verify" ? "Verify" : "Reset Password"
      }
    <a href ="${process.env.DOMAIN}/${emailType === "Verify" ? "verification" : "new_password"
      }">${hashed}</a></p>`;

    const info = {
      from: '"emailwa 👻" <maddison53@ethereal.email>',
      to: email, // list of receivers
      subject: emailType === "Verify" ? "Verfication Mail" : "Reset Password",
      html: content, // html body
    };

    const mail = await transport.sendMail(info);

    console.log("Message sent: %s", info.messageId);
    return mail;

    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (err) {
    throw new Error(err);
  }
};

export default mailer;
