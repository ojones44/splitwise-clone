import { Outlet } from "react-router";
import SplitwiseNavbar from "../components/SplitwiseNavbar";
import AddExpense from "../components/AddExpense";
import { useAuthStore } from "../context/useAuthStore";

const GroupedLayout = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <SplitwiseNavbar />
      <section>
        <Outlet />
      </section>
      <AddExpense />
    </main>
  );
};
export default GroupedLayout;
