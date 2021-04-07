/*
  Simple footer component with dark background, links, logo and copyright.
*/

// TODO: Remove hard coded links. Update hard coded copyright year.

import React from "react";
import tw from "twin.macro";
import { Container as ContainerBase } from "treact/components/misc/Layouts";
import logo from "treact/images/logo.svg";
import { APP_NAME } from "lib/Config";
import { Link } from "react-router-dom";

/* Start styled components */

const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`;
const LinkStyle = tw(
  Link
)`text-white border-b-2 border-transparent hocus:text-primary-400 hocus:border-primary-500 pb-1 transition duration-300 mt-2 mx-4`;

const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`;

/* End styled components */

export default () => {
  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src={logo} />
            <LogoText>{APP_NAME}</LogoText>
          </LogoContainer>

          <LinksContainer>
            <LinkStyle to="/">Home</LinkStyle>

            <LinkStyle to="/how-it-works">How it Works</LinkStyle>

            <LinkStyle to="/contact-us">Contact Us</LinkStyle>

            <LinkStyle to="/privacy-policy">Privacy Policy</LinkStyle>

            <LinkStyle to="/terms-of-service">Terms of Service</LinkStyle>
          </LinksContainer>

          <CopyrightText>
            &copy; Copyright 2021, {APP_NAME}. All Rights Reserved.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  );
};
