import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

import { Layout, useGalleryResize } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const date = `${post.published_at_pretty}`
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    useGalleryResize(post.html)

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <article className="content post">
                    <div className="post-header">
                        <div className="post-meta">
                            <div className="post-date-time">
                                {date} · {readingTime}
                            </div>
                        </div>
                        <h1 className="post-title">{post.title}</h1>
                    </div>

                    { post.feature_image ?
                        <figure className="post-feature-image">
                            <img src={ post.feature_image } alt={ post.title } />
                        </figure> : null }

                    <section className="post-full-content">
                        {/* The main post content */ }
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                        />
                    </section>
                </article>
            </Layout>
        </>
    )
}

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
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
