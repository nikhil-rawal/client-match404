import { useEffect } from "react";
import { useAuthStore } from "@/_store/store";
import NavBar from "@/_components/nav-bar";
import Footer from "@/_components/footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Only fetch if user is not in store (e.g., on page refresh)
    if (user === null) {
      fetch(`http://localhost:7777/profile/user`, {
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return null;
        })
        .then((data) => {
          if (data?.success && data.data?.user) {
            setUser(data.data.user);
          }
        })
        .catch(() => {
          // Silently fail - user is not authenticated
        });
    }
  }, [user, setUser]);

  return (
    <>
      {user !== null && <NavBar />}
      {children}
      {user !== null && <Footer />}
    </>
  );
}
