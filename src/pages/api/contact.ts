export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name')?.toString() ?? '';
  const phone = formData.get('phone')?.toString() ?? '';
  const postalCode = formData.get('postal_code')?.toString() ?? '';
  const service = formData.get('service')?.toString() ?? '';
  const description = formData.get('description')?.toString() ?? '';

  const resendKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM_EMAIL;
  const to = import.meta.env.RESEND_TO_EMAIL;
  const tgToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = import.meta.env.TELEGRAM_CHAT_ID;

  const fecha = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const emailText = [
    "━━━━━━━━━━━━━━━━━━━━━━━━",
    "🧹 NUEVA SOLICITUD DE SERVICIO",
    "   Irene's Cleaning — mrsirenescleaning.com",
    "━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    `👤 Nombre        ${name}`,
    `📞 Teléfono      ${phone}`,
    `📍 Código postal ${postalCode}`,
    `🏠 Servicio      ${service}`,
    "",
    "💬 Mensaje:",
    `   ${description}`,
    "",
    `📅 ${fecha}`,
    "━━━━━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");

  const telegramText = [
    "🧹 *Nueva solicitud de servicio*",
    "🌐 _mrsirenescleaning.com_",
    "",
    `👤 *Nombre:* ${name}`,
    `📞 *Teléfono:* ${phone}`,
    `📍 *Código postal:* ${postalCode}`,
    `🏠 *Servicio:* ${service}`,
    `💬 *Mensaje:* ${description}`,
    "",
    `📅 _${fecha}_`,
  ].join("\n");

  try {
    await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject: `🧹 Nueva solicitud de ${name} — Irene's Cleaning`,
          text: emailText,
        }),
      }),
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: telegramText,
          parse_mode: "Markdown",
        }),
      }),
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
