import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { createTransport } from "nodemailer";

function html({ url, host }) {
  return `
<body style="background: #f9f9f9; padding: 20px;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: #fff; max-width: 600px; margin: auto; border-radius: 10px; border: 1px solid #eaeaea;">
    <tr>
      <td align="center" style="padding: 20px 0px; font-size: 24px; font-family: Helvetica, Arial, sans-serif; color: #333;">
        Acceso a <strong>Musicabalú</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 20px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #555;">
        Haz clic en el botón de abajo para iniciar sesión o registrarte.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="#ff8e3c">
              <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; text-decoration: none; border-radius: 5px; padding: 12px 24px; display: inline-block; font-weight: bold;">
                Iniciar Sesión
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0px 10px 0px; font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #999;">
        Si no solicitaste este correo, puedes ignorarlo de forma segura.
      </td>
    </tr>
  </table>
</body>
`;
}

function text({ url, host }) {
  return `Inicia sesión en Musicabalú\n${url}\n\n`;
}

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: email,
          from: provider.from,
          subject: "Inicia sesión en Musicabalú",
          text: text({ url, host: new URL(url).host }),
          html: html({ url, host: new URL(url).host }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Error enviando email a (${failed.join(", ")})`);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.hasActiveSub = user.hasActiveSub;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (user && user.email) {
        try {
          const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
          if (dbUser) {
            await prisma.activityLog.create({
              data: {
                userId: dbUser.id,
                action: 'INICIO_SESION',
                details: 'Entró a la plataforma'
              }
            });
          }
        } catch (e) {
          console.error("Error logging signin", e);
        }
      }
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
