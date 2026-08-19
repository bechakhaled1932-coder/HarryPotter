import { Resend } from 'resend'

let resend

function getResendClient() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export async function sendWelcomeEmail(user) {
  try {
    await getResendClient().emails.send({
      from: 'Hogwarts <onboarding@resend.dev>',
      to: user.email,
      subject: '⚡ Your Hogwarts acceptance letter has arrived!',
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #f5f0e8; padding: 40px 32px; border: 2px solid #c9a84c;">
          <h1 style="color: #a67c00; text-align: center; font-size: 24px; margin-bottom: 4px;">
            ⚡ HOGWARTS SCHOOL ⚡
          </h1>
          <p style="text-align: center; color: #6b5a3e; font-style: italic; margin-top: 0;">
            of Witchcraft and Wizardry
          </p>

          <hr style="border: none; border-top: 1px solid #c9a84c88; margin: 24px 0;" />

          <p style="color: #2a1a00; font-size: 16px;">Dear <strong>${user.username}</strong>,</p>

          <p style="color: #2a1a00; font-size: 16px; line-height: 1.6;">
            We are pleased to inform you that your registration has been accepted
            at Hogwarts School of Witchcraft and Wizardry. Your account has been
            successfully created, and you may now explore the houses, characters,
            and spells of our world.
          </p>

          <p style="color: #2a1a00; font-size: 16px; line-height: 1.6;">
            We wish you a warm welcome and an excellent school year.
          </p>

          <p style="color: #2a1a00; font-size: 16px; margin-top: 32px;">
            Yours sincerely,<br />
            <strong>The Hogwarts Administration</strong>
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('❌ Failed to send welcome email:', err.message)
  }
}