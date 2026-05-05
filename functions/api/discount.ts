export async function onRequestPost({ request, env }: any) {
  const formData = await request.formData();
  const name = formData.get('name')?.toString() ?? '';
  const phone = formData.get('phone')?.toString() ?? '';

  const fecha = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const origen = name ? 'Popup' : 'Hero';

  const emailText = [
    "━━━━━━━━━━━━━━━━━━━━━━━━",
    "🎉 NUEVO LEAD — DESCUENTO 20% OFF",
    "   Irene's Cleaning — mrsirenescleaning.com",
    "━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    ...(name ? [`👤 Nombre    ${name}`] : []),
    `📞 Teléfono  ${phone}`,
    `📌 Origen    ${origen}`,
    "",
    `📅 ${fecha}`,
    "━━━━━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");

  const telegramText = [
    "🎉 *Nuevo lead — 20% OFF*",
    "🌐 _mrsirenescleaning.com_",
    "",
    ...(name ? [`👤 *Nombre:* ${name}`] : []),
    `📞 *Teléfono:* ${phone}`,
    `📌 *Origen:* ${origen}`,
    "",
    `📅 _${fecha}_`,
  ].join("\n");

  try {
    await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL,
          to: env.RESEND_TO_EMAIL,
          subject: `🎉 Nuevo lead 20% OFF${name ? ` — ${name}` : ''} — Irene's Cleaning`,
          text: emailText,
        }),
      }),
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
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
}
