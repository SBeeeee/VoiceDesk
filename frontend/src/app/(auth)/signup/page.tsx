"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { registerThunk } from "@/src/thunks/auth.thunks";

type Role = "user" | "shopkeeper";

export default function SignupPage() {
  const router = useRouter();
  const { register, loading, error, isLoggedIn, clearError } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user" as Role,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (isLoggedIn) router.push("/dashboard");
  }, [isLoggedIn]);

  useEffect(() => {
    if (error) clearError();
  }, [form.username, form.email, form.password]);

  // Simple password strength calc
  useEffect(() => {
    const p = form.password;
    let strength = 0;
    if (p.length >= 8) strength++;
    if (/[A-Z]/.test(p)) strength++;
    if (/[0-9]/.test(p)) strength++;
    if (/[^A-Za-z0-9]/.test(p)) strength++;
    setPasswordStrength(strength);
  }, [form.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await register(form);
    if (registerThunk.fulfilled.match(result)) {
      router.push(form.role === "shopkeeper" ? "/onboarding" : "/dashboard");
    }
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][passwordStrength];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden selection:bg-pink-100 selection:text-pink-600">
      {/* Ambient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-100/50 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-rose-100/30 blur-[100px] rounded-full animate-pulse [animation-delay:2.5s]" />

      <div className="w-full max-w-sm relative z-10">
        {/* Header */}
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-950 border border-gray-900 mb-6 shadow-xl shadow-gray-200 -rotate-3 hover:rotate-0 transition-transform duration-500 group cursor-default">
            <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016 2.993 2.993 0 0 0 2.25-1.016 3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </div>
          <h1 className="text-gray-950 text-3xl font-black tracking-tighter">
            Create an account
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-2">
            Experience the future of voice reception
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[2.5rem] p-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-4 animate-in zoom-in duration-300">
                <svg className="w-5 h-5 text-rose-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                <p className="text-rose-600 text-xs font-bold leading-tight">{error}</p>
              </div>
            )}

            {/* Role toggle */}
            <div className="space-y-2">
              <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50/80 rounded-2xl border border-gray-100">
                {(["user", "shopkeeper"] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, role: r }))}
                    className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${form.role === r
                      ? "bg-gray-950 text-white shadow-lg shadow-gray-200"
                      : "text-gray-500 hover:text-gray-700 font-bold"
                      }`}
                  >
                    {r === "shopkeeper" ? "Shop Owner" : "Customer"}
                  </button>
                ))}
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="reception_pro"
                required
                autoComplete="username"
                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-300 focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-pink-500/5 font-medium"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="reception@desk.com"
                required
                autoComplete="email"
                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-300 focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-pink-500/5 font-medium"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 pr-12 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-300 focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-pink-500/5 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength bar */}
              {form.password.length > 0 && (
                <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex gap-1.5 px-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= passwordStrength ? strengthColor : "bg-gray-100"
                          }`}
                      />
                    ))}
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ml-1 ${passwordStrength <= 1 ? "text-rose-400" :
                    passwordStrength === 2 ? "text-amber-400" :
                      passwordStrength === 3 ? "text-blue-400" : "text-emerald-500"
                    }`}>
                    Security: {strengthLabel}
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !form.username || !form.email || !form.password}
              className="w-full relative group overflow-hidden bg-gray-950 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl py-5 mt-4 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Create account
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-600 font-bold hover:text-rose-600 transition-colors underline-offset-4 decoration-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}