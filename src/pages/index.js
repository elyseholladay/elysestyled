import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'

const IndexPage = ({ data }) => {
    const profile_image = data.allGhostAuthor.edges[0].node.profile_image
    const posts = data.allGhostPost.edges
    // const about = data.allGhostPage.edges[3].node.html

    return (
        <Layout>
            <div className="home">
                <div className="highlight-text">
                    are you ready to turn your wardrobe dreams into actions, commit to a more socially responsible wardrobe, & uncover your singular style?
                </div>
        
                <div>
                    <h2>group class</h2>
                    <p>Committed to a more socially responsible wardrobe, but don’t know how to begin turning your values into actions, shopping habits, and stick to it?</p>
                    <p>Get in the Class!</p>
                </div>

                <div>
                    <h2>style coaching</h2>
                    <p>Style Coaching provides the one-on-one attention and insights you need to transform your relationship to your wardrobe. Six month packages for personalized work, or if you don’t know where to begin and you’re overwhelmed and need immediate wardrobe support, sign up for a one-hour pay-what-you’re-able strategy call.</p>
                    <p>Book a Discovery Call today to see what style coaching is all about.</p>
                </div>
            </div>

            <div className="home-featured-blogs">
                <h2 className="home-featured-blogs-title">On the Blog</h2>
                <section className="post-feed">
                    {posts.map(({ node }) => (
                        // The tag below includes the markup for each post - components/common/PostCard.js
                        <PostCard key={node.id} post={node} />
                    ))}
                </section>
            </div>
        </Layout>
    )
};


IndexPage.propTypes = {
    data: PropTypes.shape({
        allGhostAuthor: PropTypes.object.isRequired,
        allGhostPost: PropTypes.object.isRequired,
        allGhostPage: PropTypes.object.isRequired
    }).isRequired,
}

const IndexQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostPostAndAuthorQuery {
                allGhostPost(limit: 10, filter: {featured: {in: true}}, sort: {order: DESC, fields: published_at}) {
                    edges {
                        node {
                            ...GhostPostFields
                        }
                    }
                }
                allGhostAuthor {
                    edges {
                        node {
                            ...GhostAuthorFields
                        }
                    }
                }
                allGhostPage {
                    edges {
                      node {
                        title
                        plaintext
                      }
                    }
                }
            }
        `}
        render={data => <IndexPage data={data} {...props} />}
    />
)

export default IndexQuery

