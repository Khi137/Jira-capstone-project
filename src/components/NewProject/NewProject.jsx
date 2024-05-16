import React from 'react'
import { useMediaQuery } from 'react-responsive'

import NewProjectDesktop from "./NewProjectDesktop";
import NewProjectMobile from "./NewProjectMobile";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}


export default function NewProject() {
  return (
    <div>
        <Desktop>
            <NewProjectDesktop/>
        </Desktop>
        <Mobile>
            <NewProjectMobile/>
        </Mobile>
  
    </div>
  )
}
