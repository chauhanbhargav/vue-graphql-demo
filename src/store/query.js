import gql from 'graphql-tag'
import {
    PAGE_NUMBER,
    LIMIT
} from '@/utils/constant';

export const FetchAllCardImagesQuery = {
    query: gql `
        {
            photos (options:{
                paginate: {
                    page: ${PAGE_NUMBER},
                    limit: ${LIMIT}
                }
            }) {
                data {
                    id,
                    title,
                    thumbnailUrl,
                    url
                }
            }
        }
    `
}

export const FetchCardDataQuery = {
    query: gql `
        {
            comments (options:{
                paginate: {
                    page: ${PAGE_NUMBER},
                    limit: ${LIMIT}
                },
            }) {
                data {
                    id,
                    name,
                    body
                }
            }
        }
    `
}