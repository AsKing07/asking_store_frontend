export default function handler(req, res) {
    let nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({ 
        service: 'Gmail',
        auth : { 
            user : 'charbelsnn@gmail.com', 
            pass : process.env.GOOGLE_APP_PASSWORD, 
        }, 
        secure : true, 
    });
    transporter.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Ready to Send");
        }
    });

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const userMail = {
        from: "AsKing Store- Do Not reply", // Modifier l'expéditeur
        to: email, // Utiliser l'adresse e-mail de l'utilisateur
        subject: "Merci pour votre message - AsKing Store",
        html: `<p>Bonjour ${name},</p>
               <p>Nous vous remercions d'avoir contacté AsKing Store.</p>
               <p>Nous avons bien reçu votre message :</p>
               <p>Message: ${message}</p>
               <p>Nous vous recontacterons sous peu.</p>
               <p>Cordialement,<br/>L'équipe AsKing Store</p>
               <p>Cet email a été envoyé automatiquement, veuillez ne pas y répondre!</p>`,
    };

    const adminMail = {
        from: name,
        to: "charbelsnn@gmail.com",
        subject: "Contact Form Submission - AsKing Store",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Message: ${message}</p>`,
    };

    transporter.sendMail(adminMail, (error) => {
        if (error) {
            res.json(error);
        } else {
            // Envoi de l'e-mail de remerciement à l'utilisateur
            transporter.sendMail(userMail, (err) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json({ code: 200, status: "Message Sent" });
                }
            });
        }
    });
}
