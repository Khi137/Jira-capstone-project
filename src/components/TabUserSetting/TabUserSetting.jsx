import React from 'react'
import { useMediaQuery } from 'react-responsive'

import TabUserSettingDesktop from "./TabUserSettingDesktop";
import TabUserSettingMobile from "./TabUserSettingMobile";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}


export default function TabUserSetting() {
  return (
    <div>
        <Desktop>
            <TabUserSettingDesktop/>
        </Desktop>
        <Mobile>
            <TabUserSettingMobile/>
        </Mobile>
  
    </div>
  )
}
