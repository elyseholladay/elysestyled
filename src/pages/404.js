import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const NotFoundPage = () => (
    <Layout>
        <div className="container">
            <article className="content page-404">
                <h3 className="content-title">😢 404 Not Found</h3>
                <section className="content-body">
                    Either the link you clicked is no longer available, or you're somewhere that doesn't exist! <Link to="/">Return home</Link> to start over, or go back.
                </section>
            </article>
        </div>
    </Layout>
)

export default NotFoundPage
