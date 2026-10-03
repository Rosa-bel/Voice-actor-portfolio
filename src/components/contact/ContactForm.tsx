"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import clsx from "clsx";
import { profile } from "@/data/portfolioData";

const CATEGORIES = ["Commercial", "Narration", "Animation / Dubbing", "Video Game", "Corporate", "Other"];
const USAGES = ["Online / Social", "Broadcast TV / Radio", "Internal / Non-broadcast", "Unknown / Audition"];

type Errors = Partial<Record<"name" | "email" | "details", string>>;
type Status = "idle" | "sending" | "sent";

const field =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!d.name?.trim()) next.name = "Please tell me who you are.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? "")) next.email = "Enter a valid email address.";
    if (!d.details?.trim()) next.details = "A few words about the project help a lot.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const body = [
      `Name / Company: ${d.name}`,
      `Email: ${d.email}`,
      `Project category: ${d.category}`,
      `Usage & scope: ${d.usage}`,
      d.budget?.trim() ? `Script length / budget: ${d.budget}` : "",
      "",
      d.details,
    ]
      .filter((l, i) => l !== "" || i > 0)
      .join("\n");

    // Opens the visitor's mail app with everything pre-filled (no server needed).
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(`Voiceover inquiry - ${d.category}`)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      window.location.href = href;
      setStatus("sent");
      form.reset();
    }, 600);
  };

  const Err = ({ id, msg }: { id: string; msg?: string }) => (
    <AnimatePresence>
      {msg && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-xs text-crimson"
          role="alert"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Full name / Company</label>
          <input
            id="name" name="name" autoComplete="name" placeholder="Jane Doe — Studio X"
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined}
            className={clsx(field, errors.name ? "border-crimson" : "border-gray-200")}
          />
          <Err id="name-err" msg={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Work email</label>
          <input
            id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com"
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
            className={clsx(field, errors.email ? "border-crimson" : "border-gray-200")}
          />
          <Err id="email-err" msg={errors.email} />
        </div>
        <div>
          <label htmlFor="category" className={label}>Project category</label>
          <select id="category" name="category" className={clsx(field, "border-gray-200")}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="usage" className={label}>Usage &amp; scope</label>
          <select id="usage" name="usage" className={clsx(field, "border-gray-200")}>
            {USAGES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={label}>Script length / budget <span className="font-normal normal-case">(optional)</span></label>
        <input id="budget" name="budget" placeholder="e.g. 60 seconds, 500 words" className={clsx(field, "border-gray-200")} />
      </div>

      <div>
        <label htmlFor="details" className={label}>Project details / script notes</label>
        <textarea
          id="details" name="details" rows={5} placeholder="Tell me about the project, the tone you are after, deadlines…"
          aria-invalid={!!errors.details} aria-describedby={errors.details ? "details-err" : undefined}
          className={clsx(field, "resize-y", errors.details ? "border-crimson" : "border-gray-200")}
        />
        <Err id="details-err" msg={errors.details} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={clsx(
          "focus-ring inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 font-semibold text-white transition sm:w-auto",
          status === "sent" ? "bg-emerald-600" : "bg-burgundy hover:-translate-y-0.5 hover:bg-burgundy-light hover:shadow-lg hover:shadow-burgundy/25",
        )}
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "sent" && <Check className="h-4 w-4" />}
        {status === "idle" && <Send className="h-4 w-4" />}
        {status === "sending" ? "Opening your mail app…" : status === "sent" ? "Sent to your mail app" : "Send Inquiry & Get Quote"}
      </button>

      <AnimatePresence>
        {status === "sent" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-sm text-gray-600" role="status"
          >
            Your email app should have opened with the message ready — just hit send. Nothing happened?
            Write directly to <a className="font-semibold text-burgundy underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
