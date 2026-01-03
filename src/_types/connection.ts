import { User } from "./user";

export type ConnectionStatus =
  | "interested"
  | "notInterested"
  | "accepted"
  | "rejected";

export interface ConnectionRequest {
  _id: string;
  senderUserId: string;
  receiverUserId: string;
  status: ConnectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectionRequestWithReceiver
  extends Omit<ConnectionRequest, "receiverUserId"> {
  receiverUserId: User;
}

export interface ConnectionRequestWithSender
  extends Omit<ConnectionRequest, "senderUserId"> {
  senderUserId: User;
}

export interface ConnectionRequestWithBothUsers
  extends Omit<ConnectionRequest, "senderUserId" | "receiverUserId"> {
  senderUserId: User;
  receiverUserId: User;
}

export interface SentRequestsResponse {
  success: true;
  message: string;
  data: {
    requests: ConnectionRequestWithReceiver[];
  };
}

export interface ReceivedRequestsResponse {
  success: true;
  message: string;
  data: {
    requests: ConnectionRequestWithSender[];
  };
}

export interface ConnectionsResponse {
  success: true;
  message: string;
  data: {
    connections: ConnectionRequestWithBothUsers[];
  };
}

export type FeedUser = Pick<
  User,
  "_id" | "firstName" | "lastName" | "email" | "phone"
>;

export interface FeedResponse {
  success: true;
  message: string;
  data: {
    users: FeedUser[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SendConnectionRequestResponse {
  success: true;
  message: string;
  data: {
    currentUser: User;
    connectionRequest: {
      to: {
        user: User;
      };
    };
  };
}

export interface UpdateConnectionRequestResponse {
  success: true;
  message: string;
  data: {
    currentUser: User;
    connectionRequest: {
      to: {
        user: User;
      };
    };
  };
}

export interface SendConnectionRequestParams {
  status: "interested" | "notInterested";
  receiverUserId: string;
}

export interface UpdateConnectionRequestParams {
  status: "accepted" | "rejected";
  senderUserId: string;
}
