import React, { useEffect, useState } from 'react';
import { fetchLoginImage } from '../../services/LoginServices';
// import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import OTPVerificationForm from './OTPVerificationForm';
import SetNewPasswordForm from './SetNewPasswordForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const Login = () => {
  // const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [showSetNewPassword, setShowSetNewPassword] = useState(false);
  const [loginImage, setLoginImage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await fetchLoginImage();
        setLoginImage(imageUrl);
      } catch (error) {
        console.error('Failed to fetch login image:', error);
      }
    };
    fetchImage();
  }, []);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setShowOTPVerification(false);
    setShowSetNewPassword(false);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowOTPVerification(false);
    setShowSetNewPassword(false);
  };

  const handleOTPVerificationStep = () => {
    setShowForgotPassword(false);
    setShowOTPVerification(true);
    setShowSetNewPassword(false);
  };

  const handleSetNewPasswordStep = () => {
    setShowForgotPassword(false);
    setShowOTPVerification(false);
    setShowSetNewPassword(true);
  };

  const handleSuccessfulVerification = () => {
    setShowOTPVerification(false);
    setShowSetNewPassword(true);
  };

  return (
    <>
      <div className="container-fluid d-flex vh-100 align-items-center">
        <div className="login-image col-md-6 d-none d-md-block">
          <img src={loginImage} alt="Login" className="w-100 vh-100" />
        </div>
        <div className="login-form col-md-6 col-sm-12 d-flex justify-content-center align-items-center vh-100">
          {showForgotPassword && !showOTPVerification && !showSetNewPassword && (
            <ForgotPasswordForm
              handleBackToLogin={handleBackToLogin}
              handleOTPVerificationStep={handleOTPVerificationStep}
            />
          )}

          {showOTPVerification && !showSetNewPassword && (
            <OTPVerificationForm
              handleSetNewPasswordStep={handleSetNewPasswordStep}
              handleSuccessfulVerification={handleSuccessfulVerification}
            />
          )}

          {showSetNewPassword && (
            <SetNewPasswordForm handleBackToLogin={handleBackToLogin} />
          )}

          {!showForgotPassword && !showOTPVerification && !showSetNewPassword && (
            <LoginForm handleForgotPasswordClick={handleForgotPasswordClick} />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
