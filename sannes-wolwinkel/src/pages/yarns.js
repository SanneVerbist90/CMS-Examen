import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Yarn } from '../pageStyles/pageStyles'
import { COLORS } from '../constants'

const YarnPage = () => {
    const {
        wpcontent: {
            page: {
                yarnPage: {
                    yarnPageDescription,
                    yarnPageHeaderPicture,
                }
            },
        yarns: {edges: yarns},
        }

    } = useStaticQuery(graphql`
    query {
        wpcontent {
            page(id: "yarns", idType: URI) {
                yarnPage {
                    yarnPageDescription
                    yarnPageHeaderPicture {
                        altText
                        sourceUrl
                        imageFile{
                            childImageSharp{
                                fluid(quality:100){
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                        slug
                    }
                }
            }
            yarns {
                edges {
                    node {
                        slug
                        yarn {
                            name
                            brand
                            yarnPicture{
                                altText
                                sourceUrl
                                imageFile{
                                    childImageSharp{
                                        fluid(quality:100){
                                            ...GatsbyImageSharpFluid_withWebp
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
    
    `)
console.log("description: ", yarnPageDescription)
    return <Layout>
        <SEO title="Yarn"/>
        <Wrapper yarnsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
            <Image fluid={yarnPageHeaderPicture.imageFile.childImageSharp.fluid} alt={yarnPageHeaderPicture.altText}/>
            <BottomEdgeDown color={COLORS.SECONDARY}/>
            </div> 
            <div className="description">
                <h2>Sanne's wolwinkel</h2>
                <BottomEdgeUp color={COLORS.BLACK} />
            </div>  
            <div className="yarns">
            <h2>Our yarn</h2>
            <div className="yarn-items">
                {yarns.map(({node: {yarn, slug}}) => (
                    <Yarn to={`/${slug}`} key={slug}>
                        <Image fluid={yarn.yarnPicture.imageFile.childImageSharp.fluid} alt={yarn.yarnPicture.altText}/>
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

}

export default YarnPage