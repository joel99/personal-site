/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import { rhythm } from "../utils/typography"
import { ButtonLink } from "./button"

// TODO move to YAML
// TODO image
// TODO style other things
const Panel = ({ node }) => {
  const { frontmatter: data } = node;

  const title = data.title || node.fields.slug;
  const authorSpans = data.authors.map(a => a.trim()).map((a, i) => {
    let style = styles.author;
    // TODO change to read site metadata
    if (a === "Joel Ye") {
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
      <h3>
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
  // return (
  //   <Container>
  //     <Image
  //       fixed={image}
  //       alt={title}
  //       style={{
  //         marginRight: rhythm(1 / 2),
  //         marginBottom: 0,
  //         minWidth: 50,
  //         borderRadius: `100%`,
  //       }}
  //       imgStyle={{
  //         borderRadius: `50%`,
  //       }}
  //     />
  //     <h1>{title} </h1>
  //     <p>{desc}</p>
  //   </Container>
  // );
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
  }
}

export default Panel
