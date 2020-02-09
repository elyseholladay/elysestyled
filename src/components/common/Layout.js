import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation, Home } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                {/* The main header section on top of the screen */}
                <header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
                    <div className="container">
                        <div className="site-mast">
                            <Link to="/" className="site-mast-title">
                                <h1>{site.title}</h1>
                            </Link>
                            <div className="site-nav-scroll-wrapper">
                                <nav className="site-nav">
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation data={site.navigation} navClass="site-nav-item" />
                                    { <a href="https://www.instagram.com/elyseholladay/" className="site-nav-item icon-a11y" target="_blank" rel="noopener noreferrer">
                                        <span class="icon-instagram" aria-hidden="true"></span>
                                            <span class="screen-reader-text">Instagram</span>
                                    </a>}
                                </nav>
                            </div>
                        </div>
                        { bodyClass=="page-style-coaching" ? 
                            <div className="page-style-coaching-tagline">
                                investing in your personal style is transforming your relationship to your clothes and your body. thinking critically. opting out of diet culture. taking care of your nice things. practicing sustainable and intentional consumption. choosing joy. uncovering the style that is singularly yours. respecting your financial goals. loving yourself. raising your feminist consciousness. letting it be easy. wearing your values on the outside. feeling amazing every day in your clothes.
                            </div> :
                            null 
                        }
                    </div>
                </header>

                { bodyClass=="page-style-coaching" ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920.001 226.783">
                        <path data-name="site-head-curve-svg" className="site-head-curve" d="M0 194.669V-.005h1920v3.538C1454.7 151.21 969.7 226.791 507.8 226.778c-173.253 0-343.364-10.645-507.8-32.109z" />
                    </svg> : null
                }

                <main className="site-main">
                    { isHome ?
                        <Home></Home> :
                        null
                    }

                    {/* All the main content gets inserted here, index.js, post.js */}
                    {children}
                </main>

                <footer className="footer">
                    <div className="footer-nav container">
                        <div className="footer-nav-left">
                            <Link to="/">{site.title}</Link> © 2019 &mdash; Published with <a className="footer-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>
                        </div>
                        <div className="footer-nav-right">
                            <Navigation data={site.navigation} navClass="footer-nav-item" />
                        </div>
                    </div>
                </footer>

            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
