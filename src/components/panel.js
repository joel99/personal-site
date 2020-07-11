/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image";

import styled from "styled-components"

import { rhythm } from "../utils/typography"
import { ButtonLink } from "./button"

// TODO move to YAML
// TODO image refactor out into a separate gallery component
// TODO style other things
const Panel = ({ node }) => {

  const { frontmatter: data } = node;

  const queriedData = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          author
        }
      }
      allFile(filter: {
        extension: {regex: "/(jpg)|(jpeg)|(png)/"},
        sourceInstanceName: {eq: "projects"}})
      {
        edges {
          node {
            childImageSharp {
              fluid(quality: 100) {
                originalName
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  // Find the right one
  const image = queriedData.allFile.edges.find(e => e.node.childImageSharp.fluid.originalName === data.image.base);

  const title = data.title || node.fields.slug;
  const authorSpans = data.authors.map(a => a.trim()).map((a, i) => {
    let style = styles.author;
    if (a === queriedData.site.siteMetadata.author) {
      style = { ...style, ...styles.authorEmph };
    }
    return (<React.Fragment>
      <span key={a} style={style}>{a}</span>
      {i !== data.authors.length - 1 && <span>, </span>}
    </React.Fragment>)
  });

  const links = [];
  if (data.paper) {
    links.push(<div style={styles.linkItem}>
      <ButtonLink to={data.paper} name={"Paper"} />
    </div>);
  }
  if (data.code) {
    links.push(<div style={styles.linkItem}>
      <ButtonLink to={data.code} name={"Code"} />
    </div>);
  }
  return (
    <div style={styles.container} key={node.fields.slug}>
      {image &&  <Img fluid={image.node.childImageSharp.fluid} alt={title} />}
      <h3 style={styles.compactHeader}>
        {title}
      </h3>
      <div>
        {authorSpans}
      </div>
      <small>{data.pub_info}</small>
      <div style={styles.links}>
        {links}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  author: {

  },
  authorEmph: {
    fontWeight: 900,
  },
  links: {
    display: "flex",
    flexDirection: "row"
  },
  linkItem: {
    marginRight: "4px"
  },
  compactHeader: {
    marginTop: "0.5em",
    marginBottom: "0.5em"
  }
}

export default Panel