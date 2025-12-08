import { resendClient, sender } from "../config/resend.js"
import { createWelcomeEmailTemplate } from '../Emails/emailTemplates.js'

export const senderWelcomeEmail = async(email,name, cleintURL )=>{
    const { data,error }= await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to catify",
        html: createWelcomeEmailTemplate(name,cleintURL),
    })

    if(error){
        console.error("Error sending welcome email:",error);
        throw new Error("Failed to send welcome email")
    }

    console.log("Welcome Email sent successfully", data)
}
