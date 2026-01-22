import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './app/auth-layout';
import HomePage from './app/page';
import LoginPage from './app/(auth)/login/page';
import SignupPage from './app/(auth)/signup/page';
import FeedPage from './app/(authenticated)/user/feed/page';
import ProfilePage from './app/(authenticated)/profile/user/page';
import UpdateProfilePage from './app/(authenticated)/profile/update/page';
import ChangePasswordPage from './app/(authenticated)/profile/change-password/page';
import SentRequestsPage from './app/(authenticated)/user/requests/sent/page';
import ReceivedRequestsPage from './app/(authenticated)/user/requests/received/page';
import ConnectionsPage from './app/(authenticated)/user/requests/connections/page';

function App() {
  return (
    <BrowserRouter>
      <AuthLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user/feed" element={<FeedPage />} />
          <Route path="/profile/user" element={<ProfilePage />} />
          <Route path="/profile/update" element={<UpdateProfilePage />} />
          <Route path="/profile/change-password" element={<ChangePasswordPage />} />
          <Route path="/user/requests/sent" element={<SentRequestsPage />} />
          <Route path="/user/requests/received" element={<ReceivedRequestsPage />} />
          <Route path="/user/requests/connections" element={<ConnectionsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthLayout>
    </BrowserRouter>
  );
}

export default App;
