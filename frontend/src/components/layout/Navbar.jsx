// TODO: Fix mobile nav menu X button not sticky

import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";
import { Icon } from "react-bulma-components";

import useAnimatedNavToggler from "treact/helpers/useAnimatedNavToggler";

import logo from "images/logo.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { APP_NAME } from "lib/Config";

/* Start styled components */

const Header = tw.header`
  flex items-center
  justify-between
  max-w-screen-2xl mx-auto
`;

const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
const NavLink = tw(Link)`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 text-black
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hocus:text-primary-500
`;

const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

const SecondaryLink = tw(NavLink)`
  border-primary-500
`;

const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
const MobileNavLinks = motion.custom(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 items-center justify-between
`;

const AddTransactionBtn = tw(PrimaryLink)`p-3 ml-2`;
const UserContainer = tw(NavLink)`flex inline`;
const UserImage = tw.img`w-8 h-8 rounded-full inline`;
const UserName = tw(NavLink)`ml-3 mr-1`;

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};

/* End styled components */

// Links component to display
const defaultLinks = (
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/how-it-works">How it Works</NavLink>
    <NavLink to="/contact-us">Contact Us</NavLink>
  </>
);

const guestLinks = (
  <>
    <SecondaryLink to="/dashboard">Log In</SecondaryLink>

    <PrimaryLink css={tw`rounded-full`} to="/register">
      Get Started
    </PrimaryLink>
  </>
);

const memberLinks = (
  <>
    <NavLink to="/dashboard">Dashboard</NavLink>
    <NavLink to="/transactions">Transactions</NavLink>
    <NavLink to="/analytics">Analytics</NavLink>
    <AddTransactionBtn css={tw`rounded-full`} to="/dashboard">
      + Transaction
    </AddTransactionBtn>
    <UserContainer to="/account">
      <UserImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80" />
      <UserName to="/account">Enzo Vazquez</UserName>
      <Icon icon="angle-down" />
    </UserContainer>
  </>
);

// Logo component to display
const defaultLogoLink = (
  <LogoLink to="/">
    <img src={logo} alt="logo" />
    {APP_NAME}
  </LogoLink>
);

export default () => {
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap.lg;

  const isLogged = true;

  const links = (
    <NavLinks onClick={toggleNavbar}>
      {isLogged ? memberLinks : [defaultLinks, guestLinks]}
    </NavLinks>
  );

  return (
    <Header className="header-light">
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {defaultLogoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer
        css={collapseBreakpointCss.mobileNavLinksContainer}
      >
        {defaultLogoLink}
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {links}
        </MobileNavLinks>
        <NavToggle
          onClick={toggleNavbar}
          className={showNavLinks ? "open" : "closed"}
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};
