interface Options {
  headers: {};
  query: {};
};

const defaultOptions = {
  headers: {},
  query: {}
};

export default (uri, options:Options = defaultOptions) => {
  const urlString = uri.match(/^http/) ? uri : `${location.origin}${uri}`;
  const token = localStorage.getItem('token');
  const url = new URL(urlString);

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.query) {
    url.search = new URLSearchParams(options.query);
  }

  return fetch(url, options);
};