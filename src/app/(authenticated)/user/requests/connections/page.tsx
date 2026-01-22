import React, { useEffect, useState } from "react";
import LoadingBars from "@/_components/loading-bars";
import UserCard from "@/_components/user-card";
import { CONNECTIONS_URL } from "@/constants";
import {
  ConnectionRequestWithBothUsers,
  ConnectionsResponse,
} from "@/_types/connection";
import { useAuthStore } from "@/_store/store";

const ConnectionsPage: React.FC = () => {
  const [connections, setConnections] = useState<
    ConnectionRequestWithBothUsers[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(CONNECTIONS_URL, {
          method: "GET",
          credentials: "include",
        });
        const data: ConnectionsResponse | any = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load connections");
        }
        setConnections(data.data.connections || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConnections();
  }, []);

  if (isLoading) return <LoadingBars />;

  return (
    <main className="flex flex-col items-center mt-8 px-4 pb-8">
      <h1 className="text-3xl font-bold mb-2">Connections</h1>
      <p className="text-gray-600 mb-6">People you've connected with</p>

      {error && (
        <div role="alert" className="alert alert-error mb-4 max-w-md w-full">
          <span>{error}</span>
        </div>
      )}

      {connections.length === 0 ? (
        <p className="text-gray-500 mt-8">No connections yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {connections.map((conn) => {
            const counterpart =
              user && conn.senderUserId._id === user._id
                ? conn.receiverUserId
                : conn.senderUserId;
            return (
              <div key={conn._id} className="flex flex-col gap-2">
                <UserCard user={counterpart} />
                <div className="text-xs text-gray-500">
                  Connected with {counterpart.firstName}{" "}
                  {counterpart.lastName || ""}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default ConnectionsPage;
