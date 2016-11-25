import fetch from "dva/fetch";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseErrorMessage({data}) {
  const {success, responseBody} = data;
  if (!success) {
    throw new Error(responseBody.errorMessage);
  }
  return {data: responseBody};
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  url = '/2.0' + url;

  const state = app._store.getState();
  if (state.user.isLoggedIn) {
    const sessionToken = state.user.current.sessionToken;
    options = {
      headers: {
        "X-ML-Session-Token": sessionToken,
      },
      ...options
    };
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({data}))
    .then(parseErrorMessage);
  // .catch((err) => ({err}));
}
