import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import Analytics from "./pages/analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Go to{" "}
        <em>
          <Link to="/analytics">/analytics</Link>
        </em>
      </div>
    ),
  },
  {
    path: "/analytics/*",
    element: <Analytics />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
