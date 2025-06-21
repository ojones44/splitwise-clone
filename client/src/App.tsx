import { BrowserRouter, Route, Routes } from "react-router";
import Account from "./pages/Account";
import Activity from "./pages/Activity";
import Friends from "./pages/Friends";
import Groups from "./pages/Groups";
import GroupSingle from "./pages/GroupSingle";
import GroupedLayout from "./pages/GroupedLayout";
import { AppProvider } from "./context/appContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GroupedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Groups />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/account" element={<Account />} />
          <Route path="groups/:groupId" element={<GroupSingle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function WrappedApp() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default WrappedApp;
