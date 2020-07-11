import React from "react"
import { Link } from "gatsby"

import { FiGithub, FiTwitter, FiMail, FiLinkedin, FiFileText } from "react-icons/fi";

import Layout from "../components/layout"
import SEO from "../components/seo"
import Panel from "../components/panel"

// TODO link status to CMS
// TODO switch out to better library
// TODO add resume
class IndexPage extends React.Component {
  render() {
    const siteTitle = "Joel Ye";
    const status = "Say hello: joelye9 at gmail dot com";
    const { data } = this.props;
    const projectData = data.allMdx.edges;
    const projectPanels = projectData.map(({ node }) => <Panel node={node} />);

    const spotlightLinks = [
      { link: "https://twitter.com/_JoelYe", icon: FiTwitter, title: "Twitter" },
      { link: "https://github.com/joel99", icon: FiGithub, title: "GitHub" },
      { link: "https://www.linkedin.com/in/joelye/", icon: FiLinkedin, title: "LinkedIn" },
      { link: "/resume.pdf", icon: FiFileText, title: "Resume" }
    ];

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `joel`, `portfolio`]}
        />
        <div style={styles.header}>
          <img style={styles.profile} src="./pfp_small.jpg" />
          <div style={styles.spotlight}>
            <h3> Student + Dev + Researcher </h3>
            <p> {status} </p>
            <div style={styles.links}>
              {spotlightLinks.map(sl => <PaddedLink {...sl} />)}
            </div>
          </div>
        </div>
        <section>
          <h3>Bio</h3>
          <p> I am a Master's student at Georgia Tech studying Machine Learning, and pursuing graduate school. My research interests fall under the (very) broad theme of relating information processing in the brain and in AI systems.</p>
          <p> I hail from NYC, where I graduated from Stuyvesant High School, and did my undergrad in Computer Science at Georgia Tech. During my undergrad, I was Director of Technology for Georgia Tech's hackathon org, HackGT, where I worked to host events to promote CS education. </p>
        </section>
        <section>
          <h3>Publications</h3>
          {projectPanels}
        </section>
      </Layout>
    )
  }
}

// TODO how can we get the alt to fire on the div?
const PaddedLink = ({link, icon: Icon, ...other}) => (
  <Link to={link} style={styles.linkMargin}>
    <div style={styles.paddedIcon}>
      <Icon {...other} />
    </div>
  </Link>
);

const styles = {
  header: {
    display: "flex",
    flexDirection: "row",
  },
  profile: {
    margin: 0,
    maxWidth: "10em",
    height: "auto",
    objectFit: "cover",
  },
  spotlight: {
    display: "flex",
    marginLeft: "4em",
    flexDirection: "column"
  },
  links: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    position: "relative",
    left: "-0.5em",
  },
  paddedIcon: {
    padding: "0.5em",
  },
  linkMargin: {
    margin: "0.5em"
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fileAbsolutePath: {regex: "/content/projects/"}},
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            pub_info
            authors
            paper
            code
            title
          }
        }
      }
    }
  }
`