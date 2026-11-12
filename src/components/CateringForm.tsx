"use client";

import React, { useState, useTransition } from "react";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, Sparkles, Users, Calendar, MapPin, Mail, User } from "lucide-react";
import { submitCateringInquiry, CateringFormState } from "@/app/actions/inquiries";
import { CateringVisualizer3D } from "@/components/CateringVisualizer3D";

export function CateringForm() {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<CateringFormState | null>(null);

  // Live Dossier State
  const [selectedOccasion, setSelectedOccasion] = useState<string>("");
  const [guestsCount, setGuestsCount] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");

  const occasionOptions = [
    { id: "Apéro / Apéro riche", label: "Apéro riche", desc: "Fingerfood & Häppchen" },
    { id: "Firmenanlass / Business Event", label: "Firmenanlass", desc: "Business & Empfang" },
    { id: "Geburtstagsfeier", label: "Geburtstag", desc: "Private Festfreude" },
    { id: "Privatfeier / Familienfest", label: "Privatfeier", desc: "Familie & Freunde" },
    { id: "Anderer festlicher Anlass", label: "Individuell", desc: "Spezielle Wünsche" },
  ];

  const guestPresets = ["12", "25", "50", "80", "120+"];

  const handleOccasionClick = (occ: string) => {
    setSelectedOccasion(occ);
  };

  const handleGuestPreset = (num: string) => {
    const val = num.replace("+", "");
    setGuestsCount(val);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitCateringInquiry(formState, formData);
      setFormState(result);
      if (result.success) {
        form.reset();
        setSelectedOccasion("");
        setGuestsCount("");
        setEventDate("");
        setEventLocation("");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* LEFT COLUMN: 3D INTERACTIVE VISUALIZER & LIVE DOSSIER */}
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <CateringVisualizer3D
          dossier={{
            occasion: selectedOccasion,
            guests: guestsCount,
            date: eventDate,
            location: eventLocation,
          }}
        />
      </div>

      {/* RIGHT COLUMN: CINEMATIC OBSIDIAN GLASS FORM */}
      <div className="lg:col-span-7">
        <div className="bg-[#181816]/95 border border-[#2A2A26] rounded-2xl p-7 sm:p-11 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6AD83]/5 rounded-full blur-3xl pointer-events-none" />

          {formState?.success ? (
            /* Cinematic Success State */
            <div className="text-center py-10 space-y-6" role="status" aria-live="polite">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#111110] border-2 border-[#C6AD83] flex items-center justify-center text-[#C6AD83] shadow-lg shadow-[#C6AD83]/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block mb-2">
                  Bestätigung
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F3EEE6] font-normal">
                  Anfrage erfolgreich übermittelt
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#B8B0A4] max-w-lg mx-auto leading-relaxed font-light">
                {formState.message}
              </p>

              {/* Summary Dossier Box */}
              <div className="bg-[#111110] p-6 rounded-xl border border-[#2A2A26] max-w-md mx-auto text-left text-xs text-[#B8B0A4] space-y-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C6AD83] font-semibold pb-1 border-b border-[#2A2A26]">
                  Dossier Zusammenfassung:
                </p>
                {formState.data?.name && (
                  <p>
                    <span className="text-[#F3EEE6] font-medium">Gastgeber:</span> {formState.data.name}
                  </p>
                )}
                {formState.data?.occasion && (
                  <p>
                    <span className="text-[#F3EEE6] font-medium">Anlass:</span> {formState.data.occasion}
                  </p>
                )}
                {formState.data?.guests && (
                  <p>
                    <span className="text-[#F3EEE6] font-medium">Personenzahl:</span> {formState.data.guests} Personen
                  </p>
                )}
                {formState.data?.date && (
                  <p>
                    <span className="text-[#F3EEE6] font-medium">Termin:</span> {formState.data.date}
                  </p>
                )}
                <div className="pt-2 text-[11px] text-[#A98E63] border-t border-[#2A2A26]/60">
                  Wir prüfen die Verfügbarkeit an der Spitzwaldstrasse 4 in Allschwil und kontaktieren Sie zeitnah.
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setFormState(null)}
                  className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-semibold text-[#C6AD83] hover:text-[#DFCBB5] transition-colors focus-ring"
                >
                  <span>Weiteren Anlass konfigurieren</span>
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Form Title & Stepper Tag */}
              <div className="border-b border-[#2A2A26] pb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#C6AD83] bg-[#111110] px-3 py-1 rounded border border-[#2A2A26]">
                    Schritt 01 · Eckdaten erfassen
                  </span>
                  <span className="text-[10px] text-[#B8B0A4] font-mono">
                    * Pflichtangaben
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EEE6] font-normal">
                  Catering-Konfiguration
                </h3>
                <p className="text-xs sm:text-sm text-[#B8B0A4] mt-1 font-light leading-relaxed">
                  Definieren Sie Ihren Anlassrahmen. Wir erstellen eine transparente und massgeschneiderte Offerte.
                </p>
              </div>

              {/* Honeypot anti-spam */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_check">Bitte dieses Feld leer lassen</label>
                <input
                  type="text"
                  id="website_check"
                  name="website_check"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* BLOCK 1: ANLASS (INTERACTIVE LUXURY PILLS) */}
              <div className="space-y-3">
                <label
                  htmlFor="occasion"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#F3EEE6] font-mono flex items-center"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#C6AD83]" />
                  <span>Art des Anlasses *</span>
                </label>

                {/* Quick Interactive Selector Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {occasionOptions.map((occ) => {
                    const isSelected = selectedOccasion === occ.id;
                    return (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => handleOccasionClick(occ.id)}
                        className={`p-3 text-left rounded-lg border transition-all text-xs focus-ring ${
                          isSelected
                            ? "bg-[#29201B] border-[#C6AD83] text-[#F3EEE6] shadow-md shadow-[#C6AD83]/10"
                            : "bg-[#111110]/80 border-[#2A2A26] text-[#B8B0A4] hover:border-[#C6AD83]/50 hover:text-[#F3EEE6]"
                        }`}
                      >
                        <p className={`font-serif text-sm font-normal ${isSelected ? "text-[#C6AD83]" : "text-[#F3EEE6]"}`}>
                          {occ.label}
                        </p>
                        <p className="text-[10px] text-[#B8B0A4]/70 mt-0.5 truncate">
                          {occ.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Standard Select (Required Form Control, Bound) */}
                <select
                  id="occasion"
                  name="occasion"
                  required
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!formState?.errors?.occasion}
                  aria-describedby={formState?.errors?.occasion ? "occasion-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg bg-[#111110] border text-xs text-[#F3EEE6] transition-colors focus-ring ${
                    formState?.errors?.occasion
                      ? "border-red-500 bg-red-950/20"
                      : "border-[#2A2A26] focus:border-[#C6AD83]"
                  }`}
                >
                  <option value="" disabled>
                    Oder aus der Liste wählen...
                  </option>
                  {occasionOptions.map((occ) => (
                    <option key={occ.id} value={occ.id} className="bg-[#111110] text-[#F3EEE6]">
                      {occ.id}
                    </option>
                  ))}
                </select>
                {formState?.errors?.occasion && (
                  <p id="occasion-error" className="mt-1.5 text-xs text-red-400 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                    {formState.errors.occasion}
                  </p>
                )}
              </div>

              {/* BLOCK 2: GÄSTEZAHL & DATUM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Gästeanzahl with Presets */}
                <div className="space-y-2">
                  <label
                    htmlFor="guests"
                    className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#F3EEE6] font-mono flex items-center"
                  >
                    <Users className="w-3.5 h-3.5 mr-1.5 text-[#C6AD83]" />
                    <span>Gästeanzahl *</span>
                  </label>

                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      min="1"
                      max="500"
                      required
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      aria-required="true"
                      aria-invalid={!!formState?.errors?.guests}
                      aria-describedby={formState?.errors?.guests ? "guests-error" : undefined}
                      placeholder="z.B. 35"
                      className={`w-full px-4 py-3 rounded-lg bg-[#111110] border text-sm text-[#F3EEE6] placeholder-[#5C554E] transition-colors focus-ring ${
                        formState?.errors?.guests
                          ? "border-red-500 bg-red-950/20"
                          : "border-[#2A2A26] focus:border-[#C6AD83]"
                      }`}
                    />
                  </div>

                  {/* Preset Pills */}
                  <div className="flex items-center space-x-1.5 pt-1">
                    <span className="text-[10px] text-[#A98E63] font-mono mr-1">Presets:</span>
                    {guestPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleGuestPreset(preset)}
                        className="px-2.5 py-1 text-[10px] font-mono rounded bg-[#111110] border border-[#2A2A26] hover:border-[#C6AD83] text-[#B8B0A4] hover:text-[#F3EEE6] transition-colors focus-ring"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  {formState?.errors?.guests && (
                    <p id="guests-error" className="mt-1 text-xs text-red-400 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                      {formState.errors.guests}
                    </p>
                  )}
                </div>

                {/* Gewünschtes Datum */}
                <div className="space-y-2">
                  <label
                    htmlFor="date"
                    className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#F3EEE6] font-mono flex items-center"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#C6AD83]" />
                    <span>Gewünschtes Datum *</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    onFocus={(e) => {
                      if (!e.currentTarget.min) {
                        e.currentTarget.min = new Date().toISOString().split("T")[0];
                      }
                    }}
                    required
                    aria-required="true"
                    aria-invalid={!!formState?.errors?.date}
                    aria-describedby={formState?.errors?.date ? "date-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg bg-[#111110] border text-sm text-[#F3EEE6] transition-colors focus-ring ${
                      formState?.errors?.date
                        ? "border-red-500 bg-red-950/20"
                        : "border-[#2A2A26] focus:border-[#C6AD83]"
                    }`}
                  />
                  {formState?.errors?.date && (
                    <p id="date-error" className="mt-1 text-xs text-red-400 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                      {formState.errors.date}
                    </p>
                  )}
                </div>
              </div>

              {/* BLOCK 3: VERANSTALTUNGSORT */}
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#F3EEE6] font-mono flex items-center"
                >
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#C6AD83]" />
                  <span>Veranstaltungsort / Adresse *</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={!!formState?.errors?.location}
                  aria-describedby={formState?.errors?.location ? "location-error" : undefined}
                  placeholder="z.B. Allschwil, Basel oder Firmenräumlichkeiten"
                  className={`w-full px-4 py-3 rounded-lg bg-[#111110] border text-sm text-[#F3EEE6] placeholder-[#5C554E] transition-colors focus-ring ${
                    formState?.errors?.location
                      ? "border-red-500 bg-red-950/20"
                      : "border-[#2A2A26] focus:border-[#C6AD83]"
                  }`}
                />
                {formState?.errors?.location && (
                  <p id="location-error" className="mt-1 text-xs text-red-400 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                    {formState.errors.location}
                  </p>
                )}
              </div>

              {/* BLOCK 4: PERSÖNLICHE KONTAKTDATEN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#2A2A26]">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#F3EEE6] font-mono mb-1.5 flex items-center"
                  >
                    <User className="w-3.5 h-3.5 mr-1.5 text-[#C6AD83]" />
                    <span>Vor- und Nachname *</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    aria-invalid={!!formState?.errors?.name}
                    aria-describedby={formState?.errors?.name ? "name-error" : undefined}
                    placeholder="z.B. Beatrice Keller"
                    className={`w-full px-4 py-3 rounded-lg bg-[#111110] border text-sm text-[#F3EEE6] placeholder-[#5C554E] transition-colors focus-ring ${
                      formState?.errors?.name
                        ? "border-red-500 bg-red-950/20"
                        : "border-[#2A2A26] focus:border-[#C6AD83]"
                    }`}
                  />
                  {formState?.errors?.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                      {formState.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#F3EEE6] font-mono mb-1.5 flex items-center"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1.5 text-[#C6AD83]" />
                    <span>E-Mail-Adresse *</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    aria-invalid={!!formState?.errors?.email}
                    aria-describedby={formState?.errors?.email ? "email-error" : undefined}
                    placeholder="ihre.adresse@beispiel.ch"
                    className={`w-full px-4 py-3 rounded-lg bg-[#111110] border text-sm text-[#F3EEE6] placeholder-[#5C554E] transition-colors focus-ring ${
                      formState?.errors?.email
                        ? "border-red-500 bg-red-950/20"
                        : "border-[#2A2A26] focus:border-[#C6AD83]"
                    }`}
                  />
                  {formState?.errors?.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                      {formState.errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* BLOCK 5: TELEFON & NACHRICHT */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#F3EEE6] font-mono mb-1.5"
                  >
                    Telefonnummer <span className="text-[#5C554E] lowercase font-sans">(optional für Rückfragen)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+41 61 000 00 00"
                    className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#2A2A26] text-sm text-[#F3EEE6] placeholder-[#5C554E] focus:border-[#C6AD83] transition-colors focus-ring"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#F3EEE6] font-mono mb-1.5"
                  >
                    Individuelle Wünsche & Rahmenbedingungen <span className="text-[#5C554E] lowercase font-sans">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Teilen Sie uns Details zu kulinarischen Vorlieben (vegetarisch, Apéro-Schwerpunkte), Zeitplan oder Vor-Ort-Bedingungen mit..."
                    className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#2A2A26] text-sm text-[#F3EEE6] placeholder-[#5C554E] focus:border-[#C6AD83] transition-colors focus-ring resize-y font-light"
                  />
                </div>
              </div>

              {/* PRIVACY NOTE */}
              <p className="text-xs text-[#5C554E] leading-relaxed font-light">
                Ihre Daten werden vertraulich gemäss Schweizer Datenschutzgesetz (revDSG) behandelt und ausschliesslich zur Ausarbeitung Ihres individuellen Catering-Angebots verwendet.
              </p>

              {/* SUBMIT BUTTON WITH CHAMPAGNE SHIMMER */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto min-w-[260px] inline-flex items-center justify-center px-9 py-4 text-xs uppercase tracking-[0.2em] font-semibold text-[#111110] bg-[#C6AD83] hover:bg-[#DFCBB5] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-sm shadow-xl hover:shadow-[#C6AD83]/20 focus-ring group"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Dossier wird übermittelt...</span>
                    </>
                  ) : (
                    <>
                      <span>Unverbindliche Offerte anfordern</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
