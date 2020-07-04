import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { readingTime as readingTimeHelper } from '@tryghost/helpers';

import { Layout, useGalleryResize } from '../components/common';
import { MetaData } from '../components/common/meta';

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
  const post = data.ghostPost;
  const date = `${post.published_at_pretty}`;
  const readingTime = readingTimeHelper(post);

  useGalleryResize(post.html);

  return (
    <>
      <MetaData data={data} location={location} type="article" />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <article className="content content-post container">
          <div className="post-header">
            <div className="post-meta">
              <div className="post-date-time">
                {date} · {readingTime}
              </div>
            </div>
            <h2 className="post-title">{post.title}</h2>
          </div>

          {post.feature_image ? (
            <figure className="post-feature-image">
              <img src={post.feature_image} alt={post.title} />
            </figure>
          ) : null}

          <section className="post-full-content">
            {/* The main post content */}
            <section
              className="content-body load-external-scripts"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </section>
        </article>
      </Layout>
    </>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;
