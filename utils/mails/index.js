const mailer = require('nodemailer');

const sendEmail = async (to) => {

    const smtpTransport = mailer.createTransport({
        service:"Gmail",
        auth:{
            user: "hasheemismath@gmail.com",
            pass:  process.env.MailPassowrd
        }
    });

    var mailOptions = {
        from: 'hasheemismath@gmail.com',
        to:to,
        subject: 'OTP Genarate',
        text: 'Please find the OTP here'
    };

    await smtpTransport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }