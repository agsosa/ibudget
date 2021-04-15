/* 
  NavBar component with a logo and links
*/

import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link, useLocation } from "react-router-dom";
import useAnimatedNavToggler from "third-party/treact/helpers/useAnimatedNavToggler";
import logo from "images/logo.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import DefaultAvatar from "images/default_avatar.svg";
import { APP_NAME } from "lib/Config";
import { PropTypes } from "prop-types";
import AddEditTransactionModal from "components/smart-components/AddEditTransactionModal";
import { useAuth } from "lib/Auth";
import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { confirmAlert } from "react-confirm-alert";

/* Start styled components */

const Header = tw.header`sticky top-0 z-40 bg-white py-1 md:py-4 w-full shadow-xs`;

const HeaderContainer = tw.div`px-5 max-w-screen-2xl flex items-center justify-between mx-auto`;

const NavLinks = tw.div`flex flex-row items-baseline`;

const NavLink = tw(Link)`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 text-black
  font-semibold tracking-wide transition duration-300
  pb-1 hover:text-primary-500
`;

const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hover:bg-primary-700 hover:text-gray-200
`;

const SecondaryLink = tw(NavLink)`
  border-primary-400 border-b-2
`;

const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black text-2xl! ml-0!`};

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

const UserContainer = tw.div`
cursor-pointer
text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 pb-1 
 text-black font-semibold
inline-flex self-center items-center align-middle mt-5 lg:mt-0 relative`; // inline
const UserImage = tw.img`w-8 h-8 rounded-full`;
const UserName = tw.text`ml-3 mr-1`;
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

const AccountDropdown = tw.div`cursor-pointer absolute lg:right-0 w-56 justify-center flex mt-24 bg-white rounded-md overflow-hidden shadow-xl z-20`;
const AccountDropdownItem = tw.text`block px-4 py-2 text-base text-gray-800 border-b hover:text-primary-500`;

/* End styled components */

// Links component to display for guests
const GuestLinks = () => (
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/how-it-works">How it Works</NavLink>
    <NavLink to="/contact-us">Contact Us</NavLink>
    <SecondaryLink to="/login">Log In</SecondaryLink>

    <PrimaryLink css={tw`rounded-full`} to="/register">
      Get Started
    </PrimaryLink>
  </>
);

// Links component to  display for logged users
const MemberLinks = ({ onAddTransactionClick, auth }) => {
  const [dropdownOpen, setDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);

  function toggleDropdown() {
    setDropdown(!dropdownOpen);
  }

  // Called on logout button click
  function handleLogoutClick() {
    confirmAlert({
      title: "Cerrar sesión",
      message: "¿Estás seguro de cerrar sesión?",
      buttons: [
        {
          label: "Confirmar",
          onClick: () => {
            auth.signOut();
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  }

  // Close dropdown on click outside
  function handleClickOutside(event) {
    if (
      dropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      toggleDropdown();
    }
  }

  // Register click event to close the dropdown on click outside
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]); // Add isDropdownOpen as dependency to re-register listener on state update

  return (
    <>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
      <AddTransactionBtn css={tw`rounded-full`} onClick={onAddTransactionClick}>
        + Transaction
      </AddTransactionBtn>
      <UserContainer onClick={toggleDropdown}>
        <UserImage src={DefaultAvatar} />
        <UserName>{auth.user.name || "Mi cuenta"}</UserName>
        <Icon path={mdiDotsVertical} size={0.85} />
        {dropdownOpen && (
          <AccountDropdown ref={dropdownRef}>
            <AccountDropdownItem onClick={handleLogoutClick}>
              Cerrar Sesión
            </AccountDropdownItem>
          </AccountDropdown>
        )}
      </UserContainer>
    </>
  );
};

MemberLinks.defaultProps = {
  onAddTransactionClick: null,
  auth: null,
};

MemberLinks.propTypes = {
  onAddTransactionClick: PropTypes.func,
  auth: PropTypes.object,
};

// Logo component to display
const DefaultLogoLink = (
  <LogoLink to="/">
    <img src={logo} alt="logo" />
    {APP_NAME}
  </LogoLink>
);

export default () => {
  const location = useLocation();
  const addTransactionModalRef = React.useRef();
  const auth = useAuth();
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap.lg;

  function handleAddTransactionClick() {
    addTransactionModalRef.current.toggle();
  }

  // Auto close mobile navbar on route change
  React.useEffect(() => {
    toggleNavbar();
  }, [location]);

  const links = (
    <NavLinks>
      {auth.getIsLoggedIn() ? (
        <>
          <MemberLinks
            onAddTransactionClick={handleAddTransactionClick}
            auth={auth}
          />
        </>
      ) : (
        <GuestLinks />
      )}
    </NavLinks>
  );

  return (
    <>
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
      <AddEditTransactionModal
        ref={addTransactionModalRef}
        title="Add Transaction"
      />
    </>
  );
};
