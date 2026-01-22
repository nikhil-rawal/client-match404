import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingBars from "@/_components/loading-bars";
import UserCard from "@/_components/user-card";
import { FeedUser } from "@/_types/connection";
import { FEED_URL, SEND_CONNECTION_REQUEST_URL } from "@/constants";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const FeedContent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const [users, setUsers] = useState<FeedUser[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: currentPage,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [requestingUsers, setRequestingUsers] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        setError("");

        const apiUrl = new URL(FEED_URL);
        apiUrl.searchParams.set("page", currentPage.toString());
        apiUrl.searchParams.set("limit", "10");

        const response = await fetch(apiUrl.toString(), {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch feed");
        }

        const data = await response.json();
        setUsers(data.data.users || []);
        setPagination(data.data.pagination);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    navigate(`/user/feed?page=${newPage}`);
  };

  const handleConnectionRequest = async (
    userId: string,
    status: "interested" | "notInterested"
  ) => {
    try {
      setRequestingUsers((prev) => new Set(prev).add(userId));
      setError("");

      const url = SEND_CONNECTION_REQUEST_URL(status, userId);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send connection request");
      }

      // Remove user from feed on success
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setRequestingUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  if (isLoading) {
    return <LoadingBars />;
  }

  return (
    <>
      <main className="flex flex-col items-center mt-8 px-4 pb-8">
        <h1 className="text-3xl font-bold mb-2">Discover Users</h1>
        <p className="text-gray-600 mb-8">Browse and connect with new users</p>

        {error && (
          <div role="alert" className="alert alert-error mb-4 max-w-md w-full">
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

        {users.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg mb-4">
              No users available at the moment
            </p>
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline"
            >
              Go Home
            </button>
          </div>
        ) : (
          <>
            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
              {users.map((user) => (
                <div key={user._id}>
                  <UserCard user={user} />
                  <div className="flex items-center gap-4 justify-center mb-4">
                    <button
                      onClick={() =>
                        handleConnectionRequest(user._id, "interested")
                      }
                      disabled={requestingUsers.has(user._id)}
                      className="btn btn-primary"
                    >
                      {requestingUsers.has(user._id) ? "Sending..." : "Send"}
                    </button>
                    <button
                      onClick={() =>
                        handleConnectionRequest(user._id, "notInterested")
                      }
                      disabled={requestingUsers.has(user._id)}
                      className="btn btn-secondary"
                    >
                      {requestingUsers.has(user._id) ? "Sending..." : "Ignore"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex gap-2 mt-12 justify-center flex-wrap">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="btn btn-sm"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn btn-sm ${
                      pagination.page === page ? "btn-active" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="btn btn-sm"
                >
                  Next
                </button>
              </div>
            )}

            {/* Pagination Info */}
            <p className="text-gray-600 text-sm mt-6">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} users
            </p>
          </>
        )}
      </main>
    </>
  );
};

const FeedPage: React.FC = () => {
  return <FeedContent />;
};

export default FeedPage;
