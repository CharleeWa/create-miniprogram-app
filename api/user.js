import wxRequest from '../utils/request'
import basePath from '../config'

export const exm = (params) => {
  return wxRequest.get(basePath.url, '/api/url/', params)
}