// React imports
import { Navigate, useNavigate } from "react-router-dom";

// State import
import { useAppContext } from "../context/appContext";
import { useValidate } from "../hooks/useValidate";
import { useAuthStore } from "../context/useAuthStore";
import axios from "axios";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  const { setUser } = useAuthStore();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/auth/validate",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Not Authenticated. Redirecting to login page");
        }

        const { user } = response.data;

        setUser({
          id: user._id,
          email: user.email,
          name: user.name,
        });

        // navigate("/");
        // return <Navigate to={route} />;
        // return children;
      } catch (error) {
        console.error(error);
        navigate("/login");
        // return <Navigate to="/login" />;
      }
    };

    isAuthenticated();
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
