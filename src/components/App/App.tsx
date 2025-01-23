import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MainPage from "../../pages/MainPage/MainPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { getIngredientsThunks } from "../../services/thunks.js/thunks";
import { getUserData } from "../../utils/api";
import OrderFeed from "../OrderFeed/OrderFeed";
import Profile from "../Profile/Profile";
import OrderHistory from "../OrderHistory/OrderHistory";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute";

function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredientsThunks());

    // @ts-ignore
    dispatch(getUserData());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const modalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />

        <div className={styles.appMain}>
          <Routes location={background || location}>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute onlyUnAuth={true}>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute onlyUnAuth={true}>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute onlyUnAuth={true}>
                  <ForgotPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute onlyUnAuth={true}>
                  <ResetPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              <Route index element={<Profile />} />
              <Route path="order" element={<OrderHistory />} />
            </Route>
            <Route path="/order" element={<OrderFeed />} />
            <Route
              path="/ingredients/:idModal"
              element={
                <div className={`pt-30`}>
                  <IngredientDetails />
                </div>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>

          {background ? (
            <Routes>
              <Route
                path="/ingredients/:idModal"
                element={
                  <Modal header="Детали ингредиента" onClose={modalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
