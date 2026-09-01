"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "./locale";

const RECIPIENT = "kleinsir08@gmail.com";
const TYPES = ["feature", "bug", "format", "ux", "other"] as const;
type FeedbackType = typeof TYPES[number];

export function FeedbackContent() {
  const { locale, t } = useLocale();
  const [type, setType] = useState<FeedbackType>("feature");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim()) { setShowError(true); return; }
    setShowError(false);
    const typeLabel = t(`feedback.type.${type}` as "feedback.type.feature");
    const body = [
      `${t("feedback.bodyType")}: ${typeLabel}`,
      `${t("feedback.bodyContent")}:\n${content.trim()}`,
      `${t("feedback.bodyEmail")}: ${email.trim() || t("feedback.notProvided")}`,
      `${t("feedback.bodyPage")}: ${window.location.href}`,
      `${t("feedback.bodyLanguage")}: ${locale}`,
      `${t("feedback.bodyBrowser")}: ${navigator.userAgent}`,
    ].join("\n\n");
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(t("feedback.subject", { type: typeLabel }))}&body=${encodeURIComponent(body)}`;
  }

  return <main className="page-shell max-w-3xl py-14 sm:py-20">
    <p className="text-sm font-medium text-blue-700">{t("feedback.eyebrow")}</p>
    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">{t("feedback.title")}</h1>
    <p className="mt-4 max-w-2xl leading-7 text-zinc-600">{t("feedback.description")}</p>
    <form onSubmit={submit} className="mt-10 space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_18px_50px_rgba(24,39,75,.06)] sm:p-7">
      <label className="block text-sm font-medium text-zinc-800">{t("feedback.type")}
        <select value={type} onChange={event => setType(event.target.value as FeedbackType)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          {TYPES.map(value => <option key={value} value={value}>{t(`feedback.type.${value}` as "feedback.type.feature")}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium text-zinc-800">{t("feedback.content")}
        <textarea value={content} onChange={event => { setContent(event.target.value); if (showError) setShowError(false); }} placeholder={t("feedback.contentPlaceholder")} rows={7} className="mt-2 w-full resize-y rounded-xl border border-zinc-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
      </label>
      {showError && <p role="alert" className="text-sm text-red-600">{t("feedback.empty")}</p>}
      <label className="block text-sm font-medium text-zinc-800">{t("feedback.email")}
        <input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder={t("feedback.emailPlaceholder")} className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
      </label>
      <button type="submit" className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,.18)] transition hover:bg-blue-700 sm:w-auto">{t("feedback.send")}</button>
      <p className="text-xs leading-5 text-zinc-500">{t("feedback.note")}</p>
    </form>
  </main>;
}
