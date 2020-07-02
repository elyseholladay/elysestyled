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
const DefaultLayout = ({ data, children }) => {
    const site = data.allGhostSettings.edges[0].node
    
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <script type="text/javascript">
                    {site.codeinjection_head}
                </script>
                <body/>
            </Helmet>

            <div className="viewport">
                {/* The main header section on top of the screen */}
                <header className="site-head">
                    <div className="container">
                        <div className="site-nav-scroll-wrapper">
                            <nav className="site-nav">
                                <Link to="/" className="site-nav-item site-nav-item-home">
                                    {site.title}
                                </Link>
                                {/* The navigation items as setup in Ghost */}
                                <Navigation data={site.navigation} navClass="site-nav-item" />
                            </nav>
                        </div>
                    </div>
                </header>

                <main className="site-main container">
                    {/* All the main content gets inserted here, index.js, post.js */}
                    {children}
                </main>

                <footer className="footer">
                    <div className="footer-nav container">
                        <div className="footer-nav-left">
                            <em>
                                we become what we think about all the time
                            </em>
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
