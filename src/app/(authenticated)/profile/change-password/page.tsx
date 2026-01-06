"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBars from "@/_components/loading-bars";
import { CHANGE_PASSWORD_URL } from "@/constants";

const ChangePasswordPage: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState({
    oldPassword: false,
    newPassword: false,
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({ oldPassword: false, newPassword: false });
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isOldPasswordValid = strongPassword.test(oldPassword);
    const isNewPasswordValid = strongPassword.test(newPassword);

    setFieldErrors({
      oldPassword: !isOldPasswordValid,
      newPassword: !isNewPasswordValid,
    });

    if (!isOldPasswordValid || !isNewPasswordValid) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(CHANGE_PASSWORD_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setSuccess("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setIsLoading(false);

      setTimeout(() => {
        router.push("/profile/user");
      }, 1500);
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
          <h1 className="mb-6 text-center text-2xl font-bold">
            Change Password
          </h1>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              handlePasswordChange(e)
            }
            className="flex flex-col gap-4"
          >
            <fieldset className="flex flex-col gap-4 items-center">
              {/* Old Password */}
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
                  type="password"
                  name="old-password"
                  placeholder="Old Password"
                  required
                  autoComplete="current-password"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    if (fieldErrors.oldPassword && e.target.validity.valid) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        oldPassword: false,
                      }));
                    }
                  }}
                  title="At least 8 characters, including uppercase, lowercase, and a number"
                />
              </label>

              {/* New Password */}
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
                  type="password"
                  name="new-password"
                  placeholder="New Password"
                  required
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (fieldErrors.newPassword && e.target.validity.valid) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        newPassword: false,
                      }));
                    }
                  }}
                  title="At least 8 characters, including uppercase, lowercase, and a number"
                />
              </label>

              {(fieldErrors.oldPassword || fieldErrors.newPassword) && (
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
                    Please enter valid passwords (min 8 chars with uppercase,
                    lowercase, and a number)
                  </span>
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
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              className="link link-primary"
              onClick={() => router.push("/profile/user")}
            >
              Back to Profile
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChangePasswordPage;
