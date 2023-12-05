/* eslint-disable no-undef */
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.NODE_ENV === 'production' ? 'smtp.vercel.app' : 'smtp.gmail.com',
  service: 'gmail',
  secure: true,
  auth: {
    user: import.meta.VITE_MAIL,
    pass: import.meta.VITE_PASS
  }
})

export const mailOptions = ({userEmail, vcTitle}) => {
  return {
    from: import.meta.VITE_MAIL,
    to: userEmail,
    subject: `Verifiable Credential for: ${vcTitle}`,
    text: '',
    html: ``
  }
}