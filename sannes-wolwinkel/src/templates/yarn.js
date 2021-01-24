import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image } from "./templateStyles/artistStyles"

const YarnTemplate = ({ 
    data: {
        wpcontent: {
            yarn: {
                yarn,
                categories: { edges: categories},
            },
        },
    },
 }) => {
     //fibercontent kan meerdere waarden bevatten (max 6).
const [fiber1, fiber2, fiber3, fiber4, fiber5, fiber6 ] = yarn.fiberContent
const fiber = [fiber1, fiber2, fiber3, fiber4, fiber5, fiber6 ]
    return <Layout>
        <SEO title="Yarn"/>
        <Wrapper>
            <div className="yarn-container">
                <div className="yarn-image">
                    <Image fluid={yarn.yarnPicture.imageFile.childImageSharp.fluid} altText={yarn.yarnPicture.altText}/>
                    <div className="categories">
                        {categories.map(({node: category}) => (
                            <div key={category.name} className="category">{category.name}</div>
                        ))}
                    </div>
                </div>     
                <div className="yarn-info">
                    <h2>{yarn.name}</h2>
                    <h3><span>{yarn.brand}</span></h3>
                    <p className="description">{yarn.description}</p>
                    <p className="info">
                    <strong>Color: </strong>{yarn.color}
                    </p>
                    <p className="info">
                    <strong>Needle size: </strong>{yarn.needleSize}
                    </p>
                    <p className="info">
                    <strong>Length: </strong>{yarn.lenght} m
                    </p>
                    <p className="info">
                    <strong>Weight: </strong>{yarn.weight} gr
                    </p> 
                    {/*loopt over de array met fibercontent, print enkel als er een value is*/}
                    <p className="info">
                    <strong>Fiber content:</strong>
                    {fiber.map((fb) =>(                        
                        (fb? ` ${fb}` : null) 
                    ))}                         
                      </p>
                </div>       
            </div>
           
        </Wrapper>
    </Layout>
}

export default YarnTemplate

export const pageQuery = graphql`
query ($id: ID!){
    wpcontent {
        yarn(id: $id, idType: ID) {
            categories {
                edges {
                    node {
                        name
                    }
                }
            }
            yarn {
                name
                brand
                description
                color
                fiberContent
                lenght
                weight
                needleSize
                yarnPicture {
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
`
