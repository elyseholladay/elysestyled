import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Home = ({ pageContext }) => {
    console.log(pageContext)

    return (
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
                <img src="${cover_image}">
            </div>
        </div>
    )
}

// Home.propTypes = {
//     pageContext: PropTypes.object.isRequired,
// }

export default Home
