"use client";
import React, { useEffect, useState } from "react";
import LoadingBars from "@/_components/loading-bars";
import UserCard from "@/_components/user-card";
import {
  RECEIVED_REQUESTS_URL,
  RECEIVE_CONNECTION_REQUEST_URL,
} from "@/constants";
import {
  ConnectionRequestWithSender,
  ReceivedRequestsResponse,
} from "@/_types/connection";

const ReceivedRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<ConnectionRequestWithSender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [responding, setResponding] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(RECEIVED_REQUESTS_URL, {
          method: "GET",
          credentials: "include",
        });
        const data: ReceivedRequestsResponse | any = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load received requests");
        }
        setRequests(data.data.requests || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReceived();
  }, []);

  const handleRespond = async (
    senderUserId: string,
    action: "accepted" | "rejected"
  ) => {
    try {
      setResponding((prev) => new Set(prev).add(senderUserId));
      setError("");

      const url = RECEIVE_CONNECTION_REQUEST_URL(action, senderUserId);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update request");
      }
      setRequests((prev) =>
        prev.filter((r) => r.senderUserId._id !== senderUserId)
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setResponding((prev) => {
        const next = new Set(prev);
        next.delete(senderUserId);
        return next;
      });
    }
  };

  if (isLoading) return <LoadingBars />;

  return (
    <main className="flex flex-col items-center mt-8 px-4 pb-8">
      <h1 className="text-3xl font-bold mb-2">Received Requests</h1>
      <p className="text-gray-600 mb-6">Connection requests sent to you</p>

      {error && (
        <div role="alert" className="alert alert-error mb-4 max-w-md w-full">
          <span>{error}</span>
        </div>
      )}

      {requests.length === 0 ? (
        <p className="text-gray-500 mt-8">No received requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-6 max-w-6xl w-full">
          {requests.map((req) => (
            <div key={req._id} className="flex flex-col gap-3">
              <UserCard user={req.senderUserId} />
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleRespond(req.senderUserId._id, "accepted")
                  }
                  disabled={responding.has(req.senderUserId._id)}
                  className="btn btn-success btn-sm flex-1"
                >
                  {responding.has(req.senderUserId._id)
                    ? "Processing..."
                    : "Accept"}
                </button>
                <button
                  onClick={() =>
                    handleRespond(req.senderUserId._id, "rejected")
                  }
                  disabled={responding.has(req.senderUserId._id)}
                  className="btn btn-error btn-sm flex-1"
                >
                  {responding.has(req.senderUserId._id)
                    ? "Processing..."
                    : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ReceivedRequestsPage;
