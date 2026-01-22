export const LOGIN_URL = "http://localhost:7777/login";
export const SIGNUP_URL = "http://localhost:7777/signup";
export const LOGOUT_URL = "http://localhost:7777/logout";

export const USER_PROFILE_URL = "http://localhost:7777/profile/user";
export const UPDATE_PROFILE_URL = "http://localhost:7777/profile/update";
export const CHANGE_PASSWORD_URL =
  "http://localhost:7777/profile/change-password";

export const FEED_URL = "http://localhost:7777/user/feed";

// Connection Request Routes (Dynamic)
export const SEND_CONNECTION_REQUEST_URL = (
  status: "interested" | "notInterested",
  userId: string,
) => `http://localhost:7777/connect/send/${status}/${userId}`;

export const RECEIVE_CONNECTION_REQUEST_URL = (
  status: "accepted" | "rejected",
  userId: string,
) => `http://localhost:7777/connect/receive/${status}/${userId}`;

// // // User Feed Routes
// // export const USER_FEED_URL = process.env.NEXT_PUBLIC_API_URL + "/user/feed";

// User Connection Routes
export const SENT_REQUESTS_URL = "http://localhost:7777/user/requests/sent";
export const RECEIVED_REQUESTS_URL =
  "http://localhost:7777/user/requests/received";
export const CONNECTIONS_URL =
  "http://localhost:7777/user/requests/connections";
