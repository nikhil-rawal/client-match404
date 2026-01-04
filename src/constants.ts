export const LOGIN_URL = process.env.NEXT_PUBLIC_API_URL + "/login";
export const SIGNUP_URL = process.env.NEXT_PUBLIC_API_URL + "/signup";
export const LOGOUT_URL = process.env.NEXT_PUBLIC_API_URL + "/logout";

export const USER_PROFILE_URL =
  process.env.NEXT_PUBLIC_API_URL + "/profile/user";
export const UPDATE_PROFILE_URL =
  process.env.NEXT_PUBLIC_API_URL + "/profile/update";
export const CHANGE_PASSWORD_URL =
  process.env.NEXT_PUBLIC_API_URL + "/profile/change-password";

export const FEED_URL = process.env.NEXT_PUBLIC_API_URL + "/user/feed";

// Connection Request Routes (Dynamic)
export const SEND_CONNECTION_REQUEST_URL = (
  status: "interested" | "notInterested",
  userId: string
) => `${process.env.NEXT_PUBLIC_API_URL}/connect/send/${status}/${userId}`;

export const RECEIVE_CONNECTION_REQUEST_URL = (
  status: "accepted" | "rejected",
  userId: string
) => `${process.env.NEXT_PUBLIC_API_URL}/connect/receive/${status}/${userId}`;

// // // User Feed Routes
// // export const USER_FEED_URL = process.env.NEXT_PUBLIC_API_URL + "/user/feed";

// User Connection Routes
export const SENT_REQUESTS_URL =
  process.env.NEXT_PUBLIC_API_URL + "/user/requests/sent";
export const RECEIVED_REQUESTS_URL =
  process.env.NEXT_PUBLIC_API_URL + "/user/requests/received";
export const CONNECTIONS_URL =
  process.env.NEXT_PUBLIC_API_URL + "/user/requests/connections";
