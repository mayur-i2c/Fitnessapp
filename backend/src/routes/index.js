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
const UserInsights = Loadable(lazy(() => import('pages/users/insights')));

const MedicalCondition = Loadable(lazy(() => import('pages/settings/MedicalCondition')));
const MedicalConditionForm = Loadable(lazy(() => import('pages/settings/MedicalConditionForm')));
const TCForm = Loadable(lazy(() => import('pages/settings/TCForm')));
const PrivacyPolicyForm = Loadable(lazy(() => import('pages/settings/PrivacyPolicyForm')));
const GeneralSettingForm = Loadable(lazy(() => import('pages/settings/GeneralSettingForm')));
const Faq = Loadable(lazy(() => import('pages/settings/Faq')));
const FaqForm = Loadable(lazy(() => import('pages/settings/FaqForm')));
const NutritionSettingForm = Loadable(lazy(() => import('pages/settings/NutritionSettingForm')));
const MealSettingForm = Loadable(lazy(() => import('pages/settings/MealSettingForm')));
const RecipeUnits = Loadable(lazy(() => import('pages/settings/RecipeUnits')));
const RecipeUnitsForm = Loadable(lazy(() => import('pages/settings/RecipeUnitsForm')));
const HelpCenter = Loadable(lazy(() => import('pages/settings/HelpCenter')));

const Essentials = Loadable(lazy(() => import('pages/essentials')));
const EssentialsForm = Loadable(lazy(() => import('pages/essentials/EssentialsForm')));
const EssSubCatLevel1 = Loadable(lazy(() => import('pages/essentials/EssSubCatLevel1')));
const EssSubCatLevel1Form = Loadable(lazy(() => import('pages/essentials/EssSubCatLevel1Form')));
const EssSubCatLevel2 = Loadable(lazy(() => import('pages/essentials/EssSubCatLevel2')));
const EssSubCatLevel2Form = Loadable(lazy(() => import('pages/essentials/EssSubCatLevel2Form')));

const Reel = Loadable(lazy(() => import('pages/reel')));
const ReelForm = Loadable(lazy(() => import('pages/reel/ReelForm')));

const Recipes = Loadable(lazy(() => import('pages/recipes')));
const RecipesForm = Loadable(lazy(() => import('pages/recipes/RecipesForm')));
const RecipesSubcat = Loadable(lazy(() => import('pages/recipes/RecipesSubcat')));
const RecipesSubcatForm = Loadable(lazy(() => import('pages/recipes/RecipesSubcatForm')));

const WorkoutCollection = Loadable(lazy(() => import('pages/workoutCollection')));
const WorkoutCollectionForm = Loadable(lazy(() => import('pages/workoutCollection/WorkoutCollectionForm')));

const ExerciseLibrary = Loadable(lazy(() => import('pages/exerciseLibrary')));
const ExerciseLibraryForm = Loadable(lazy(() => import('pages/exerciseLibrary/ExerciseLibraryForm')));

const Notifications = Loadable(lazy(() => import('pages/settings/Notifications')));
const NotificationForm = Loadable(lazy(() => import('pages/settings/NotificationForm')));
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
        <Route path="user/insights" element={<UserInsights />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<DashboardDefault />} />
        <Route path="essentials" element={<Essentials />} />
        <Route path="essentials/manage" element={<EssentialsForm />} />
        <Route path="essentials/esssubcatlevel1" element={<EssSubCatLevel1 />} />
        <Route path="essentials/esssubcatlevel1/manage" element={<EssSubCatLevel1Form />} />
        <Route path="essentials/esssubcatlevel2" element={<EssSubCatLevel2 />} />
        <Route path="essentials/esssubcatlevel2/manage" element={<EssSubCatLevel2Form />} />
        <Route path="reels" element={<Reel />} />
        <Route path="reels/manage" element={<ReelForm />} />
        <Route path="exeLibrary" element={<ExerciseLibrary />} />
        <Route path="exeLibrary/manage" element={<ExerciseLibraryForm />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/manage" element={<RecipesForm />} />
        <Route path="recipes/recipessubcat" element={<RecipesSubcat />} />
        <Route path="recipes/recipessubcat/manage" element={<RecipesSubcatForm />} />
        <Route path="settings/medicalCondition" element={<MedicalCondition />} />
        <Route path="settings/medicalCondition/manage" element={<MedicalConditionForm />} />
        <Route path="settings/tc/manage" element={<TCForm />} />
        <Route path="settings/privacyPolicy/manage" element={<PrivacyPolicyForm />} />
        <Route path="settings/generalSettings/manage" element={<GeneralSettingForm />} />
        <Route path="settings/faq" element={<Faq />} />
        <Route path="settings/faq/manage" element={<FaqForm />} />
        <Route path="workoutCollection" element={<WorkoutCollection />} />
        <Route path="workoutCollection/manage" element={<WorkoutCollectionForm />} />
        <Route path="settings/nutritionSettings/manage" element={<NutritionSettingForm />} />
        <Route path="settings/mealSettings/manage" element={<MealSettingForm />} />
        <Route path="settings/recipeUnits" element={<RecipeUnits />} />
        <Route path="settings/recipeUnits/manage" element={<RecipeUnitsForm />} />
        <Route path="settings/helpcenter" element={<HelpCenter />} />

        <Route path="settings/notifications" element={<Notifications />} />
        <Route path="settings/notifications/manage" element={<NotificationForm />} />
      </Route>
    </Routes>
  );
}
