import React from 'react'
import PropTypes from 'prop-types'
import ConvertKitForm from 'convertkit-react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Layout, WorksheetsPosts } from '../components/common'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => {
    const profile_image = data.allGhostAuthor.edges[0].node.profile_image
    const posts = data.allGhostPost.edges
    // const about = data.allGhostPage.edges[3].node.html

    return (
        <Layout>
            <div className="home">
                <div className="highlight">
                    <div className="highlight-shape">
                        <svg xmlns="http://www.w3.org/2000/svg" width="276" height="284" viewBox="0 0 138.274 142.358">
                            <path id="Path_58" data-name="Path 58" d="M4.284,62.89C-.24,55.52-1.032,46.2,1.207,37.843S8.514,22.075,14.79,16.124A58.129,58.129,0,0,1,53.649,0c14.356-.139,28.8,5.872,38.316,16.625,9.45,10.681,13.652,25.4,13.034,39.652S99.242,84.316,91.921,96.555c-3,5.015-6.561,9.984-11.7,12.758-5.907,3.186-12.989,3.014-19.692,2.664-9.178-.478-18.488-1.164-27.126-4.3S16.749,98.6,13.076,90.179c-3.788-8.69-2.8-19.39-8.615-26.875C4.461,63.3,6.59,66.647,4.284,62.89Z" transform="translate(138.274 104.709) rotate(159)" fill="#a5bdc5" opacity="0.5"/>
                       </svg>
                    </div>

                    <div className="container highlight-text">
                        <h2>
                            are you ready to turn your wardrobe dreams into actions, commit to a more socially responsible wardrobe, & uncover your singular style?
                        </h2>
                    </div>
                </div>
        
                <div className="offerings content container">
                    <div className="offerings-group">
                        <h3><a href="/course">Socially Responsible Style Course</a></h3>
                        <p>Committed to a more socially responsible wardrobe, but don’t know how to begin changing your shopping habits? This one-day online group course is designed specifically to help you name your shopping values and create a thoughtful wishlist system that really works... with friends! Want to be first to know when signups open?</p>
                        <div className="form-wrapper">
                            <ConvertKitForm formId="1489882" submitText="Let me know!" />
                        </div>
                    </div>
                
                    <div className="offerings-group">
                        <h3><a href="/style-coaching">Personal Style Coaching</a></h3>
                        <p>Style Coaching is a six-month, completely custom, wardrobe reset. We'll dig deep into your wardrobe dreams, using your real habits to understand what you already wear and how you shop, and creatively explore where you want to be in the future. Using journaling prompts and exercises, you’ll reflect on your values, come up with your very own style words, & plan for future wardrobe satisfaction.</p>
                        {/* <p><a href="#" className="link-highlight">Book your Discovery Call.</a></p> */}
                        <div className="form-wrapper">
                            <a href="https://app.acuityscheduling.com/schedule.php?owner=17965065" target="_blank" className="acuity-embed-button">Schedule Appointment</a>
                            <script src="https://embed.acuityscheduling.com/embed/button/17965065.js" async></script>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about">
                <div className="about-text container content">
                    👋🏼 I'm Elyse—your personal style coach. I believe in wearing your values, thinking critically, and modeling the world you want to live in. For me, it's about the clothes—but it's not just about the clothes.&nbsp;
                    <a href="/about" className="link-highlight">
                        Read more about me and why I started style coaching.
                    </a>
                </div>
                <div className="about-image">
                    <Img fluid={data.file.childImageSharp.fluid} />
                </div>
            </div>

            <div className="worksheets content container">
                <h3 className="worksheets-title">resources & worksheets</h3>
                <p>My secret to help you get started thinking critically about your wardrobe? Thoughtful questions and guided worksheets. Get new worksheets right in your inbox to stay curious, accountable, and motivated to improve your relationship with your clothes.</p>

                <div className="form-wrapper">
                    <ConvertKitForm formId="1503630" />
                </div>

                <div className="worksheets-feed">
                    {posts.map(({ node }) => (
                        // The tag below includes the markup for each post - components/common/WorksheetsPosts.js
                        <WorksheetsPosts key={node.id} post={node} />
                    ))}
                </div>
            </div>

            <div className="statement">
                <p className="container content">investing in your personal style is transforming your relationship to your clothes and your body. thinking critically. opting out of diet culture. taking care of your nice things. practicing sustainable and intentional consumption. choosing joy. uncovering the style that is singularly yours. respecting your financial goals. loving yourself. raising your feminist consciousness. letting it be easy. wearing your values on the outside. feeling amazing every day in your clothes. are you ready?</p>
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
                file(relativePath: {eq: "elyse-shape.png"}) {
                    childImageSharp {
                        fluid(maxWidth: 385, maxHeight: 400) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        `}
        render={data => <IndexPage data={data} {...props} />}
    />
)

export default IndexQuery

