import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { FiGithub, FiTwitter, FiLinkedin, FiFileText } from "react-icons/fi";

import Layout from "../components/layout"
import SEO from "../components/seo"
import Panel from "../components/panel"

// TODO add email (FiMail)
// TODO link status to CMS
// TODO move to YAML instead of frontmatter
class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const status = "Say hello: joelye9 at gmail dot com";

    const pfp = data.pfp.childImageSharp;

    const projectData = data.allMdx.edges;

    // https://stackoverflow.com/questions/52574783/gatsby-image-path-from-json
    // https://stackoverflow.com/questions/57515558/how-should-i-import-all-the-images-under-a-folder-in-gatsby
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
          <div style={styles.profile}>
            <Img fluid={pfp.fluid} />
          </div>
          <div style={styles.spotlight}>
            <h3> Researcher &amp; Developer </h3>
            <p> {status} </p>
            <div style={styles.links}>
              {spotlightLinks.map(sl => <PaddedLink {...sl} />)}
            </div>
          </div>
        </div>
        <section>
          <h3>Bio</h3>
          <p> I am a Master's student at Georgia Tech studying Machine Learning. My research interests fall under the (very) broad theme of relating information processing in the brain and in AI systems. I'm currently working with <a href="https://www.cc.gatech.edu/~dbatra/">Dhruv Batra</a>, <a href="https://wijmans.xyz/">Erik Wijmans</a>, and <a href="https://abhishekdas.com/">Abhishek Das</a> on embodied navigation. I also work with <a href="https://scholar.google.com/citations?user=M3-z9G4AAAAJ&hl=en">Chethan Pandarinath</a> on modeling neural data.</p>
          <p> I hail from NYC, where I graduated from Stuyvesant High School, and did my undergrad in Computer Science at Georgia Tech. During my undergrad, I was Director of Technology for Georgia Tech's hackathon org, <a href="https://hack.gt/">HackGT</a>, where I worked to host events to promote CS education. </p>
        </section>
        <section>
          <h3>Projects</h3>
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
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  profile: {
    margin: 0,
    minWidth: "300px",
    width: "12em",
    paddingRight: "1em",
  },
  spotlight: {
    display: "flex",
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
    pfp: file(relativePath: { eq: "pfp_small.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
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
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`