import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "zaxobs18@gmail.com";
const DEFAULT_FROM = process.env.SMTP_FROM || '"Cafe Jour" <kontakt@cafejour.ch>';
const ENVELOPE_SENDER = process.env.ENVELOPE_SENDER || "kontakt@cafejour.ch";

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
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

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

function generateDossierId(prefix: string): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CJ-${prefix}-${rand}`;
}

/* ==============================================================================
 * 1. BENACHRICHTIGUNG AN BETREIBER (zaxobs18@gmail.com)
 * ============================================================================== */

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
<body style="margin:0;padding:0;background-color:#111110;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#EAE5DD;line-height:1.6;">
  <div style="max-width:640px;margin:32px auto;background:#1A1917;border:1px solid #332F2B;border-radius:12px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,0.6);">
    
    <div style="background:linear-gradient(90deg, #8C7350, #C6AD83);padding:11px 24px;color:#111110;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
      ● NEUE WEBSITE-ANFRAGE · WWW.CAFEJOUR.CH · CATERING
    </div>

    <div style="padding:32px 32px 24px 32px;background:#141312;border-bottom:1px solid #2B2724;">
      <h1 style="margin:0 0 6px 0;font-size:26px;font-weight:600;letter-spacing:0.02em;color:#F3EEE6;">Cafe Jour</h1>
      <p style="margin:0;font-size:13px;color:#C6AD83;letter-spacing:0.08em;text-transform:uppercase;">Catering Atelier · Spitzwaldstrasse 4, 4123 Allschwil</p>
    </div>

    <div style="padding:24px 32px 16px 32px;">
      <p style="margin:0 0 16px 0;font-size:15px;color:#D8D2C8;">
        Über das Catering-Formular auf der Website <strong>www.cafejour.ch</strong> ist eine neue Anfrage eingegangen:
      </p>
    </div>

    <div style="padding:0 32px 24px 32px;">
      <table style="width:100%;border-collapse:separate;border-spacing:0;background:#121110;border:1px solid #282420;border-radius:8px;overflow:hidden;">
        <tbody>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;width:38%;border-bottom:1px solid #221F1C;">Name des Kunden</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#FFFFFF;border-bottom:1px solid #221F1C;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #221F1C;">E-Mail-Adresse</td>
            <td style="padding:12px 16px;font-size:14px;color:#FFFFFF;border-bottom:1px solid #221F1C;">
              <a href="mailto:${escapeHtml(payload.email)}" style="color:#C6AD83;text-decoration:none;">${escapeHtml(payload.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #221F1C;">Telefon</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;border-bottom:1px solid #221F1C;">${escapeHtml(payload.phone || "Nicht angegeben")}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #221F1C;">Art des Anlasses</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#F3EEE6;border-bottom:1px solid #221F1C;">${escapeHtml(payload.occasion)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #221F1C;">Gewünschtes Datum</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#FFFFFF;border-bottom:1px solid #221F1C;">${escapeHtml(payload.date)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #221F1C;">Anzahl Gäste</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;border-bottom:1px solid #221F1C;">${escapeHtml(payload.guests)} Personen</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #221F1C;">Veranstaltungsort</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;border-bottom:1px solid #221F1C;">${escapeHtml(payload.location)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;">Wünsche / Notizen</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;white-space:pre-wrap;">${escapeHtml(payload.notes || "Keine zusätzlichen Notizen angegeben.")}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="margin:0 32px 28px 32px;padding:16px;background:#23201D;border-left:3px solid #C6AD83;border-radius:4px;">
      <p style="margin:0;font-size:13px;color:#C6AD83;font-weight:500;">
        💡 <strong>Tipp:</strong> Sie können direkt in Ihrem E-Mail-Programm auf <em>«Antworten»</em> klicken, um direkt an <strong>${escapeHtml(payload.name)}</strong> (&lt;${escapeHtml(payload.email)}&gt;) zu schreiben.
      </p>
    </div>

    <div style="padding:20px 32px;background:#121110;border-top:1px solid #26231F;font-size:11px;color:#7A746C;text-align:center;">
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
    console.error("[Mailer] Failed to send catering inquiry email to admin:", error);
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
<body style="margin:0;padding:0;background-color:#111110;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#EAE5DD;line-height:1.6;">
  <div style="max-width:640px;margin:32px auto;background:#1A1917;border:1px solid #332F2B;border-radius:12px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,0.6);">
    
    <div style="background:linear-gradient(90deg, #8C7350, #C6AD83);padding:11px 24px;color:#111110;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
      ● NEUE WEBSITE-ANFRAGE · WWW.CAFEJOUR.CH · KONTAKT
    </div>

    <div style="padding:32px 32px 24px 32px;background:#141312;border-bottom:1px solid #2B2724;">
      <h1 style="margin:0 0 6px 0;font-size:26px;font-weight:600;letter-spacing:0.02em;color:#F3EEE6;">Cafe Jour</h1>
      <p style="margin:0;font-size:13px;color:#C6AD83;letter-spacing:0.08em;text-transform:uppercase;">Kontakt · Spitzwaldstrasse 4, 4123 Allschwil</p>
    </div>

    <div style="padding:24px 32px 16px 32px;">
      <p style="margin:0 0 16px 0;font-size:15px;color:#D8D2C8;">
        Über das Kontaktformular auf der Website <strong>www.cafejour.ch</strong> wurde eine neue Nachricht eingereicht:
      </p>
    </div>

    <div style="padding:0 32px 24px 32px;">
      <table style="width:100%;border-collapse:separate;border-spacing:0;background:#121110;border:1px solid #282420;border-radius:8px;overflow:hidden;">
        <tbody>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;width:38%;border-bottom:1px solid #221F1C;">Absender</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#FFFFFF;border-bottom:1px solid #221F1C;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #221F1C;">E-Mail-Adresse</td>
            <td style="padding:12px 16px;font-size:14px;color:#FFFFFF;border-bottom:1px solid #221F1C;">
              <a href="mailto:${escapeHtml(payload.email)}" style="color:#C6AD83;text-decoration:none;">${escapeHtml(payload.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #221F1C;">Betreff</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;border-bottom:1px solid #221F1C;">${escapeHtml(payload.subject || "Allgemeine Anfrage")}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#C6AD83;text-transform:uppercase;letter-spacing:0.06em;">Nachricht</td>
            <td style="padding:12px 16px;font-size:14px;color:#EAE5DD;white-space:pre-wrap;">${escapeHtml(payload.message)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="margin:0 32px 28px 32px;padding:16px;background:#23201D;border-left:3px solid #C6AD83;border-radius:4px;">
      <p style="margin:0;font-size:13px;color:#C6AD83;font-weight:500;">
        💡 <strong>Tipp:</strong> Sie können direkt auf <em>«Antworten»</em> klicken, um direkt an <strong>${escapeHtml(payload.name)}</strong> (&lt;${escapeHtml(payload.email)}&gt;) zu antworten.
      </p>
    </div>

    <div style="padding:20px 32px;background:#121110;border-top:1px solid #26231F;font-size:11px;color:#7A746C;text-align:center;">
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
    console.error("[Mailer] Failed to send contact message email to admin:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown mailer error",
    };
  }
}

/* ==============================================================================
 * 2. ULTRA-LUXUS EINGANGSBESTÄTIGUNG AN DEN KUNDEN (Customer Atelier Receipt)
 * ============================================================================== */

export async function sendCateringConfirmationToCustomer(
  payload: CateringMailPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getTransporter();
    const dossierNumber = generateDossierId("CAT");

    const subject = `Ihre Catering-Anfrage bei Cafe Jour Allschwil [${dossierNumber}]`;

    const textContent = `
CAFE JOUR ALLSCHWIL · CATERING ATELIER
============================================================
EINGANGSBESTÄTIGUNG & ANFRAGE-DOSSIER
Dossier-Referenz: ${dossierNumber}

Sehr geehrte(r) ${payload.name},

wir danken Ihnen herzlich für Ihre geschätzte Catering-Anfrage bei Cafe Jour in Allschwil.

Wir haben die Eckdaten für Ihren geplanten Anlass erfolgreich in unserem System erfasst. Es ist unser Anspruch, kulinarische Raffinesse, erstklassigen Service und eine warme Schweizer Gastfreundschaft zu einem unvergesslichen Erlebnis zu verbinden.

IHRE ANFRAGEDATEN IM ÜBERBLICK:
------------------------------------------------------------
• Art des Anlasses:  ${payload.occasion}
• Wunschtermin:      ${payload.date}
• Gästeanzahl:       ${payload.guests} Personen
• Veranstaltungsort: ${payload.location}
${payload.notes ? `• Ihre Wünsche/Notizen: ${payload.notes}\n` : ""}

WIE ES NUN WEITERGEHT (UNSER 3-SCHRITTE-PROZESS):
------------------------------------------------------------
01. PRÜFUNG & VERFÜGBARKEIT
Unser Küchenchef und Sommelier prüfen das gewünschte Datum, die logistischen Rahmenbedingungen sowie die saisonalen Spezialitäten.

02. PERSÖNLICHE ABSTIMMUNG
Sollten Detailfragen offen sein oder Sie spezielle Vorlieben (Apéro riche, Flying Buffet, Barista-Kaffeebar) wünschen, nehmen wir diskret und zeitnah Kontakt mit Ihnen auf.

03. MASSGESCHNEIDERTE OFFERTE
Sie erhalten eine transparente, individuell auf Ihren Anlass zugeschnittene Offerte mit erlesenen Vorschlägen.

DIREKTER KONTAKT:
Haben Sie kurzfristige Anpassungen oder zusätzliche Wünsche? Sie können direkt auf diese E-Mail antworten – Ihre Nachricht erreicht unmittelbar unseren Gastgeberservice.

Mit vorzüglichen Grüssen aus Allschwil,
Ihr Gastgeber-Team vom Cafe Jour

Cafe Jour · Spitzwaldstrasse 4 · 4123 Allschwil · Schweiz
Web: https://www.cafejour.ch · E-Mail: kontakt@cafejour.ch
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#0D0C0B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#E8E2D8;line-height:1.6;-webkit-font-smoothing:antialiased;">
  
  <!-- Outer Wrapper Table -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0D0C0B;padding:36px 12px;">
    <tr>
      <td align="center">
        
        <!-- Main Container Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:620px;background-color:#161513;border:1px solid #2E2924;border-radius:14px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.7);">
          
          <!-- Top Royal Gold Ornament Accent -->
          <tr>
            <td style="background:linear-gradient(90deg, #7A5F39 0%, #C6AD83 50%, #7A5F39 100%);height:4px;line-height:4px;font-size:1px;">&nbsp;</td>
          </tr>

          <!-- Subtle Atelier Sub-Header Badge -->
          <tr>
            <td style="padding:16px 36px;background-color:#131210;border-bottom:1px solid #23201C;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C6AD83;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
                    ✦ CATERING &amp; EVENT ATELIER · ALLSCHWIL
                  </td>
                  <td align="right" style="font-size:10px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;color:#8E867C;letter-spacing:0.1em;">
                    REF: ${escapeHtml(dossierNumber)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Brand Hero Header -->
          <tr>
            <td align="center" style="padding:40px 36px 30px 36px;background:radial-gradient(circle at 50% 30%, #201D1A 0%, #161513 100%);border-bottom:1px solid #26221D;">
              <div style="font-family:'Didot','Bodoni MT','Cinzel',Georgia,serif;font-size:34px;font-weight:400;letter-spacing:0.04em;color:#F6F1EA;margin-bottom:8px;">
                Cafe Jour
              </div>
              <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C6AD83;font-weight:500;margin-bottom:18px;">
                Gastronomie · Bar · Catering
              </div>
              <div style="display:inline-block;padding:6px 16px;background:#201D1A;border:1px solid #3A342C;border-radius:20px;font-size:11px;color:#DFCBAB;letter-spacing:0.08em;text-transform:uppercase;">
                Eingangsbestätigung &amp; Dossier
              </div>
            </td>
          </tr>

          <!-- Salutation & Introduction -->
          <tr>
            <td style="padding:36px 36px 20px 36px;">
              <p style="margin:0 0 16px 0;font-size:17px;font-weight:500;color:#FFFFFF;letter-spacing:0.01em;">
                Sehr geehrte(r) ${escapeHtml(payload.name)},
              </p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#D8D0C5;line-height:1.75;">
                wir danken Ihnen herzlich für Ihre geschätzte Anfrage über unser Online-Atelier. Ein gelungener Anlass lebt von Atmosphäre, erlesenen Köstlichkeiten und fehlerfreier Begleitung – und genau diesen Anspruch pflegen wir bei <strong>Cafe Jour</strong>.
              </p>
              <p style="margin:0;font-size:14px;color:#D8D0C5;line-height:1.75;">
                Ihre gewünschten Eckdaten wurden erfasst und unserem Küchen- und Catering-Team zur detaillierten Vorbereitung übergeben:
              </p>
            </td>
          </tr>

          <!-- Dossier Summary Table (Luxury Editorial Frame) -->
          <tr>
            <td style="padding:10px 36px 28px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#11100F;border:1px solid #302B25;border-radius:10px;overflow:hidden;">
                
                <!-- Table Header Ribbon -->
                <tr>
                  <td colspan="2" style="padding:12px 20px;background-color:#1C1916;border-bottom:1px solid #2C2721;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="left" style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C6AD83;">
                          Ihr Anlass im Detail
                        </td>
                        <td align="right" style="font-size:11px;color:#857E74;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
                          Status: In Prüfung
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Rows -->
                <tr>
                  <td width="38%" style="padding:13px 20px;font-size:12px;font-weight:600;color:#A99B89;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #201D1A;">Art des Anlasses</td>
                  <td style="padding:13px 20px;font-size:14px;font-weight:600;color:#FFFFFF;border-bottom:1px solid #201D1A;">${escapeHtml(payload.occasion)}</td>
                </tr>
                <tr>
                  <td style="padding:13px 20px;font-size:12px;font-weight:600;color:#A99B89;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #201D1A;">Wunschtermin</td>
                  <td style="padding:13px 20px;font-size:14px;font-weight:600;color:#C6AD83;border-bottom:1px solid #201D1A;">${escapeHtml(payload.date)}</td>
                </tr>
                <tr>
                  <td style="padding:13px 20px;font-size:12px;font-weight:600;color:#A99B89;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #201D1A;">Gästeanzahl</td>
                  <td style="padding:13px 20px;font-size:14px;color:#F3EEE6;border-bottom:1px solid #201D1A;">ca. <strong>${escapeHtml(payload.guests)}</strong> Personen</td>
                </tr>
                <tr>
                  <td style="padding:13px 20px;font-size:12px;font-weight:600;color:#A99B89;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #201D1A;">Veranstaltungsort</td>
                  <td style="padding:13px 20px;font-size:14px;color:#F3EEE6;border-bottom:1px solid #201D1A;">${escapeHtml(payload.location)}</td>
                </tr>
                ${
                  payload.notes
                    ? `<tr>
                        <td style="padding:13px 20px;font-size:12px;font-weight:600;color:#A99B89;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Wünsche &amp; Notizen</td>
                        <td style="padding:13px 20px;font-size:13px;color:#D8D0C5;white-space:pre-wrap;line-height:1.6;">${escapeHtml(payload.notes)}</td>
                      </tr>`
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- 3-Schritte Ablauf (Editorial Workflow) -->
          <tr>
            <td style="padding:0 36px 30px 36px;">
              <div style="background-color:#121110;border:1px solid #26221D;border-radius:10px;padding:24px 22px;">
                <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#C6AD83;margin-bottom:18px;">
                  Wie es weitergeht · Unser Prozess
                </div>

                <!-- Step 1 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:14px;">
                  <tr>
                    <td width="32" valign="top">
                      <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;background:#24201C;border:1px solid #453E34;border-radius:50%;color:#C6AD83;font-size:10px;font-weight:700;">1</span>
                    </td>
                    <td valign="top" style="padding-left:8px;">
                      <div style="font-size:13px;font-weight:600;color:#F3EEE6;margin-bottom:2px;">Prüfung &amp; Terminreservation</div>
                      <div style="font-size:12px;color:#9E968B;line-height:1.5;">Wir prüfen das gewünschte Datum sowie die logistischen Voraussetzungen für Ihren Anlass.</div>
                    </td>
                  </tr>
                </table>

                <!-- Step 2 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:14px;">
                  <tr>
                    <td width="32" valign="top">
                      <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;background:#24201C;border:1px solid #453E34;border-radius:50%;color:#C6AD83;font-size:10px;font-weight:700;">2</span>
                    </td>
                    <td valign="top" style="padding-left:8px;">
                      <div style="font-size:13px;font-weight:600;color:#F3EEE6;margin-bottom:2px;">Kulinarische Feinabstimmung</div>
                      <div style="font-size:12px;color:#9E968B;line-height:1.5;">Ob feines Apéro riche, Flying Fingerfood oder Barista-Kaffeebar: Wir klären spezifische Wünsche gern persönlich.</div>
                    </td>
                  </tr>
                </table>

                <!-- Step 3 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="32" valign="top">
                      <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;background:#24201C;border:1px solid #453E34;border-radius:50%;color:#C6AD83;font-size:10px;font-weight:700;">3</span>
                    </td>
                    <td valign="top" style="padding-left:8px;">
                      <div style="font-size:13px;font-weight:600;color:#F3EEE6;margin-bottom:2px;">Individuelle Offerte</div>
                      <div style="font-size:12px;color:#9E968B;line-height:1.5;">Sie erhalten ein massgeschneidertes, transparent kalkuliertes Angebot für ein erstklassiges kulinarisches Erlebnis.</div>
                    </td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>

          <!-- Direct Concierge / Reply Note -->
          <tr>
            <td style="padding:0 36px 32px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg, #1C1916 0%, #24201A 100%);border-left:3px solid #C6AD83;border-radius:4px;padding:16px 20px;">
                <tr>
                  <td>
                    <div style="font-size:13px;color:#DFCBAB;font-weight:600;margin-bottom:4px;">
                      Haben Sie kurzfristige Anpassungen oder Fragen?
                    </div>
                    <div style="font-size:12px;color:#B3ABA0;line-height:1.6;">
                      Sie können jederzeit direkt auf diese E-Mail antworten. Unser Gastgeberservice in Allschwil steht Ihnen diskret und persönlich zur Seite.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-Off -->
          <tr>
            <td style="padding:0 36px 36px 36px;">
              <p style="margin:0 0 6px 0;font-size:14px;color:#A99F94;">
                Mit vorzüglichen Grüssen aus Allschwil,
              </p>
              <p style="margin:0;font-size:15px;font-weight:600;color:#FFFFFF;letter-spacing:0.02em;">
                Ihr Gastgeber-Team vom Cafe Jour
              </p>
            </td>
          </tr>

          <!-- Luxury Footer -->
          <tr>
            <td style="padding:28px 36px;background-color:#100F0E;border-top:1px solid #24201B;text-align:center;">
              <div style="font-family:'Didot','Bodoni MT',Georgia,serif;font-size:18px;color:#F3EEE6;margin-bottom:6px;letter-spacing:0.04em;">
                Cafe Jour
              </div>
              <div style="font-size:11px;color:#857D73;margin-bottom:12px;letter-spacing:0.06em;">
                Spitzwaldstrasse 4 · 4123 Allschwil · Schweiz
              </div>
              <div style="font-size:11px;color:#C6AD83;">
                <a href="https://www.cafejour.ch" style="color:#C6AD83;text-decoration:none;margin:0 8px;">www.cafejour.ch</a>
                <span style="color:#4A443C;">·</span>
                <a href="mailto:kontakt@cafejour.ch" style="color:#C6AD83;text-decoration:none;margin:0 8px;">kontakt@cafejour.ch</a>
              </div>
            </td>
          </tr>

        </table>
        
      </td>
    </tr>
  </table>

</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: DEFAULT_FROM,
      to: payload.email,
      replyTo: "kontakt@cafejour.ch",
      subject,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("[Mailer] Failed to send luxury catering confirmation to customer:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown mailer error",
    };
  }
}

export async function sendContactConfirmationToCustomer(
  payload: ContactMailPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getTransporter();
    const referenceNumber = generateDossierId("MSG");

    const subject = `Ihre Nachricht an Cafe Jour Allschwil [${referenceNumber}]`;

    const textContent = `
CAFE JOUR ALLSCHWIL
============================================================
EINGANGSBESTÄTIGUNG
Referenz-Nr.: ${referenceNumber}

Sehr geehrte(r) ${payload.name},

wir danken Ihnen herzlich für Ihre Kontaktaufnahme über www.cafejour.ch.

Wir haben Ihre Nachricht erhalten und werden Ihr Anliegen sorgfältig und baldmöglichst bearbeiten.

IHRE NACHRICHT IM ÜBERBLICK:
------------------------------------------------------------
${payload.subject ? `Betreff: ${payload.subject}\n` : ""}
${payload.message}

DIREKTER KONTAKT:
Sie können jederzeit auf diese E-Mail antworten, um ergänzende Informationen an unser Team zu übermitteln.

Mit herzlichen Grüssen aus Allschwil,
Ihr Cafe Jour Team

Cafe Jour · Spitzwaldstrasse 4 · 4123 Allschwil · Schweiz
Web: https://www.cafejour.ch · E-Mail: kontakt@cafejour.ch
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#0D0C0B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#E8E2D8;line-height:1.6;-webkit-font-smoothing:antialiased;">
  
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0D0C0B;padding:36px 12px;">
    <tr>
      <td align="center">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:620px;background-color:#161513;border:1px solid #2E2924;border-radius:14px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.7);">
          
          <!-- Top Royal Gold Ornament Accent -->
          <tr>
            <td style="background:linear-gradient(90deg, #7A5F39 0%, #C6AD83 50%, #7A5F39 100%);height:4px;line-height:4px;font-size:1px;">&nbsp;</td>
          </tr>

          <!-- Subtle Atelier Sub-Header Badge -->
          <tr>
            <td style="padding:16px 36px;background-color:#131210;border-bottom:1px solid #23201C;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C6AD83;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
                    ✦ GÄSTESERVICE · ALLSCHWIL
                  </td>
                  <td align="right" style="font-size:10px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;color:#8E867C;letter-spacing:0.1em;">
                    REF: ${escapeHtml(referenceNumber)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Brand Hero Header -->
          <tr>
            <td align="center" style="padding:40px 36px 30px 36px;background:radial-gradient(circle at 50% 30%, #201D1A 0%, #161513 100%);border-bottom:1px solid #26221D;">
              <div style="font-family:'Didot','Bodoni MT','Cinzel',Georgia,serif;font-size:34px;font-weight:400;letter-spacing:0.04em;color:#F6F1EA;margin-bottom:8px;">
                Cafe Jour
              </div>
              <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C6AD83;font-weight:500;margin-bottom:18px;">
                Café · Bar · Catering
              </div>
              <div style="display:inline-block;padding:6px 16px;background:#201D1A;border:1px solid #3A342C;border-radius:20px;font-size:11px;color:#DFCBAB;letter-spacing:0.08em;text-transform:uppercase;">
                Eingangsbestätigung
              </div>
            </td>
          </tr>

          <!-- Salutation & Introduction -->
          <tr>
            <td style="padding:36px 36px 20px 36px;">
              <p style="margin:0 0 16px 0;font-size:17px;font-weight:500;color:#FFFFFF;letter-spacing:0.01em;">
                Sehr geehrte(r) ${escapeHtml(payload.name)},
              </p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#D8D0C5;line-height:1.75;">
                vielen Dank für Ihre Kontaktaufnahme mit Cafe Jour in Allschwil. Wir haben Ihre Nachricht erhalten und freuen uns über Ihr Interesse an unserem Haus.
              </p>
              <p style="margin:0;font-size:14px;color:#D8D0C5;line-height:1.75;">
                Unser Team prüft Ihre Anfrage sorgfältig und wird sich baldmöglichst persönlich bei Ihnen melden.
              </p>
            </td>
          </tr>

          <!-- Message Card -->
          <tr>
            <td style="padding:10px 36px 28px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#11100F;border:1px solid #302B25;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:12px 20px;background-color:#1C1916;border-bottom:1px solid #2C2721;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C6AD83;">
                    Ihre eingereichte Nachricht
                  </td>
                </tr>
                ${
                  payload.subject
                    ? `<tr>
                        <td style="padding:12px 20px 4px 20px;font-size:12px;font-weight:600;color:#A99B89;text-transform:uppercase;letter-spacing:0.08em;">
                          Betreff: <span style="color:#FFFFFF;text-transform:none;font-weight:500;">${escapeHtml(payload.subject)}</span>
                        </td>
                      </tr>`
                    : ""
                }
                <tr>
                  <td style="padding:12px 20px 16px 20px;font-size:14px;color:#E8E2D8;white-space:pre-wrap;line-height:1.65;">
                    ${escapeHtml(payload.message)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Direct Reply Note -->
          <tr>
            <td style="padding:0 36px 32px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg, #1C1916 0%, #24201A 100%);border-left:3px solid #C6AD83;border-radius:4px;padding:16px 20px;">
                <tr>
                  <td>
                    <div style="font-size:13px;color:#DFCBAB;font-weight:600;margin-bottom:4px;">
                      Möchten Sie etwas ergänzen?
                    </div>
                    <div style="font-size:12px;color:#B3ABA0;line-height:1.6;">
                      Sie können direkt auf diese Bestätigungs-E-Mail antworten, um uns weitere Details mitzuteilen.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-Off -->
          <tr>
            <td style="padding:0 36px 36px 36px;">
              <p style="margin:0 0 6px 0;font-size:14px;color:#A99F94;">
                Mit freundlichen Grüssen aus Allschwil,
              </p>
              <p style="margin:0;font-size:15px;font-weight:600;color:#FFFFFF;letter-spacing:0.02em;">
                Ihr Team vom Cafe Jour
              </p>
            </td>
          </tr>

          <!-- Luxury Footer -->
          <tr>
            <td style="padding:28px 36px;background-color:#100F0E;border-top:1px solid #24201B;text-align:center;">
              <div style="font-family:'Didot','Bodoni MT',Georgia,serif;font-size:18px;color:#F3EEE6;margin-bottom:6px;letter-spacing:0.04em;">
                Cafe Jour
              </div>
              <div style="font-size:11px;color:#857D73;margin-bottom:12px;letter-spacing:0.06em;">
                Spitzwaldstrasse 4 · 4123 Allschwil · Schweiz
              </div>
              <div style="font-size:11px;color:#C6AD83;">
                <a href="https://www.cafejour.ch" style="color:#C6AD83;text-decoration:none;margin:0 8px;">www.cafejour.ch</a>
                <span style="color:#4A443C;">·</span>
                <a href="mailto:kontakt@cafejour.ch" style="color:#C6AD83;text-decoration:none;margin:0 8px;">kontakt@cafejour.ch</a>
              </div>
            </td>
          </tr>

        </table>
        
      </td>
    </tr>
  </table>

</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: DEFAULT_FROM,
      to: payload.email,
      replyTo: "kontakt@cafejour.ch",
      subject,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("[Mailer] Failed to send contact confirmation to customer:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown mailer error",
    };
  }
}
