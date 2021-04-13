/* 
  NavBar component with a logo and links
*/

import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";
import { Icon } from "react-bulma-components";

import useAnimatedNavToggler from "third-party/treact/helpers/useAnimatedNavToggler";

import logo from "images/logo.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { APP_NAME } from "lib/Config";
import { PropTypes } from "prop-types";
import AddTransaction from "components/dashboard/smart-components/AddEditTransactionModal";

/* Start styled components */

const Header = tw.header`sticky top-0 z-40 bg-white py-1 md:py-4 w-full shadow-xs`;

const HeaderContainer = tw.div`px-5 max-w-screen-2xl flex items-center justify-between mx-auto`;

const NavLinks = tw.div`inline-block`;

const NavLink = tw(Link)`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 text-black
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:text-primary-500
`;

const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hover:bg-primary-700 hover:text-gray-200
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

// Links component to display for guests
const GuestLinks = () => (
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/how-it-works">How it Works</NavLink>
    <NavLink to="/contact-us">Contact Us</NavLink>
    <SecondaryLink to="/dashboard">Log In</SecondaryLink>

    <PrimaryLink css={tw`rounded-full`} to="/register">
      Get Started
    </PrimaryLink>
  </>
);

// Links component to  display for logged users
const MemberLinks = ({ onAddTransactionClick }) => (
  <>
    <NavLink to="/dashboard">Dashboard</NavLink>
    <NavLink to="/transactions">Transactions</NavLink>
    <AddTransactionBtn css={tw`rounded-full`} onClick={onAddTransactionClick}>
      + Transaction
    </AddTransactionBtn>
    <UserContainer to="/account">
      <UserImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80" />
      <UserName to="/account">Enzo Vazquez</UserName>
      <Icon icon="angle-down" />
    </UserContainer>
  </>
);

MemberLinks.defaultProps = {
  onAddTransactionClick: null,
};

MemberLinks.propTypes = {
  onAddTransactionClick: PropTypes.func,
};

// Logo component to display
const DefaultLogoLink = (
  <LogoLink to="/">
    <img src={logo} alt="logo" />
    {APP_NAME}
  </LogoLink>
);

export default () => {
  const modalRef = React.useRef();
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap.lg;

  function handleAddTransactionClick() {
    toggleNavbar();
    modalRef.current.toggle();
  }

  const isLogged = true;

  const links = (
    <NavLinks>
      {isLogged ? (
        <>
          <MemberLinks onAddTransactionClick={handleAddTransactionClick} />
          <AddTransaction ref={modalRef} title="Add Transaction" />
        </>
      ) : (
        <GuestLinks />
      )}
    </NavLinks>
  );

  return (
    <Header className="header-light">
      <HeaderContainer>
        <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
          {DefaultLogoLink}
          {links}
        </DesktopNavLinks>
        <MobileNavLinksContainer
          css={collapseBreakpointCss.mobileNavLinksContainer}
        >
          {DefaultLogoLink}
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
              <CloseIcon tw="w-6 h-6 mt-5" />
            ) : (
              <MenuIcon tw="w-6 h-6" />
            )}
          </NavToggle>
        </MobileNavLinksContainer>
      </HeaderContainer>
    </Header>
  );
};
