import React from "react";
import { useMediaQuery } from "react-responsive";

import  TabUsersDesktop from "./TabUsersDesktop";
import TabUserTablet from './TabUsersTablet';
import TabUsersMobile from './TabUsersMobile';
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export default function TabUsers() {
  return (
    <div>
      <Desktop>
        <TabUsersDesktop />
      </Desktop>
      <Mobile>
        <TabUsersMobile />
      </Mobile>
      <Tablet>
        <TabUserTablet />
      </Tablet>
    </div>
  );
}
