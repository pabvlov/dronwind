import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, rut, phone, email, comments, model } = body;

    // Validación básica
    if (!name || !phone || !email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Faltan campos obligatorios: nombre, teléfono y correo son requeridos.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar formato de email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'El correo electrónico no tiene un formato válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('Faltan variables de entorno SMTP');
      return new Response(
        JSON.stringify({ success: false, message: 'Servidor de correo no configurado. Contacta al administrador.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: String(smtpPort) === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const toEmail = process.env.CONTACT_EMAIL || 'contacto@dronwind.cl';
    const fromEmail = process.env.SMTP_FROM || smtpUser;

    const mailOptions = {
      from: `"Formulario Dronwind" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Nueva cotización: ${model || 'Dron'} - ${name}`,
      priority: 'high',
      headers: {
        'X-Form-Source': 'dronwind.cl',
        'X-Auto-Response-Suppress': 'OOF, AutoReply'
      },
      text: `
Nueva solicitud de cotización desde el sitio web dronwind.cl

==================================================
MODELO
==================================================
${model || 'No especificado'}

==================================================
DATOS DE CONTACTO
==================================================
Nombre / Empresa: ${name}
RUT:              ${rut || 'No proporcionado'}
Teléfono:         ${phone}
Correo:           ${email}

==================================================
COMENTARIOS
==================================================
${comments || 'Sin comentarios adicionales'}
      `.trim(),
      html: `
        <div style="font-family: 'Montserrat', system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
          <div style="background: linear-gradient(225deg, #b91c1c, #000000); padding: 32px; text-align: center; border-radius: 16px 16px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900;">Nueva solicitud de cotización</h1>
            <p style="color: #d1d5db; margin: 8px 0 0;">Recibida desde dronwind.cl</p>
          </div>
          
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
            <h2 style="font-size: 18px; font-weight: 800; margin: 0 0 16px; color: #dc2626;">Modelo de interés</h2>
            <p style="margin: 0 0 24px; font-size: 16px; font-weight: 600;">${model || 'No especificado'}</p>
            
            <h2 style="font-size: 18px; font-weight: 800; margin: 0 0 16px; color: #dc2626;">Datos de contacto</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280; width: 40%;">Nombre / Empresa</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280;">RUT</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${escapeHtml(rut || 'No proporcionado')}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280;">Teléfono</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${escapeHtml(phone)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280;">Correo</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${escapeHtml(email)}</td>
              </tr>
            </table>
            
            <h2 style="font-size: 18px; font-weight: 800; margin: 0 0 16px; color: #dc2626;">Comentarios</h2>
            <div style="background: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #f3f4f6; white-space: pre-wrap; color: #374151; line-height: 1.6;">
              ${escapeHtml(comments || 'Sin comentarios adicionales')}
            </div>
            
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f3f4f6; text-align: center; color: #9ca3af; font-size: 12px;">
              <p style="margin: 0;">Este correo fue generado automáticamente desde el formulario de cotización de dronwind.cl</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: 'Correo enviado correctamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Error enviando email:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Error interno del servidor. Intenta más tarde.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
