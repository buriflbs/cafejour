"use server";

import {
  sendCateringInquiryEmail,
  sendCateringConfirmationToCustomer,
  sendContactInquiryEmail,
  sendContactConfirmationToCustomer,
} from "@/lib/mailer";

export interface CateringFormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: {
    name?: string;
    occasion?: string;
    guests?: string;
    date?: string;
    phone?: string;
    notes?: string;
  };
}

export interface ContactFormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: {
    subject?: string;
  };
}

export async function submitCateringInquiry(
  _prevState: CateringFormState | null,
  formData: FormData
): Promise<CateringFormState> {
  // Honeypot check (field named "website_check" hidden from humans)
  const honeypot = formData.get("website_check")?.toString().trim();
  if (honeypot && honeypot.length > 0) {
    // Silently succeed for bots
    return {
      success: true,
      message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen.",
    };
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const occasion = formData.get("occasion")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString().trim() ?? "";
  const guests = formData.get("guests")?.toString().trim() ?? "";
  const location = formData.get("location")?.toString().trim() ?? "";
  const notes = formData.get("message")?.toString().trim() ?? "";

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Bitte geben Sie Ihren Vor- und Nachnamen ein.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (!occasion) {
    errors.occasion = "Bitte wählen Sie die Art des Anlasses aus.";
  }

  if (!date) {
    errors.date = "Bitte wählen Sie das gewünschte Datum aus.";
  }

  const guestNum = parseInt(guests, 10);
  if (!guests || isNaN(guestNum) || guestNum < 1) {
    errors.guests = "Bitte geben Sie eine geschätzte Gästezahl an (mindestens 1).";
  }

  if (!location || location.length < 2) {
    errors.location = "Bitte geben Sie den gewünschten Veranstaltungsort an.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // Dispatch emails: 1) Admin notification, 2) Customer confirmation receipt
  const cateringPayload = {
    name,
    email,
    phone: phone || undefined,
    occasion,
    date,
    guests,
    location,
    notes: notes || undefined,
  };

  await Promise.allSettled([
    sendCateringInquiryEmail(cateringPayload),
    sendCateringConfirmationToCustomer(cateringPayload),
  ]);

  return {
    success: true,
    message: `Vielen Dank für Ihre Catering-Anfrage für den ${date}. Wir werden die Details zu Ihrem Anlass (${occasion}) sorgfältig prüfen und Ihnen ein individuelles Angebot unterbreiten.`,
    data: {
      name,
      occasion,
      guests,
      date,
      phone: phone || undefined,
      notes: notes || undefined,
    },
  };
}

export async function submitContactMessage(
  _prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const honeypot = formData.get("website_check")?.toString().trim();
  if (honeypot && honeypot.length > 0) {
    return {
      success: true,
      message: "Ihre Nachricht wurde erfolgreich entgegengenommen.",
    };
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const subject = formData.get("subject")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Bitte nennen Sie uns Ihren Namen.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (!message || message.length < 10) {
    errors.message = "Bitte verfassen Sie eine kurze Nachricht (mindestens 10 Zeichen).";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // Dispatch emails: 1) Admin notification, 2) Customer confirmation receipt
  const contactPayload = {
    name,
    email,
    subject: subject || undefined,
    message,
  };

  await Promise.allSettled([
    sendContactInquiryEmail(contactPayload),
    sendContactConfirmationToCustomer(contactPayload),
  ]);

  return {
    success: true,
    message: "Vielen Dank für Ihre Kontaktaufnahme. Wir haben Ihre Nachricht erhalten und melden uns baldmöglichst bei Ihnen.",
    data: {
      subject: subject || undefined,
    },
  };
}
