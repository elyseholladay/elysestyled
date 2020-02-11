import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Layout } from '../components/common'

const IndexPage = ({ data }) => {
    const profile_image = data.allGhostAuthor.edges[0].node.profile_image

    return (
        <Layout>
            <div className="home">
                <div className="home-intro-text">
                    <p>
                        I’m Elyse, and I’m a <Link to={'/style-coaching'}>personal style coach</Link>. I help people transform their everyday relationship with clothes, break free of negative body image and shopping habits, and uncover their singular style.
                    </p>
                    <p>
                        Curious? I publish a <Link to={'/newsletter'}>monthly curated newsletter</Link> full of thoughtful prompts, questions, and inspiration to get you thinking critically about style, life, and self. 
                    </p>
                </div>

                <div className="home-mission">
                    <div className="home-mission-image">
                        {profile_image && <img src={profile_image} alt="photo of Elyse" />}
                    </div>
                    <div className="home-mission-text">
                        <h3>investing in your personal style is transforming your relationship to your clothes and your body. thinking critically. opting out of diet culture. taking care of your nice things. practicing sustainable and intentional consumption. choosing joy. uncovering the style that is singularly yours. respecting your financial goals. loving yourself. raising your feminist consciousness. letting it be easy. wearing your values on the outside. feeling amazing every day in your clothes. are you ready?</h3>
                    </div>
                </div>
            </div>
        </Layout>
    )
};


IndexPage.propTypes = {
    data: PropTypes.shape({
        allGhostAuthor: PropTypes.object.isRequired,
    }).isRequired,
}

const IndexQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostAuthor {
                allGhostAuthor {
                    edges {
                        node {
                            ...GhostAuthorFields
                        }
                    }
                }
            }
        `}
        render={data => <IndexPage data={data} {...props} />}
    />
)

export default IndexQuery

