import React from "react";
import { useMediaQuery } from "react-responsive";
import LayoutMainMobile from "./LayoutMainMobile";
import LayoutMainDesktop from "./LayoutMainDesktop";
import LayoutMainTablet from "./LayoutMainTablet";


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

export default function LayoutMain() {
  return (
    <div>
      <Desktop>
        <LayoutMainDesktop />
      </Desktop>
      <Mobile>
        <LayoutMainMobile />
      </Mobile>
      <Tablet>
        <LayoutMainTablet />
      </Tablet>
    </div>
  );
}
