/* eslint-disable */
import * as React from "react";
import { Container as ContainerBase } from "third-party/treact/components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import googleIconImageSrc from "third-party/treact/images/google-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { APP_NAME } from "lib/Config";
import { Link } from "react-router-dom";
import { Limits } from "ibudget-shared";
import { useAuth } from "lib/Auth";

/* Start styled components */

const Container = tw(
  ContainerBase
)` text-white font-medium flex justify-center`;
const Content = tw.div`w-screen pb-40 pt-0 bg-white text-gray-900 flex justify-center`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-4`;
const MainContent = tw.div`mt-6 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8 mx-auto max-w-md`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.button`
  ${tw`w-full max-w-md font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
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

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
//const FormContainer = tw.div`mx-auto max-w-md`;
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

/* End styled components */

function AuthContainer({ children }) {
  return (
    <Container>
      <Content>
        <MainContainer>
          <MainContent> {children}</MainContent>
        </MainContainer>
      </Content>
    </Container>
  );
}

export function RegisterPage() {
  // On register submit button
  function onSubmitButtonClick() {
    console.log("onSubmitButtonClick");
  }

  // On register with google click
  function onGoogleButtonClick() {
    console.log("onGoogleButtonClick");
  }

  const ExtraLinks = (
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

  return (
    <AuthContainer>
      {/* Header */}
      <Heading>Sign Up</Heading>
      <FormContainer>
        <SocialButtonsContainer>
          {/* Google auth button */}
          <SocialButton onClick={onGoogleButtonClick}>
            <span className="iconContainer">
              <img src={googleIconImageSrc} className="icon" alt="" />
            </span>
            <span className="text">Sign up with Google</span>
          </SocialButton>
        </SocialButtonsContainer>
        <DividerTextContainer />
        {/* Form */}
        <FormContainer>
          <Input
            type="text"
            maxLength={Limits.USER_NICK_MAX_CHARS}
            placeholder="Name"
          />
          <Input
            type="email"
            maxLength={Limits.USER_EMAIL_MAX_CHARS}
            placeholder="Email"
          />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
          <SubmitButton type="button" onClick={onSubmitButtonClick}>
            <SignUpIcon className="icon" />
            <span className="text">Sign Up</span>
          </SubmitButton>

          {ExtraLinks}
        </FormContainer>
      </FormContainer>
    </AuthContainer>
  );
}

export function LoginPage() {
  const auth = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // On login submit button click
  function onSubmitButtonClick() {
    console.log("onSubmitButtonClick", username, password);
    auth.signIn(username, password).then((result) => {
      console.log(result);
    });
  }

  // On login with google click
  function onGoogleButtonClick() {
    console.log("onGoogleButtonClick");
  }

  const ExtraLinks = (
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

  return (
    <AuthContainer>
      {/* Header */}
      <Heading>Sign in to iBudget</Heading>
      <FormContainer>
        <SocialButtonsContainer>
          {/* Google auth button */}
          <SocialButton onClick={onGoogleButtonClick}>
            <span className="iconContainer">
              <img src={googleIconImageSrc} className="icon" alt="" />
            </span>
            <span className="text">Sign in with Google</span>
          </SocialButton>
        </SocialButtonsContainer>
        <DividerTextContainer />
        {/* Form */}
        <FormContainer>
          <Input
            type="email"
            value={username}
            maxLength={Limits.USER_EMAIL_MAX_CHARS}
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <SubmitButton type="button" onClick={onSubmitButtonClick}>
            <LoginIcon className="icon" />
            <span className="text">Sign In</span>
          </SubmitButton>

          {ExtraLinks}
        </FormContainer>
      </FormContainer>
    </AuthContainer>
  );
}
