import React , {Suspense} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";

// Page Imports
import HomePage from "./pages/homepage/homepage";
import ExplorePage from "./pages/explore/explore";
import SubscriptionsPage from "./pages/subscriptions/subscriptions";
import WatchlistPage from "./pages/watchlist/watchlist";
import WatchPage from "./pages/watch/watch";
import UserPage from "./pages/user/user";
import AccountPage from "./pages/account/account";
import AdminPage from "./pages/admin/admin";
import CreatorStudioPage from "./pages/creator-studio/creator-studio";
import UploadPage from "./pages/upload/upload";

// Auth Pages
import LoginPage from "./pages/auth/login/login";
import RegisterPage from "./pages/auth/register/register";
import ForgotPasswordPage from "./pages/auth/forgot-password/forgot-password";

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Auth routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />

          {/* Main App Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="watch/:id" element={<WatchPage />} />
            <Route path="user/:userId" element={<UserPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="creator-studio" element={<CreatorStudioPage />} />
            <Route path="upload" element={<UploadPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
