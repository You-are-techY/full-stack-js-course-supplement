/**
 * This is a utility to handle default API requests with the Yote server
 */

import _ from 'lodash';
import fetch from 'isomorphic-fetch';

const baseUrl = ""; //later required for server rendering

const apiUtils = {
  callAPI(route, method = 'GET', body, headers = {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }) {
    return fetch(baseUrl + route, {
      headers
      , method
      , credentials: 'same-origin'
      , body: JSON.stringify(body)
    })
    .then(response => response.json())
  }
}

export default apiUtils;
