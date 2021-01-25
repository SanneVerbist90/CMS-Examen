import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Yarn } from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePage: {
          homePageDescription,
          homePageHeaderDescription,
          homePageHeaderTitle,
          homePageHeaderPicture,
          homePageFeaturedProducts
        }
      }
    }
  } = useStaticQuery(graphql`
  query {
  wpcontent {
    page(id: "home", idType: URI) {
      homePage {
        homePageDescription
        homePageHeaderDescription
        homePageHeaderTitle
        homePageHeaderPicture {
          altText
          sourceUrl
          imageFile {
            childImageSharp{
              fluid(quality: 100) {
                ... GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        homePageFeaturedProducts {
          ... on WPGraphql_Yarn {
            slug
            id
            yarn {
              name
              brand
              fiberContent
              yarnPicture {
                altText
                sourceUrl
                imageFile {
                  childImageSharp{
                    fluid(quality: 100) {
                      ... GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
            }    
          }
        }
      }
    }
  }
  `);
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} alt={homePageHeaderPicture.altText} />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="yarns">
          <h2>Featured Products</h2>
          <div className="yarn-items">
            {homePageFeaturedProducts.map(({ yarn, slug }) => (
              <Yarn to={`/${slug}`} key={slug}>
                <Image fluid={yarn.yarnPicture.imageFile.childImageSharp.fluid} altText={yarn.yarnPicture.altText} />
                <div className="yarn-info">
                  <p>{yarn.name}</p>
                  <p>{yarn.brand}</p>
                </div>
              </Yarn>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
