"use client";
import { useRouter } from "next/navigation";
import LoadingBars from "@/_components/loading-bars";
import React, { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/_store/store";
import { LOGIN_URL } from "@/constants";
import { User } from "@/_types/user";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email: boolean;
    password: boolean;
  }>({ email: false, password: false });
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setFieldErrors({ email: false, password: false });

    const form = e.currentTarget;
    const emailInput = form.querySelector<HTMLInputElement>(
      'input[type="email"]'
    );
    const passwordInput = form.querySelector<HTMLInputElement>(
      'input[type="password"]'
    );

    // Check individual field validity
    const emailValid = emailInput?.validity.valid ?? true;
    const passwordValid = passwordInput?.validity.valid ?? true;

    setFieldErrors({
      email: !emailValid,
      password: !passwordValid,
    });

    if (!emailValid || !passwordValid) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      setUser(data.data.user as User);
      router.push("/");
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingBars />}
      <main className="flex justify-center mt-24 px-4">
        <div className="w-full max-w-md rounded-md border border-gray-300 p-6 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            className="flex flex-col gap-4"
          >
            <fieldset className="flex flex-col gap-4 items-center">
              {/* Email */}
              <label className="input validator flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </g>
                </svg>

                <input
                  type="email"
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email && e.target.validity.valid) {
                      setFieldErrors((prev) => ({ ...prev, email: false }));
                    }
                  }}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setFieldErrors((prev) => ({ ...prev, email: true }));
                  }}
                />
              </label>
              <p
                className={`validator-hint ${
                  fieldErrors.email ? "" : "hidden"
                } text-center w-80 m-0 p-0`}
              >
                Enter a valid email address
              </p>

              {/* Password */}
              <label className="input validator flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                  </g>
                </svg>

                <input
                  type="password"
                  placeholder="Password"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="At least 8 characters, including uppercase, lowercase, and a number"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password && e.target.validity.valid) {
                      setFieldErrors((prev) => ({ ...prev, password: false }));
                    }
                  }}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setFieldErrors((prev) => ({ ...prev, password: true }));
                  }}
                />
              </label>
              <p
                className={`validator-hint ${
                  fieldErrors.password ? "" : "hidden"
                } text-center w-80 m-0 p-0`}
              >
                Must be at least 8 characters with uppercase, lowercase, and a
                number
              </p>

              <button type="submit" className="btn btn-primary w-80 mt-4">
                Login
              </button>
            </fieldset>
          </form>
          <div className="flex justify-center items-center mt-4 text-gray-400 hover:text-gray-600">
            <Link href="/signup">
              Don&apos;t have an account? Please Register here!{" "}
            </Link>
          </div>
          {error && (
            <p className="text-red-500 text-center w-80 mx-auto mt-6">
              {error}
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default LoginPage;
