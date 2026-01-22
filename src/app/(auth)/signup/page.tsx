import { useNavigate, Link } from "react-router-dom";
import LoadingBars from "@/_components/loading-bars";
import React, { useState } from "react";
import { SIGNUP_URL } from "@/constants";

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{
    firstName: boolean;
    lastName: boolean;
    phone: boolean;
    email: boolean;
    password: boolean;
  }>({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setFieldErrors({
      firstName: false,
      lastName: false,
      phone: false,
      email: false,
      password: false,
    });

    const form = e.currentTarget;
    const firstNameInput = form.querySelector<HTMLInputElement>(
      'input[autocomplete="firstName"]'
    );
    const lastNameInput = form.querySelector<HTMLInputElement>(
      'input[autocomplete="lastName"]'
    );
    const phoneInput =
      form.querySelector<HTMLInputElement>('input[type="tel"]');
    const emailInput = form.querySelector<HTMLInputElement>(
      'input[type="email"]'
    );
    const passwordInput = form.querySelector<HTMLInputElement>(
      'input[type="password"]'
    );

    // Check individual field validity
    const firstNameValid = firstNameInput?.validity.valid ?? true;
    const lastNameInvalid = lastNameInput
      ? lastNameInput.value !== "" && !lastNameInput.validity.valid
      : false;
    const phoneValid = phoneInput?.validity.valid ?? true;
    const emailValid = emailInput?.validity.valid ?? true;
    const passwordValid = passwordInput?.validity.valid ?? true;

    setFieldErrors({
      firstName: !firstNameValid,
      lastName: lastNameInvalid,
      phone: !phoneValid,
      email: !emailValid,
      password: !passwordValid,
    });

    if (
      !firstNameValid ||
      !phoneValid ||
      !emailValid ||
      !passwordValid ||
      lastNameInvalid
    ) {
      setIsLoading(false);
      return;
    }

    try {
      // Build request body, omitting empty optional fields
      const requestBody: {
        firstName: string;
        lastName?: string;
        email: string;
        phone: string;
        password: string;
      } = {
        firstName,
        email,
        phone,
        password,
      };

      // Only include lastName if it has a value
      if (lastName.trim() !== "") {
        requestBody.lastName = lastName.trim();
      }

      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      console.log(data);
      navigate("/login");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingBars />}
      <main className="flex justify-center mt-24 px-4">
        <div className="w-full max-w-md rounded-md border border-gray-300 p-6 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-bold">Register</h1>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            className="flex flex-col gap-4"
          >
            <fieldset className="flex flex-col gap-4 items-center">
              {/* First Name */}
              <label className="input validator flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>

                <input
                  type="text"
                  placeholder="First Name"
                  required
                  autoComplete="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (fieldErrors.firstName && e.target.validity.valid) {
                      setFieldErrors((prev) => ({ ...prev, firstName: false }));
                    }
                  }}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setFieldErrors((prev) => ({ ...prev, firstName: true }));
                  }}
                  pattern="[A-Za-z][A-Za-z]*"
                  minLength={3}
                  maxLength={30}
                  title="Only letters"
                />
              </label>

              {/* Last Name */}
              <label className="input validator flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>

                <input
                  type="text"
                  placeholder="Last Name"
                  autoComplete="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (
                      fieldErrors.lastName &&
                      (e.target.value === "" || e.target.validity.valid)
                    ) {
                      setFieldErrors((prev) => ({ ...prev, lastName: false }));
                    }
                  }}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setFieldErrors((prev) => ({ ...prev, lastName: true }));
                  }}
                  pattern="[A-Za-z][A-Za-z]"
                  minLength={3}
                  maxLength={30}
                  title="Only letters"
                />
              </label>

              {/* Phone */}
              <label className="input validator flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>

                <input
                  type="tel"
                  placeholder="Phone"
                  required
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldErrors.phone && e.target.validity.valid) {
                      setFieldErrors((prev) => ({ ...prev, phone: false }));
                    }
                  }}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setFieldErrors((prev) => ({ ...prev, phone: true }));
                  }}
                  className="tabular-nums"
                  pattern="[0-9]*"
                  minLength={10}
                  maxLength={10}
                  title="Must be 10 digits"
                />
              </label>
              <p
                className={`validator-hint ${
                  fieldErrors.phone ? "" : "hidden"
                } text-center w-80 m-0 p-0`}
              >
                Enter a valid phone number
              </p>

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
            <Link to="/login">
              Already have an account? Please Login here!{" "}
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

export default SignupPage;
