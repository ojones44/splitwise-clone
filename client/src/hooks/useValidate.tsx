import axios from "axios";
import { Navigate } from "react-router";
import { useAuthStore } from "../context/useAuthStore";

export const useValidate = (children: React.ReactNode) => {
  // const navigate = useNavigate();

  const { setUser } = useAuthStore();

  const token = localStorage.getItem("token");

  if (!token) {
    // navigate("/login");
    return <Navigate to="/login" />;
  }

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

      // return <Navigate to={route} />;
      return children;
    } catch (error) {
      console.error(error);
      return <Navigate to="/login" />;
    }
  };

  isAuthenticated();
};
