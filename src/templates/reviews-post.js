import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from "gatsby"
import Content, { HTMLContent } from '../components/Content'

export const ReviewsPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  image,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <div className="article-default-image-container">
              <img
                className="article-default-image" 
                style={{width: 350}}
                src={image}
              />
            </div>

            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        <br/>

      </div>
    </section>
  )
}

ReviewsPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const ReviewsPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <ReviewsPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      image={post.frontmatter.image}
    />
  )
}

ReviewsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ReviewsPost

export const pageQuery = graphql`
  query ReviewsPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image
      }
    }
  }
`
