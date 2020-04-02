import React from 'react'
import { graphql, Link } from 'gatsby'

import { App } from './../../components'


const News = ({ data }) => {
  const { edges: newsItems } = data.allMarkdownRemark
  return (
    <App>
      <div className="news">
        <div className="container">
          <div className="row justify-content-center no-gutters">
            <header className="page-header col-sm-12 col-md-12 col-lg-10">
              <h1>News</h1>
              <Link to={`/news#mailing-list`}>Subscribe</Link>
            </header>
            <section className="col-sm-12 col-md-12 col-lg-10">
              { newsItems.map(({ node }) => (
                <div className="news-list-item" key={node.id}>
                  <div className="row">
                    <div className="col-sm-12 col-md-5 col-lg-4">
                      <h2>{node.frontmatter.title}</h2>
                      <p>{node.excerpt}</p>
                    </div>
                    <Link to={`/${node.frontmatter.path}`}>Read</Link>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </App>
  )
}

export default News

// TODO: use fragment reuse query part https://www.gatsbyjs.org/docs/using-graphql-fragments/
// Query for latest news items, skip any entries that have a null path
export const query = graphql`
  query LatestNews {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      filter: {frontmatter: {path: {ne: null}, template: {eq: "news-item"}}}
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`