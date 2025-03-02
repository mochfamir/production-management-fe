import React from "react";
import { Refine } from "@refinedev/core";
import { Authenticated, AuthProvider } from "@refinedev/core";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { WorkOrderList } from "./pages/WorkOrders/List";
import { WorkOrderCreate } from "./pages/WorkOrders/Create";
import { WorkOrderEdit } from "./pages/WorkOrders/Edit";
import { Home, Layout } from "./components";
import { dataProvider } from "./providers/dataProvider";
import axiosInstance from "./utils/axios";

const App: React.FC = () => {
  const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
      localStorage.setItem("token", "dummy-token");
      return { success: true };
    },
    logout: async () => {
      localStorage.removeItem("token");
      return { success: true };
    },
    check: async () => {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/auth/verify");
      const user = response.data?.user;

      if (token) localStorage.setItem("token", token);
      if (user?.role) localStorage.setItem("role", user?.role);

      return { authenticated: !!user.userId };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
  };

  return (
    <BrowserRouter>
      <Refine
        authProvider={authProvider}
        dataProvider={dataProvider}
        resources={[
          {
            name: "work-orders",
            list: WorkOrderList,
            create: WorkOrderCreate,
            edit: WorkOrderEdit,
          },
        ]}
      >
        <Routes>
          {/* Rute yang memerlukan autentikasi */}
          <Route
            path="/"
            element={
              <Authenticated key="auth" fallback={<Navigate to="/login" />}>
                <Layout />
              </Authenticated>
            }
          >
            {/* Rute anak di dalam Layout */}
            <Route index element={<Home />} />
            <Route path="work-orders" element={<WorkOrderList />} />
            <Route path="work-orders/create" element={<WorkOrderCreate />} />
            <Route path="work-orders/edit/:id" element={<WorkOrderEdit />} />
          </Route>

          {/* Rute publik */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
