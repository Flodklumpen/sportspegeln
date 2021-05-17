// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(endpoint, user, token, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json', 'User': user, 'Authorization': token };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, user, token, customConfig = {}) {
  return client(endpoint, user, token, { ...customConfig, method: 'GET' })
};

client.post = function (endpoint, body, user, token, customConfig = {}) {
  return client(endpoint, user, token, { ...customConfig, body })
};
