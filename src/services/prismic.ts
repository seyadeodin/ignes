import * as prismic from '@prismicio/client'
import fetch from 'node-fetch'

const routes = [
  {
    type: 'article',
    path: '/:uid',
  },
]

const repoName = process.env.PRISMIC_REPO_NAME
const endpoint = prismic.getEndpoint(repoName)
const accessToken = process.env.PRISMIC_ACCESS_TOKEN
export const client = prismic.createClient(endpoint, { routes, fetch, accessToken })
