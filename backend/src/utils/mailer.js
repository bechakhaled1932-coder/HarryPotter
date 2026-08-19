import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(user) {
  try {
    await resend.emails.send({
      from: 'Hogwarts <onboarding@resend.dev>',
      to: user.email,
      subject: '⚡ Ta lettre d\'admission à Poudlard est arrivée !',
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #f5f0e8; padding: 40px 32px; border: 2px solid #c9a84c;">
          <h1 style="color: #a67c00; text-align: center; font-size: 24px; margin-bottom: 4px;">
            ⚡ ÉCOLE DE POUDLARD ⚡
          </h1>
          <p style="text-align: center; color: #6b5a3e; font-style: italic; margin-top: 0;">
            Sorcellerie & Enchantement
          </p>

          <hr style="border: none; border-top: 1px solid #c9a84c88; margin: 24px 0;" />

          <p style="color: #2a1a00; font-size: 16px;">Cher(e) <strong>${user.username}</strong>,</p>

          <p style="color: #2a1a00; font-size: 16px; line-height: 1.6;">
            Nous avons le plaisir de vous informer que votre inscription a été acceptée
            à l'École de Sorcellerie de Poudlard. Votre compte a bien été créé et vous
            pouvez désormais explorer les maisons, les personnages et les sortilèges
            de notre univers.
          </p>

          <p style="color: #2a1a00; font-size: 16px; line-height: 1.6;">
            Nous vous souhaitons la bienvenue et une excellente année scolaire.
          </p>

          <p style="color: #2a1a00; font-size: 16px; margin-top: 32px;">
            Bien cordialement,<br />
            <strong>La Direction de Poudlard</strong>
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('❌ Erreur envoi email de bienvenue:', err.message)
  }
}