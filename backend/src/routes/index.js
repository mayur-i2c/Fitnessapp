// import { useRoutes } from 'react-router-dom';

// project import
// import LoginRoutes from './LoginRoutes';
// import MainRoutes from './MainRoutes';

import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const ForgotPassowrd = Loadable(lazy(() => import('pages/authentication/ForgotPassowrd')));
const ResetPassword = Loadable(lazy(() => import('pages/authentication/ResetPassword')));

import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Profile = Loadable(lazy(() => import('pages/profile/profile')));

const Users = Loadable(lazy(() => import('pages/users')));
const UserForm = Loadable(lazy(() => import('pages/users/userform')));

const MedicalCondition = Loadable(lazy(() => import('pages/settings/MedicalCondition')));
const MedicalConditionForm = Loadable(lazy(() => import('pages/settings/MedicalConditionForm')));

const Essentials = Loadable(lazy(() => import('pages/essentials')));
const EssentialsForm = Loadable(lazy(() => import('pages/essentials/EssentialsForm')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
// ==============================|| ROUTING RENDER ||============================== //
import { useUserState } from '../context/UserContext';

export default function ThemeRoutes() {
  // global
  const { isAuthenticated } = useUserState();

  const PublicRoute = () => {
    return isAuthenticated || Boolean(localStorage.getItem('token')) ? <Navigate to="/dashboard" /> : <MinimalLayout />;
  };

  const PrivateRoute = () => {
    return isAuthenticated || Boolean(localStorage.getItem('token')) ? <MainLayout /> : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
        <Route path="forgot-password" element={<ForgotPassowrd />} />
        <Route path="reset-password/:token/:userid" element={<ResetPassword />} />
      </Route>

      <Route path="/" element={<PrivateRoute />}>
        <Route path="users" element={<Users />} />
        <Route path="user/manage" element={<UserForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<DashboardDefault />} />
        <Route path="essentials" element={<Essentials />} />
        <Route path="essentials/manage" element={<EssentialsForm />} />
        <Route path="settings/medicalCondition" element={<MedicalCondition />} />
        <Route path="settings/medicalCondition/manage" element={<MedicalConditionForm />} />
        <Route path="color" element={<Color />} />
        <Route path="sample-page" element={<SamplePage />} />
        <Route path="shadow" element={<Shadow />} />
        <Route path="typography" element={<Typography />} />
        <Route path="icons/ant" element={<AntIcons />} />
      </Route>
    </Routes>
  );
}
