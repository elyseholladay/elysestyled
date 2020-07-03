import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post }) => {
    const date = `${post.published_at_pretty}`
    const url = `/blog/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <div className="post-card">
            <header className="post-card-header">
                <div className="post-meta">
                    <div className="post-date-time">
                        {date} · {readingTime}
                    </div>
                </div>
                {/* {post.tags && <div className="post-card-tags">
                    <Tags post={post} visibility="public" autolink={false}/>
                </div>} */}
            </header>
            
            <Link to={url} className="post-card-main">
                <h3 className="post-card-title">
                    {post.title}
                </h3>
                    
                <div className="post-card-image-wrapper">
                {post.feature_image &&
                    <div className="post-card-image">
                        <img src={post.feature_image}/>
                    </div>
                }
                </div>
            </Link>

            <section className="post-card-excerpt">{post.excerpt}</section>
        </div>
    )
}

PostCard.propTypes = {
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

export default PostCard
