import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'

const WorksheetsPosts = ({ post }) => {
    const url = `/blog/${post.slug}/`

    return (
        <div className="worksheet-posts">
            <div className="worksheet-posts-main">
                <h5 className="worksheet-posts-title">
                    📝 <Link to={url}>{post.title}</Link>
                </h5>
            </div>
            <section className="worksheet-posts-excerpt">{post.excerpt}</section>
        </div>
    )
}

WorksheetsPosts.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default WorksheetsPosts
