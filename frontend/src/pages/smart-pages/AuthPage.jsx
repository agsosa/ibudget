/* 
  Smart component (interacting with Auth)

  Login & Register page

  Usage:
    <AuthPage />

  Props:
    isRegister: boolean. True to indicate if the page should be register. Default: false (login)
*/

import * as React from "react";
import { Container as ContainerBase } from "third-party/treact/components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import googleIconImageSrc from "third-party/treact/images/google-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { APP_NAME } from "lib/Config";
import { Link, useHistory } from "react-router-dom";
import { Limits } from "ibudget-shared";
import { useAuth } from "lib/Auth";
import { useDispatch } from "react-redux";
import { NotificationTypeEnum } from "lib/Enums";
import CloudLoadingIndicator from "components/misc/CloudLoadingIndicator";
import { PropTypes } from "prop-types";
import { isValidEmail } from "lib/Helpers";

/* Start styled components */

const Container = tw(
  ContainerBase
)` text-white font-medium flex justify-center`;
const Content = tw.div`w-screen pb-40 pt-0 bg-white text-gray-900 flex justify-center`;
const MainContainer = tw.div`w-10/12 max-w-lg p-6 sm:p-4`;
const MainContent = tw.div`mt-6 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full mt-8 mx-auto flex flex-col items-center`;

const SocialButtonsContainer = tw.div`flex flex-col items-center w-full`;
const SocialButton = styled.button`
  ${tw`w-full font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b border-gray-300 w-full text-center`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border
 border-gray-200 placeholder-gray-500 text-sm 
 focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 
  w-full py-4 rounded-lg hover:bg-primary-700 transition-all 
  duration-300 ease-in-out flex items-center justify-center 
  focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const ErrorText = tw.text`text-sm md:text-base text-red-500 font-bold text-center`;

/* End styled components */

function AuthContainer({ children }) {
  return (
    <Container>
      <Content>
        <MainContainer>
          <MainContent>{children}</MainContent>
        </MainContainer>
      </Content>
    </Container>
  );
}

AuthContainer.defaultProps = {
  children: null,
};

AuthContainer.propTypes = {
  children: PropTypes.node,
};

function AuthPage({ isRegister }) {
  // State/hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  const registerForm = (
    <>
      <Input
        disabled={loading}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        maxLength={Limits.USER_NICK_MAX_CHARS}
        placeholder={`Name (min ${Limits.USER_NICK_MIN_CHARS} characters)`}
      />
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        type="email"
        maxLength={Limits.USER_EMAIL_MAX_CHARS}
        placeholder="Email"
      />
      <Input
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={Limits.PASSWORD_MAX_CHARS}
        value={password}
        type="password"
        placeholder={`Password (min ${Limits.PASSWORD_MIN_CHARS} characters)`}
      />
      <Input
        disabled={loading}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
    </>
  );

  const loginForm = (
    <>
      <Input
        type="email"
        disabled={loading}
        value={username}
        maxLength={Limits.USER_EMAIL_MAX_CHARS}
        placeholder="Email"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={loading}
        value={password}
        onInput={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
    </>
  );

  // Components shown below the submit button
  const registerBottomLinks = (
    <>
      <p tw="mt-6 text-xs text-gray-600 text-center">
        I agree to abide by {APP_NAME}'s{" "}
        <Link
          to="/terms-of-service"
          tw="border-b border-gray-500 border-dotted"
        >
          Terms of Service
        </Link>{" "}
        and its{" "}
        <Link to="/privacy-policy" tw="border-b border-gray-500 border-dotted">
          Privacy Policy
        </Link>
      </p>

      <p tw="mt-8 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link to="/login" tw="border-b border-gray-500 border-dotted">
          Sign In
        </Link>
      </p>
    </>
  );

  const loginBottomLinks = (
    <>
      {/* TODO: Implement forgot password button */}
      <p tw="mt-8 text-sm text-gray-600 text-center">
        Dont have an account?{" "}
        <Link to="/register" tw="border-b border-gray-500 border-dotted">
          Sign Up
        </Link>
      </p>
    </>
  );

  // Config to customize the page with isRegister prop
  const config = {
    heading: isRegister ? "Sign Up" : "Sign In to iBudget",
    actionLabel: isRegister ? "Sign up" : "Sign in",
    bottomLinks: isRegister ? registerBottomLinks : loginBottomLinks,
    form: isRegister ? registerForm : loginForm,
    iconComponent: isRegister ? (
      <SignUpIcon className="icon" />
    ) : (
      <LoginIcon className="icon" />
    ),
  };

  // Clear error status on input
  React.useEffect(() => {
    if (errorText) setErrorText("");
  }, [username, password]);

  // On submit button click handler for props.isRegister
  function onRegisterClick() {
    // Validate form (it will be validated server-side aswell)

    if (!name || name.length < Limits.USER_NICK_MIN_CHARS) {
      setErrorText("Please type a correct name");
      return;
    }

    if (!username || !isValidEmail(username)) {
      setErrorText("Please type a valid email address");
      return;
    }

    if (
      !password ||
      password.length < Limits.PASSWORD_MIN_CHARS ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      setErrorText("Please confirm your password");
      return;
    }

    // Request create user
    setLoading(true);
    auth
      .signUp(username, password, { name })
      .then((result) => {
        if (!result.error) history.push("/dashboard");
        else if (result.message && result.message === "USERNAME_TAKEN")
          setErrorText("This email is already registered.");
        else if (result.message && result.message.includes("ValidationError")) {
          setErrorText(
            "One or more fields have an error. Please check and try again."
          );
        } else
          dispatch({
            type: "NotificationsQueueModel/pushNotification",
            payload: {
              type: NotificationTypeEnum.ERROR,
              message: "An error occurred while registering",
            },
          });
      })
      .finally(() => setLoading(false));
  }

  // On submit button click for !props.isRegister
  function onLoginClick() {
    // Validate form
    const isValidForm =
      username &&
      isValidEmail(username) &&
      password &&
      password.length >= Limits.PASSWORD_MIN_CHARS;

    if (!isValidForm) {
      setErrorText("Please type a valid email and password");
      return;
    }

    // Request session
    setLoading(true);
    auth
      .signIn(username, password)
      .then((result) => {
        if (!result.error) history.push("/dashboard");
        else if (result.message && result.message === "WRONG_CREDENTIALS")
          setErrorText("Invalid email or password");
        else
          dispatch({
            type: "NotificationsQueueModel/pushNotification",
            payload: {
              type: NotificationTypeEnum.ERROR,
              message: "An error occurred while logging in",
            },
          });
      })
      .finally(() => setLoading(false));
  }

  // On login submit button click
  function onSubmitButtonClick() {
    if (isRegister) onRegisterClick();
    else onLoginClick();
  }

  // On auth with google click
  function onGoogleButtonClick() {
    console.log("onGoogleButtonClick");
  }

  return (
    <AuthContainer>
      {/* Header */}
      <Heading>{config.heading}</Heading>

      <FormContainer>
        <SocialButtonsContainer>
          {/* Google auth button */}
          <SocialButton onClick={onGoogleButtonClick}>
            <span className="iconContainer">
              <img src={googleIconImageSrc} className="icon" alt="" />
            </span>
            <span className="text">{config.actionLabel} with Google</span>
          </SocialButton>
        </SocialButtonsContainer>
        <DividerTextContainer />
        {errorText ? (
          <ErrorText>{errorText}</ErrorText>
        ) : (
          `Or ${config.actionLabel} with email`
        )}
        {/* Form */}
        <FormContainer>
          {config.form}
          {loading ? (
            <CloudLoadingIndicator download isOverlay />
          ) : (
            <SubmitButton type="button" onClick={onSubmitButtonClick}>
              {config.iconComponent}
              <span className="text">{config.actionLabel}</span>
            </SubmitButton>
          )}
          {config.bottomLinks}
        </FormContainer>
      </FormContainer>
    </AuthContainer>
  );
}

AuthPage.defaultProps = {
  isRegister: false,
};

AuthPage.propTypes = {
  isRegister: PropTypes.bool,
};

export default AuthPage;
