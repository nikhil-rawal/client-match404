import React, { useEffect, useState } from "react";
import LoadingBars from "@/_components/loading-bars";
import UserCard from "@/_components/user-card";
import { SENT_REQUESTS_URL } from "@/constants";
import {
  ConnectionRequestWithReceiver,
  SentRequestsResponse,
} from "@/_types/connection";

const SentRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<ConnectionRequestWithReceiver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSent = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(SENT_REQUESTS_URL, {
          method: "GET",
          credentials: "include",
        });
        const data: SentRequestsResponse | any = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load sent requests");
        }
        setRequests(data.data.requests || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSent();
  }, []);

  if (isLoading) return <LoadingBars />;

  return (
    <main className="flex flex-col items-center mt-8 px-4 pb-8">
      <h1 className="text-3xl font-bold mb-2">Sent Requests</h1>
      <p className="text-gray-600 mb-6">
        People you've sent connection requests to
      </p>

      {error && (
        <div role="alert" className="alert alert-error mb-4 max-w-md w-full">
          <span>{error}</span>
        </div>
      )}

      {requests.length === 0 ? (
        <p className="text-gray-500 mt-8">No sent requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {requests.map((req) => (
            <div key={req._id} className="flex flex-col gap-3">
              <UserCard user={req.receiverUserId} />
              <div className="text-sm text-gray-600">Status: interested</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default SentRequestsPage;
