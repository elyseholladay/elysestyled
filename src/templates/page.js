import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import { Layout, useGalleryResize } from '../components/common';
import { MetaData } from '../components/common/meta';

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location }) => {
  const page = data.ghostPage;

  useGalleryResize(page.html);

  return (
    <>
      <MetaData data={data} location={location} type="website" />
      <Helmet>
        <style type="text/css">{`${page.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <article className="content content-page container">
          <h1 className="content-title">{page.title}</h1>

          {/* The main page content */}
          {page.feature_image ? (
            <div className="page-feature">
              <figure className="page-feature-image">
                <img src={page.feature_image} alt={page.title} />
              </figure>
            </div>
          ) : null}

          <section
            className="content-body load-external-scripts"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </article>
      </Layout>
    </>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Page;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
