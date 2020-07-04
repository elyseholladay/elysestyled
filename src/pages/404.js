import React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/common';

const NotFoundPage = () => (
  <Layout>
    <article className="content page-404">
      <h3 className="post-title">404 — this page can&apos;t be found</h3>
      <section className="content-body">
        <p>
          🕵🏽‍♀️ Either the link you clicked is no longer available, or you&apos;re
          somewhere that doesn&apos;t exist! <Link to="/">Return home</Link> to
          start over, or go back to the previous page.
        </p>
        <p>
          Got questions or looking for something?{` `}
          <a href="mailto:coaching@elysestyled.com?subject=I'm looking for...">
            Get in touch.
          </a>
        </p>
      </section>
    </article>
  </Layout>
);

export default NotFoundPage;
