import React, {useState} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header/header"
import "./layout.css"
import  Hamburger  from "./header/hamburger"
import OverlayMenu from './header/overlayMenu'

const Layout = ({ children }) => {
const [menuOpen, setMenuOpen] = useState(false);

const handleOverlayMenu = () => setMenuOpen(!menuOpen)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Hamburger handleOverlayMenu={handleOverlayMenu} />
      <OverlayMenu handleOverlayMenu={handleOverlayMenu} menuOpen={menuOpen}/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `auto`,
          padding: 0,
          paddingBottom: `2rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
         Sanne Verbist, examenopdracht CMS Development © {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
