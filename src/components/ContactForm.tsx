"use client";

import React, { useState, useTransition } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitContactMessage, ContactFormState } from "@/app/actions/inquiries";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<ContactFormState | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitContactMessage(formState, formData);
      setFormState(result);
      if (result.success) {
        form.reset();
      }
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md border border-[#E8E2D8]">
      {formState?.success ? (
        <div className="text-center py-6 space-y-4" role="status" aria-live="polite">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF8F5] border-2 border-[#C5A880] flex items-center justify-center text-[#A88656]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#1C1612]">
            Nachricht gesendet
          </h3>
          <p className="text-sm text-[#6B6156] max-w-md mx-auto leading-relaxed">
            {formState.message}
          </p>
          <button
            type="button"
            onClick={() => setFormState(null)}
            className="text-xs uppercase tracking-widest font-semibold text-[#A88656] hover:underline pt-2 focus-ring"
          >
            Neue Nachricht schreiben
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="border-b border-[#E8E2D8] pb-3">
            <h3 className="font-serif text-xl text-[#1C1612]">
              Kontaktieren Sie uns
            </h3>
            <p className="text-xs text-[#6B6156] mt-1">
              Wir freuen uns über Ihre Fragen, Anregungen oder Tischwünsche.
            </p>
          </div>

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_check_contact">Bitte frei lassen</label>
            <input
              type="text"
              id="website_check_contact"
              name="website_check"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact_name"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1C1612] mb-1"
              >
                Name *
              </label>
              <input
                type="text"
                id="contact_name"
                name="name"
                required
                aria-required="true"
                aria-invalid={!!formState?.errors?.name}
                aria-describedby={formState?.errors?.name ? "cname-err" : undefined}
                placeholder="Ihr Name"
                className={`w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border text-sm text-[#1C1612] transition-colors focus-ring ${
                  formState?.errors?.name
                    ? "border-red-500"
                    : "border-[#E8E2D8] focus:border-[#C5A880]"
                }`}
              />
              {formState?.errors?.name && (
                <p id="cname-err" className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  {formState.errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact_email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1C1612] mb-1"
              >
                E-Mail *
              </label>
              <input
                type="email"
                id="contact_email"
                name="email"
                required
                aria-required="true"
                aria-invalid={!!formState?.errors?.email}
                aria-describedby={formState?.errors?.email ? "cemail-err" : undefined}
                placeholder="ihre.adresse@beispiel.ch"
                className={`w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border text-sm text-[#1C1612] transition-colors focus-ring ${
                  formState?.errors?.email
                    ? "border-red-500"
                    : "border-[#E8E2D8] focus:border-[#C5A880]"
                }`}
              />
              {formState?.errors?.email && (
                <p id="cemail-err" className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  {formState.errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="contact_subject"
              className="block text-xs font-semibold uppercase tracking-wider text-[#1C1612] mb-1"
            >
              Betreff
            </label>
            <input
              type="text"
              id="contact_subject"
              name="subject"
              placeholder="z.B. Tischreservation, Öffnungszeiten, Feedback"
              className="w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-sm text-[#1C1612] focus:border-[#C5A880] transition-colors focus-ring"
            />
          </div>

          <div>
            <label
              htmlFor="contact_message"
              className="block text-xs font-semibold uppercase tracking-wider text-[#1C1612] mb-1"
            >
              Nachricht *
            </label>
            <textarea
              id="contact_message"
              name="message"
              rows={4}
              required
              aria-required="true"
              aria-invalid={!!formState?.errors?.message}
              aria-describedby={formState?.errors?.message ? "cmsg-err" : undefined}
              placeholder="Wie können wir Ihnen weiterhelfen?"
              className={`w-full px-3.5 py-2.5 rounded bg-[#FAF8F5] border text-sm text-[#1C1612] transition-colors focus-ring resize-y ${
                formState?.errors?.message
                  ? "border-red-500"
                  : "border-[#E8E2D8] focus:border-[#C5A880]"
              }`}
            />
            {formState?.errors?.message && (
              <p id="cmsg-err" className="mt-1 text-xs text-red-600 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                {formState.errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-semibold text-[#1C1612] bg-[#C5A880] hover:bg-[#D4AF37] disabled:opacity-50 transition-colors rounded-sm focus-ring"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Senden...
              </span>
            ) : (
              "Nachricht senden"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
