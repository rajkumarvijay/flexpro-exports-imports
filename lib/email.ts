import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export async function sendAdminRFQAlert(rfq: {
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  productRequired: string;
  quantity: string;
  whatsapp?: string | null;
  message?: string | null;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    // SMTP not configured — skip silently (don't crash the RFQ submission)
    console.log("[email] SMTP not configured, skipping admin alert");
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@flexproexports.com";

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a1628;color:#e2e8f0;padding:32px;border-radius:12px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
        <div style="width:40px;height:40px;background:linear-gradient(135deg,#e6b800,#c9a100);border-radius:10px;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:18px;">📋</span>
        </div>
        <div>
          <h2 style="margin:0;color:#e6b800;font-size:18px;">New RFQ Received</h2>
          <p style="margin:0;font-size:12px;color:#64748b;">FlexPro Exports Admin Alert</p>
        </div>
      </div>

      <table style="width:100%;border-collapse:collapse;">
        ${[
          ["Customer", rfq.fullName],
          ["Company", rfq.companyName],
          ["Country", rfq.country],
          ["Email", rfq.email],
          ["WhatsApp", rfq.whatsapp ?? "—"],
          ["Product Required", rfq.productRequired],
          ["Quantity", rfq.quantity],
          ["Message", rfq.message ?? "—"],
        ]
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 0;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:140px;">${label}</td>
            <td style="padding:8px 0;color:#e2e8f0;font-size:14px;">${value}</td>
          </tr>`
          )
          .join("")}
      </table>

      <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
        <a href="${process.env.NEXTAUTH_URL ?? "https://flexpro-nextjs.vercel.app"}/admin/rfqs"
           style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#e6b800,#c9a100);color:#0a1628;font-weight:700;font-size:14px;border-radius:8px;text-decoration:none;">
          View in Admin Panel →
        </a>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"FlexPro Alerts" <${user}>`,
    to: adminEmail,
    subject: `New RFQ: ${rfq.productRequired} — ${rfq.fullName} (${rfq.companyName})`,
    html,
  });
}
