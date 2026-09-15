"use client";

import { useEffect, useState } from "react";
import { Phone, ShieldCheck, PartyPopper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/shared/otp-input";
import { useAuth } from "@/lib/auth-context";
import { AGE_BANDS } from "@/lib/data/age-bands";
import { MOCK_ACCOUNT } from "@/lib/data/account";
import { toTitleCase } from "@/lib/format";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

type Step = "phone" | "otp" | "details" | "success";

export function LoginModal() {
  const { isLoginOpen, closeLogin, login, isKnownPhone } = useAuth();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);
  const [isReturningUser, setIsReturningUser] = useState(false);

  // Simulated OTP — no SMS gateway wired up yet, so the code is generated
  // here and shown inline for demo purposes. Swap for a real Convex action
  // (e.g. api.auth.sendOtp / api.auth.verifyOtp backed by an SMS provider)
  // when one exists, and drop the on-screen hint below.
  const [demoOtp, setDemoOtp] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [childAgeBand, setChildAgeBand] = useState("");

  useEffect(() => {
    if (!isLoginOpen) return;
    // Reset to a clean first step every time the modal is reopened.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep("phone");
    setPhone("");
    setOtp("");
    setOtpError(null);
    setPhoneError(null);
    setName("");
    setEmail("");
    setChildAgeBand("");
  }, [isLoginOpen]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = window.setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [resendIn]);

  function sendOtp() {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setDemoOtp(code);
    setOtp("");
    setOtpError(null);
    setResendIn(RESEND_COOLDOWN_SECONDS);
    setStep("otp");
  }

  function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Enter a valid 10-digit mobile number.");
      return;
    }
    setPhoneError(null);
    setIsReturningUser(isKnownPhone(phone));
    sendOtp();
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== OTP_LENGTH) {
      setOtpError(`Enter the ${OTP_LENGTH}-digit code.`);
      return;
    }
    if (otp !== demoOtp) {
      setOtpError("That code doesn't match. Check and try again.");
      return;
    }
    setOtpError(null);
    if (isReturningUser) {
      setName(MOCK_ACCOUNT.name);
      login({ phone: `+91 ${phone}`, name: MOCK_ACCOUNT.name, email: MOCK_ACCOUNT.email });
      setStep("success");
    } else {
      setStep("details");
    }
  }

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ phone: `+91 ${phone}`, name, email, childAgeBand: childAgeBand || undefined });
    setStep("success");
  }

  return (
    <Dialog open={isLoginOpen} onOpenChange={(open) => !open && closeLogin()}>
      <DialogContent className="sm:max-w-sm">
        {step === "phone" && (
          <>
            <DialogHeader>
              <span className="mb-1 flex size-11 items-center justify-center bg-sand text-navy">
                <Phone className="size-5" aria-hidden />
              </span>
              <DialogTitle>Log in or sign up</DialogTitle>
              <DialogDescription>
                We&apos;ll text you a one-time code — no password needed.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="login-phone" className="mb-1.5">
                  Mobile number
                </Label>
                <div className="flex items-center border border-field-border bg-white focus-within:border-navy">
                  <span className="pl-4 text-[15px] text-ink-muted">+91</span>
                  <Input
                    id="login-phone"
                    inputMode="numeric"
                    autoFocus
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setPhoneError(null);
                    }}
                    className="border-none focus-visible:border-none"
                  />
                </div>
                {phoneError && <p className="tn-meta mt-1.5 text-accent-red">{phoneError}</p>}
              </div>
              <Button type="submit" size="commerce">
                Send OTP
              </Button>
              <p className="tn-meta text-center leading-relaxed">
                By continuing, you agree to Toyznest&apos;s Terms of Use and Privacy Policy.
              </p>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <DialogHeader>
              <span className="mb-1 flex size-11 items-center justify-center bg-sand text-navy">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <DialogTitle>Verify your number</DialogTitle>
              <DialogDescription>
                Enter the {OTP_LENGTH}-digit code sent to +91 {phone}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
              <OtpInput length={OTP_LENGTH} value={otp} onChange={(v) => { setOtp(v); setOtpError(null); }} autoFocus />
              {otpError && (
                <p className="tn-meta text-center text-accent-red">{otpError}</p>
              )}
              <p className="tn-meta border border-hairline bg-sand px-3 py-2 text-center text-ink">
                Demo mode — no SMS is actually sent. Your code is{" "}
                <span className="font-bold text-navy">{demoOtp}</span>.
              </p>
              <Button type="submit" size="commerce">
                Verify &amp; continue
              </Button>
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="font-semibold text-ink-muted hover:text-navy"
                >
                  Change number
                </button>
                <button
                  type="button"
                  disabled={resendIn > 0}
                  onClick={sendOtp}
                  className="font-semibold text-navy disabled:cursor-not-allowed disabled:text-ink-muted"
                >
                  {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
                </button>
              </div>
            </form>
          </>
        )}

        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle>Just a few details</DialogTitle>
              <DialogDescription>
                First time here — tell us a little about you.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="login-name" className="mb-1.5">
                  Full name
                </Label>
                <Input
                  id="login-name"
                  required
                  autoFocus
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="login-email" className="mb-1.5">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="login-child-age" className="mb-1.5">
                  Child&apos;s age (optional)
                </Label>
                <select
                  id="login-child-age"
                  value={childAgeBand}
                  onChange={(e) => setChildAgeBand(e.target.value)}
                  className="h-11 w-full border border-field-border bg-white px-4 text-[15px] text-ink outline-none focus-visible:border-navy"
                >
                  <option value="">Prefer not to say</option>
                  {AGE_BANDS.map((band) => (
                    <option key={band.id} value={band.id}>
                      {band.rangeLabel} · {band.stageName}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" size="commerce">
                Create account
              </Button>
            </form>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <span className="mb-1 flex size-11 items-center justify-center bg-success/10 text-success">
                <PartyPopper className="size-5" aria-hidden />
              </span>
              <DialogTitle>
                {isReturningUser
                  ? `Welcome back${name ? `, ${toTitleCase(name)}` : ""}!`
                  : "You're all set!"}
              </DialogTitle>
              <DialogDescription>
                You&apos;re logged in. Happy shopping!
              </DialogDescription>
            </DialogHeader>
            <Button size="commerce" onClick={closeLogin}>
              Continue shopping
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
