import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Yarn} from "./pageStyles/pageStyles"
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePageMeta: {
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
      homePageMeta {
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
            id
            Yarn {
              name
              brand
              fiberContent
              yarnPicture {
                altText
                sourceUrl
                imageFile {
                  childImageSharp{
                  fluid(quality: 100, grayscale: true) {
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
  console.log(homePageFeaturedProducts)
  return (
    <Layout>
      <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} alt={homePageHeaderPicture.altText}/>
        <div className="inner-div">
          <p className="header-title">{homePageHeaderTitle}</p>
          <p className="header-description">{homePageHeaderDescription}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK}/>
      </div>
      <div className="description">
        <p>{homePageDescription}</p>
        <BottomEdgeUp color={COLORS.PRIMARY}/>
      </div>
      <div className="yarns">
        <h2>Featured Products</h2>
        <div className="yarn-items">
          {homePageFeaturedProducts.map(({}))}
        </div>
      </div>
    </Wrapper>
    </Layout>
  )
}

export default IndexPage
