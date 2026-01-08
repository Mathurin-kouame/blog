import { createBrowserRouter } from "react-router-dom";
import App from './App.tsx'
import { Layout } from "./components/layout.tsx";
import { ArticleCreateForm } from "./pages/article-create.tsx";
import { ArticleUpdateForm } from "./pages/article-update.tsx";
import { ArticlePage } from "./pages/article.tsx";
import { Home } from "./pages/home.tsx";
import { Login } from "./pages/login.tsx";
import { Profile } from "./pages/profile.tsx";
import { Register } from "./pages/register.tsx";
import { Settings } from "./pages/settings.tsx";
import ProtectedRoute from "./utils/protected-route.tsx";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          },
          {
            path: "profile/:username",
            element: <Profile />
          },
          {
            path: "article/:slug",
            element: <ArticlePage />
          },
          {
            path: "settings",
            element: <ProtectedRoute children={<Settings />} />,
          },
          {
            path: "/editor",
            element: <ProtectedRoute children={<ArticleCreateForm />} />
          },
          {
            path: "/editor/:slug",
            element: <ProtectedRoute children={<ArticleUpdateForm />} />
          }
        ]
      }
    ]
  }
])

export default routes
