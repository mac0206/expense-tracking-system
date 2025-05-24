import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Login from "./login";
import LoginLayout from "./layouts/LoginLayout";
import Dashboard from "./components/Dashboard";
import Signup from "./Signup";
import AddExpenses from "./pages/AddExpenses";
import ExpensesList from "./pages/MyExpenses";
import Home from "./pages/Home";
import EditExpense from "./pages/EditExpenses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/page",
    element: <LoginLayout />,
    children: [
      {
        path: "/page/addexpenses",
        element: <AddExpenses />,
      },
      {
        path: "/page/myexpenses",
        element: <ExpensesList />,
      },
      {
        path: "/page",
        element: <Home />,
      },
      {
        path: "/page/editexpenses/:id",
        element: <EditExpense />,
      },
    ],
  },
]);

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
