import {definePreview} from 'next-sanity/preview'
import sanity from './sanity'

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`)
}

const projectId = sanity.config.projectId
const dataset = sanity.config.dataset
export const usePreview = definePreview({projectId, dataset, onPublicAccessOnly})