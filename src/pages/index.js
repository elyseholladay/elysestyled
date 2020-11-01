import React from 'react';
import PropTypes from 'prop-types';
import ConvertKitForm from 'convertkit-react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { Layout, WorksheetsPosts } from '../components/common';
import { MetaData } from '../components/common/meta';
import Img from 'gatsby-image';

const IndexPage = ({ data, location }) => {
  const posts = data.allGhostPost.edges;

  return (
    <>
      <MetaData data={data} location={location} type="website" />
      <Layout>
        <div className="home">
          <div className="highlight">
            <div className="highlight-shape">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="276"
                height="284"
                viewBox="0 0 138.274 142.358"
              >
                <path
                  id="Path_58"
                  data-name="Path 58"
                  d="M4.284,62.89C-.24,55.52-1.032,46.2,1.207,37.843S8.514,22.075,14.79,16.124A58.129,58.129,0,0,1,53.649,0c14.356-.139,28.8,5.872,38.316,16.625,9.45,10.681,13.652,25.4,13.034,39.652S99.242,84.316,91.921,96.555c-3,5.015-6.561,9.984-11.7,12.758-5.907,3.186-12.989,3.014-19.692,2.664-9.178-.478-18.488-1.164-27.126-4.3S16.749,98.6,13.076,90.179c-3.788-8.69-2.8-19.39-8.615-26.875C4.461,63.3,6.59,66.647,4.284,62.89Z"
                  transform="translate(138.274 104.709) rotate(159)"
                  fill="#a5bdc5"
                  opacity="0.5"
                />
              </svg>
            </div>

            <div className="container highlight-text">
              <h2>
                personal style coaching for intentional people who are ready to transform their relationship with clothes.
              </h2>
            </div>
          </div>

          <div className="offerings content container">

            <div className="offerings-group">
              <p>
                You love style and self-expression, but never quite feel like yourself in your outfits. You're spending so much energy on your wardrobe—hours wasted agonizing over decisions—but feel like you're getting nowhere. Your life and priorities are shifting, but your clothes and shopping habits are stuck. You're dreaming of a wardrobe that finally feels right—value-aligned <em>and</em> style-aligned.
              </p>
              <p>
                You're ready to transform your relationship with clothes—and today is a perfect moment to begin.
              </p>
              <p>
                Personal style coaching is a thoughtful and long-term wardrobe reset. Over multiple seasons, you'll uncover your singular style, alter your style mindset, and build resilient wardrobe systems. <a href="/style-coaching">Discover how Style Coaching works</a> and <a href="/values">how our personal style intersects with our personal values</a>.
              </p>
              <p>
                When you're ready to transform your relationship with your clothes, <a href="https://elysestyled.as.me/discovery">book your free Discovery Call</a>.
              </p>
              <div className="form-wrapper">
                <a
                  href="https://app.acuityscheduling.com/schedule.php?owner=17965065"
                  className="acuity-embed-button"
                >
                  Book a Discovery Call
                </a>
                <script
                  src="https://embed.acuityscheduling.com/embed/button/17965065.js"
                  async
                ></script>
              </div>
            </div>
            <div className="testimonial">
              <blockquote>
                "This has been so helpful already for me unlearning my guilt cycle and 'hating' my hobby and source of joy and creativity in clothes." <br/>— <a href="https://www.instagram.com/spagrettystylejournal/">Gretchen @spagrettystylejournal</a>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="about">
          <div className="about-text container content">
            👋🏼 I&apos;m Elyse, and I'm on a mission to help women & gender non-conforming people define their singular style, build wardrobe systems that support them, and make value-driven style & shopping decisions. For me, it&apos;s about the clothes—but it&apos;s not just about the clothes.&nbsp;
            <a href="/about" className="link-highlight">
              Read more about me and why I started style coaching.
            </a>
          </div>
          <div className="about-image">
            <Img fluid={data.file.childImageSharp.fluid} />
          </div>
        </div>

        <div className="worksheets content container">
          <h3 className="worksheets-title">introspection—in your inbox</h3>
          <p>
            Thoughtful articles, worksheets, and assessments designed to help you take action and think critically about your personal style, values, and mindset. 
          </p>

          <div className="form-wrapper">
            <ConvertKitForm formId={1503630} template="minimal" />
          </div>

          <div className="worksheets-feed">
            {posts.map(({ node }) => (
              // The tag below includes the markup for each post - components/common/WorksheetsPosts.js
              <WorksheetsPosts key={node.id} post={node} />
            ))}
          </div>
        </div>

        <div className="statement">
          <p className="container content">
            investing in your personal style is transforming your relationship
            to your clothes and your body. thinking critically. opting out of
            diet culture. taking care of your nice things. practicing
            sustainable and intentional consumption. choosing joy. uncovering
            the style that is singularly yours. respecting your financial goals.
            loving yourself. raising your feminist consciousness. letting it be
            easy. wearing your values on the outside. feeling amazing every day
            in your clothes. are you ready?
          </p>
        </div>
      </Layout>
    </>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allGhostAuthor: PropTypes.object.isRequired,
    allGhostPost: PropTypes.object.isRequired,
    allGhostPage: PropTypes.object.isRequired,
    file: {
      childImageSharp: {
        fluid: PropTypes.object.isRequired,
      },
    },
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const IndexQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostPostAndAuthorQuery {
        allGhostPost(
          limit: 10
          filter: { featured: { in: true }, slug: { ne: "data-schema" } }
          sort: { order: DESC, fields: published_at }
        ) {
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
        file(relativePath: { eq: "elyse-shape.png" }) {
          childImageSharp {
            fluid(maxWidth: 385, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={(data) => <IndexPage data={data} {...props} />}
  />
);

export default IndexQuery;
