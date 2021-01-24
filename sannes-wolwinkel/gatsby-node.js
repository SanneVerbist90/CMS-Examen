const { graphql } = require("gatsby")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(` 
  {
    wpcontent {
      yarns {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  }
  `).then(result => {
    if (result.Errors) {
      result.Errors.forEach(e => console.log(e.toString()))
      return Promise.reject(result.Errors)
    }

    const yarns = result.data.wpcontent.yarns.edges
    yarns.forEach( yarn => {
      const { id, slug } = yarn.node
    createPage({
      path: slug, 
      component: path.resolve(`src/templates/yarn.js`),
      context: {
        id,
        slug,
      },
     })  
    })
  })
}

/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
