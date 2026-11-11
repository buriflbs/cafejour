import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "zaxobs18@gmail.com";
const DEFAULT_FROM = process.env.SMTP_FROM || '"Cafe Jour Website" <noreply@globalfs.ch>';
const ENVELOPE_SENDER = process.env.ENVELOPE_SENDER || "noreply@globalfs.ch";

function getTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS || "",
          }
        : undefined,
    });
  }

  // Use local sendmail with authenticated envelope sender for SPF pass
  return nodemailer.createTransport({
    sendmail: true,
    newline: "unix",
    path: process.env.SENDMAIL_PATH || "/usr/sbin/sendmail",
    args: ["-f", ENVELOPE_SENDER],
  });
}

export interface CateringMailPayload {
  name: string;
  email: string;
  phone?: string;
  occasion: string;
  date: string;
  guests: string;
  location: string;
  notes?: string;
}

export interface ContactMailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendCateringInquiryEmail(
  payload: CateringMailPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getTransporter();
    const submissionTime = new Date().toLocaleString("de-CH", {
      timeZone: "Europe/Zurich",
      dateStyle: "full",
      timeStyle: "short",
    });

    const subject = `[Cafe Jour Website] Neue Catering-Anfrage: ${payload.occasion} – ${payload.name}`;

    const textContent = `
[CAFE JOUR ALLSCHWIL - WEBSITE ANFRAGE]
=========================================
Neue Catering-Anfrage über www.cafejour.ch
Eingegangen am: ${submissionTime}

KUNDENDATEN:
- Name: ${payload.name}
- E-Mail: ${payload.email}
- Telefon: ${payload.phone || "Nicht angegeben"}

ANLASS & DETAILS:
- Art des Anlasses: ${payload.occasion}
- Gewünschtes Datum: ${payload.date}
- Anzahl der Gäste: ${payload.guests}
- Veranstaltungsort: ${payload.location}

BESONDERE WÜNSCHE / NACHRICHT:
${payload.notes ? payload.notes : "Keine zusätzliche Nachricht angegeben."}

-----------------------------------------
Herkunft: https://www.cafejour.ch/catering#anfrage
Hinweis: Sie können direkt auf diese E-Mail antworten, um mit dem Kunden Kontakt aufzunehmen.
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#161514;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#EAE5DD;line-height:1.6;">
  <div style="max-width:640px;margin:32px auto;background:#1F1D1B;border:1px solid #36322E;border-radius:12px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.5);">
    
    <!-- Top Origin Notification Banner -->
    <div style="background:linear-gradient(90deg, #8C7350, #C6AD83);padding:10px 24px;color:#111110;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;display:flex;align-items:center;justify-content:space-between;">
      <span>● NEUE WEBSITE-ANFRAGE · WWW.CAFEJOUR.CH</span>
      <span style="font-weight:400;font-size:11px;">CATERING</span>
    </div>

    <!-- Header Section -->
    <div style="padding:32px 32px 24px 32px;background:#191816;border-bottom:1px solid #2D2925;">
      <h1 style="margin:0 0 6px 0;font-size:26px;font-weight:600;letter-spacing:0.02em;color:#F3EEE6;">Cafe Jour</h1>
      <p style="margin:0;font-size:13px;color:#C6AD83;letter-spacing:0.08em;text-transform:uppercase;">Catering Atelier · Spitzwaldstrasse 4, 4123 Allschwil</p>
    </div>

    <!-- Intro Text -->
    <div style="padding:24px 32px 16px 32px;">
      <p style="margin:0 0 16px 0;font-size:15px;color:#D8D2C8;">
        Über das Anfrageformular auf der offiziellen Website <strong>www.cafejour.ch</strong> ist eine neue Catering-Anfrage eingegangen:
      </p>
    </div>

    <!-- Data Table -->
    <div style="padding:0 32px 24px 32px;">
      <table style="width:100%;border-collapse:separate;border-spacing:0;background:#151413;border:1px solid #2E2A27;border-radius:8px;overflow:hidden;">
        <tbody>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;width:38%;border-bottom:1px solid #252220;">Name des Kunden</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#FFFFFF;border-bottom:1px solid #252220;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #252220;">E-Mail-Adresse</td>
            <td style="padding:12px 16px;font-size:14px;color:#FFFFFF;border-bottom:1px solid #252220;">
              <a href="mailto:${escapeHtml(payload.email)}" style="color:#C6AD83;text-decoration:none;">${escapeHtml(payload.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #252220;">Telefon</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;border-bottom:1px solid #252220;">${escapeHtml(payload.phone || "Nicht angegeben")}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #252220;">Art des Anlasses</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#F3EEE6;border-bottom:1px solid #252220;">${escapeHtml(payload.occasion)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #252220;">Gewünschtes Datum</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#FFFFFF;border-bottom:1px solid #252220;">${escapeHtml(payload.date)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #252220;">Anzahl Gäste</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;border-bottom:1px solid #252220;">${escapeHtml(payload.guests)} Personen</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #252220;">Veranstaltungsort</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;border-bottom:1px solid #252220;">${escapeHtml(payload.location)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;">Wünsche / Notizen</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;white-space:pre-wrap;">${escapeHtml(payload.notes || "Keine zusätzlichen Notizen angegeben.")}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Quick Action / Reply Hint -->
    <div style="margin:0 32px 28px 32px;padding:16px;background:#25221F;border-left:3px solid #C6AD83;border-radius:4px;">
      <p style="margin:0;font-size:13px;color:#C6AD83;font-weight:500;">
        💡 <strong>Tipp:</strong> Sie können direkt in Ihrem E-Mail-Programm auf <em>«Antworten»</em> klicken, um direkt an <strong>${escapeHtml(payload.name)}</strong> (&lt;${escapeHtml(payload.email)}&gt;) zu schreiben.
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;background:#151413;border-top:1px solid #282421;font-size:11px;color:#7A746C;text-align:center;">
      <p style="margin:0 0 4px 0;">Eingegangen am: ${submissionTime}</p>
      <p style="margin:0;">Diese E-Mail wurde automatisch über das Webformular auf <a href="https://www.cafejour.ch" style="color:#C6AD83;text-decoration:none;">www.cafejour.ch</a> versendet.</p>
    </div>

  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: DEFAULT_FROM,
      to: RECIPIENT_EMAIL,
      replyTo: `${payload.name} <${payload.email}>`,
      subject,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("[Mailer] Failed to send catering inquiry email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown mailer error",
    };
  }
}

export async function sendContactInquiryEmail(
  payload: ContactMailPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getTransporter();
    const submissionTime = new Date().toLocaleString("de-CH", {
      timeZone: "Europe/Zurich",
      dateStyle: "full",
      timeStyle: "short",
    });

    const subject = `[Cafe Jour Website] Neue Kontaktanfrage: ${payload.subject || "Allgemein"} – ${payload.name}`;

    const textContent = `
[CAFE JOUR ALLSCHWIL - WEBSITE KONTAKT]
=========================================
Neue Kontaktanfrage über www.cafejour.ch
Eingegangen am: ${submissionTime}

ABSENDER:
- Name: ${payload.name}
- E-Mail: ${payload.email}
- Betreff: ${payload.subject || "Kein Betreff angegeben"}

NACHRICHT:
${payload.message}

-----------------------------------------
Herkunft: https://www.cafejour.ch/kontakt
Hinweis: Sie können direkt auf diese E-Mail antworten, um dem Absender zu antworten.
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#161514;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#EAE5DD;line-height:1.6;">
  <div style="max-width:640px;margin:32px auto;background:#1F1D1B;border:1px solid #36322E;border-radius:12px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.5);">
    
    <!-- Top Origin Notification Banner -->
    <div style="background:linear-gradient(90deg, #8C7350, #C6AD83);padding:10px 24px;color:#111110;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;display:flex;align-items:center;justify-content:space-between;">
      <span>● NEUE WEBSITE-ANFRAGE · WWW.CAFEJOUR.CH</span>
      <span style="font-weight:400;font-size:11px;">KONTAKT</span>
    </div>

    <!-- Header Section -->
    <div style="padding:32px 32px 24px 32px;background:#191816;border-bottom:1px solid #2D2925;">
      <h1 style="margin:0 0 6px 0;font-size:26px;font-weight:600;letter-spacing:0.02em;color:#F3EEE6;">Cafe Jour</h1>
      <p style="margin:0;font-size:13px;color:#C6AD83;letter-spacing:0.08em;text-transform:uppercase;">Kontakt · Spitzwaldstrasse 4, 4123 Allschwil</p>
    </div>

    <!-- Intro Text -->
    <div style="padding:24px 32px 16px 32px;">
      <p style="margin:0 0 16px 0;font-size:15px;color:#D8D2C8;">
        Über das Kontaktformular auf der Website <strong>www.cafejour.ch</strong> wurde eine neue Nachricht eingereicht:
      </p>
    </div>

    <!-- Data Table -->
    <div style="padding:0 32px 24px 32px;">
      <table style="width:100%;border-collapse:separate;border-spacing:0;background:#151413;border:1px solid #2E2A27;border-radius:8px;overflow:hidden;">
        <tbody>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;width:38%;border-bottom:1px solid #252220;">Absender</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#FFFFFF;border-bottom:1px solid #252220;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #252220;">E-Mail-Adresse</td>
            <td style="padding:12px 16px;font-size:14px;color:#FFFFFF;border-bottom:1px solid #252220;">
              <a href="mailto:${escapeHtml(payload.email)}" style="color:#C6AD83;text-decoration:none;">${escapeHtml(payload.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #252220;">Betreff</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;border-bottom:1px solid #252220;">${escapeHtml(payload.subject || "Allgemeine Anfrage")}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;">Nachricht</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;white-space:pre-wrap;">${escapeHtml(payload.message)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Quick Action / Reply Hint -->
    <div style="margin:0 32px 28px 32px;padding:16px;background:#25221F;border-left:3px solid #C6AD83;border-radius:4px;">
      <p style="margin:0;font-size:13px;color:#C6AD83;font-weight:500;">
        💡 <strong>Tipp:</strong> Sie können direkt auf <em>«Antworten»</em> klicken, um direkt an <strong>${escapeHtml(payload.name)}</strong> (&lt;${escapeHtml(payload.email)}&gt;) zu antworten.
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;background:#151413;border-top:1px solid #282421;font-size:11px;color:#7A746C;text-align:center;">
      <p style="margin:0 0 4px 0;">Eingegangen am: ${submissionTime}</p>
      <p style="margin:0;">Diese E-Mail wurde automatisch über das Kontaktformular auf <a href="https://www.cafejour.ch" style="color:#C6AD83;text-decoration:none;">www.cafejour.ch</a> versendet.</p>
    </div>

  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: DEFAULT_FROM,
      to: RECIPIENT_EMAIL,
      replyTo: `${payload.name} <${payload.email}>`,
      subject,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("[Mailer] Failed to send contact message email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown mailer error",
    };
  }
}
