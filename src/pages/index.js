import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Layout, WorksheetsPosts } from '../components/common'

const IndexPage = ({ data }) => {
    const profile_image = data.allGhostAuthor.edges[0].node.profile_image
    const posts = data.allGhostPost.edges
    // const about = data.allGhostPage.edges[3].node.html

    return (
        <Layout>
            <div className="home">
                <div className="highlight">
                    {/* <div className="highlight-shape">
                        <svg xmlns="http://www.w3.org/2000/svg" width="276" height="284" viewBox="0 0 138.274 142.358">
                            <path id="Path_58" data-name="Path 58" d="M4.284,62.89C-.24,55.52-1.032,46.2,1.207,37.843S8.514,22.075,14.79,16.124A58.129,58.129,0,0,1,53.649,0c14.356-.139,28.8,5.872,38.316,16.625,9.45,10.681,13.652,25.4,13.034,39.652S99.242,84.316,91.921,96.555c-3,5.015-6.561,9.984-11.7,12.758-5.907,3.186-12.989,3.014-19.692,2.664-9.178-.478-18.488-1.164-27.126-4.3S16.749,98.6,13.076,90.179c-3.788-8.69-2.8-19.39-8.615-26.875C4.461,63.3,6.59,66.647,4.284,62.89Z" transform="translate(138.274 104.709) rotate(159)" fill="#a5bdc5" opacity="0.5"/>
                       </svg>
                    </div> */}

                    <div className="highlight-text">
                        are you ready to turn your wardrobe dreams into actions, commit to a more socially responsible wardrobe, & uncover your singular style?
                    </div>
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
                <h3 className="home-featured-blogs-title">resources & worksheets</h3>
                <section className="post-feed">
                    {posts.map(({ node }) => (
                        // The tag below includes the markup for each post - components/common/WorksheetsPosts.js
                        <WorksheetsPosts key={node.id} post={node} />
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

