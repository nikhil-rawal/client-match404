import { useNavigate, Link } from "react-router-dom";
import LoadingBars from "@/_components/loading-bars";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/_store/store";
import { UPDATE_PROFILE_URL, USER_PROFILE_URL } from "@/constants";
import { User } from "@/_types/user";

const UpdateProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [fieldErrors, setFieldErrors] = useState<{
    firstName: boolean;
    lastName: boolean;
    phone: boolean;
  }>({
    firstName: false,
    lastName: false,
    phone: false,
  });
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  // Fetch current user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(USER_PROFILE_URL, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        const userData = data.data.user as User;

        setFirstName(userData.firstName);
        setLastName(userData.lastName || "");
        setPhone(userData.phone);
        setUser(userData);
        setIsFetching(false);
      } catch (err) {
        setError((err as Error).message);
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({
      firstName: false,
      lastName: false,
      phone: false,
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

    // Check individual field validity
    const firstNameValid = firstNameInput?.validity.valid ?? true;
    const lastNameInvalid = lastNameInput
      ? lastNameInput.value !== "" && !lastNameInput.validity.valid
      : false;
    const phoneValid = phoneInput?.validity.valid ?? true;

    setFieldErrors({
      firstName: !firstNameValid,
      lastName: lastNameInvalid,
      phone: !phoneValid,
    });

    if (!firstNameValid || !phoneValid || lastNameInvalid) {
      setIsLoading(false);
      return;
    }

    try {
      // Build request body with only the allowed update fields
      const requestBody: {
        firstName: string;
        lastName?: string;
        phone: string;
      } = {
        firstName: firstName.trim(),
        phone: phone.trim(),
      };

      // Only include lastName if it has a value
      if (lastName.trim() !== "") {
        requestBody.lastName = lastName.trim();
      }

      const response = await fetch(UPDATE_PROFILE_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setUser(data.data.user as User);
      setSuccess("Profile updated successfully!");
      setIsLoading(false);

      setTimeout(() => {
        navigate("/profile/user");
      }, 1000);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <LoadingBars />;
  }

  return (
    <>
      {isLoading && <LoadingBars />}
      <main className="flex justify-center mt-24 px-4">
        <div className="w-full max-w-md rounded-md border border-gray-300 p-6 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Update Profile
          </h1>
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
                  placeholder="Last Name (Optional)"
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
                    if (e.currentTarget.value !== "") {
                      setFieldErrors((prev) => ({ ...prev, lastName: true }));
                    }
                  }}
                  pattern="[A-Za-z][A-Za-z]*"
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
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </g>
                </svg>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  autoComplete="tel"
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
                  pattern="[0-9]{10}"
                  title="Phone number must be 10 digits"
                />
              </label>

              {/* Email (read-only, not editable) */}
              <label className="input flex items-center gap-2 opacity-60">
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
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </g>
                </svg>

                <input
                  type="email"
                  placeholder="Email"
                  value={user?.email || ""}
                  disabled
                  readOnly
                  className="cursor-not-allowed"
                />
              </label>

              {/* Error Messages */}
              {fieldErrors.firstName && (
                <div role="alert" className="alert alert-error text-sm w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    First name must be at least 3 letters (only letters allowed)
                  </span>
                </div>
              )}

              {fieldErrors.lastName && (
                <div role="alert" className="alert alert-error text-sm w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Last name must be at least 3 letters (only letters allowed)
                  </span>
                </div>
              )}

              {fieldErrors.phone && (
                <div role="alert" className="alert alert-error text-sm w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Phone number must be exactly 10 digits</span>
                </div>
              )}

              {error && (
                <div role="alert" className="alert alert-error text-sm w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div
                  role="alert"
                  className="alert alert-success text-sm w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{success}</span>
                </div>
              )}
            </fieldset>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <Link to="/profile/user" className="link link-primary">
              Back to Profile
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateProfilePage;
