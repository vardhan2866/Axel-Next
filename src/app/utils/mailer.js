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
        tokenValidity: Date.now() + 3600000,    // in js time is specified in millisecond and this validity time for token validity which will expire after 6 mins but for testing I have set it to 1hr. 
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
    // <button className="bg-blue-500 hover:bg-blue-400 mb-5 rounded-sm">
    // {/* </button> }
    const content = `
      <div className="rounded-md shadow-md w-96">
                <div className="flex justify-center items-center bg-slate-100">
                    <img
                        src="https://www.google.com/logos/doodles/2024/paris-games-breaking-6753651837110566-s.png"
                        alt="logo"
                    ></img>
                </div>
                <hr />
                <h2 className="text-md font-semibold mb-4 mt-5 ">
                        Hey ${email},
                    </h2>
                <div className="text-center">
                    
                    <p>Click here to ${emailType === "Verify" ? "Verify" : "Reset Password"}<br />
                       
                        <a href ="${process.env.DOMAIN}/${emailType === "Verify" ? "new_password" : "verification"
                      }/${hashed}/${id}">${emailType === "Verify" ? "Verify" : "Reset Password"} ${process.env.DOMAIN}/${emailType === "Verify" ? "new_password" : "verification"
                    }/${hashed}/${id}</a> 
                    </p> 
                </div>
                <hr/>
                <footer className="bg-slate-100 text-center">Sent by Dermiatric <br/> <p className="text-center">Address</p></footer>
            </div>`;

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
