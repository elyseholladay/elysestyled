import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';

import { Navigation } from '.';

// Styles
import '../../styles/app.css';

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children }) => {
  const site = data.allGhostSettings.edges[0].node;

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <script type="text/javascript">{site.codeinjection_head}</script>
        <body />
      </Helmet>

      <div className="viewport">
        <header className="site-head">
          <div className="container">
            <nav className="site-nav">
              <Link to="/" className="site-nav-item site-nav-item-home">
                {site.title}
              </Link>
              {/* The navigation items as setup in Ghost */}
              <Navigation data={site.navigation} navClass="site-nav-item" />
            </nav>
          </div>
        </header>

        <main className="site-main">
          {/* All the main content gets inserted here, index.js, post.js */}
          {children}
        </main>

        <footer className="footer">
          <div className="footer-nav container">
            <Navigation data={site.navigation} navClass="footer-nav-item" />
            <p className="copyright">© 2020 ELYSE HOLLADAY</p>
          </div>
        </footer>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
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
      }
    `}
    render={(data) => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;
