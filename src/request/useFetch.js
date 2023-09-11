import { Notify } from 'vant';

const abortDeps = {}

const trackAbort = (key, abort) => {
  if (!abortDeps[key]) {
    abortDeps[key] = abort
  }
}

const triggerAbort = (key, abort) => {
  const controller = abortDeps[key]
  if (!controller) return
  controller.abort()
  delete abortDeps[key]
}


function toQueryString(params) {
  return params ? '?' + new URLSearchParams(params).toString() : '';
}

export function createRestClient(base = '') {
  async function fetchWithTimeout(method, path, data, options) {
    const { timeout = 10000, abort = false } = options || {};
    const controller = new AbortController();
    let key = `${method}_${path.split('?')[0] || ''}`
    triggerAbort(key, controller)
    if (abort) {
      trackAbort(key, controller)
    }
    const id = setTimeout(() => {
      controller.abort()
    }, timeout);
    const response = await fetch(base + path, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(id);
    return response;
  }

  async function fetchWithFormData(method, path, data, options) {
    const { timeout = 10000 } = options || {};
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(base + path, {
      method: method,
      body: data,
      signal: controller.signal,
      ...options,
    });
    clearTimeout(id);
    return response;
  }

  const unwrap = (r) => {
    if (r.status === 200) {
      return r.json();
    } else {
      Notify({
        message: r.status.toString(),
        duration: 1000,
      });
      throw r.status;
    }
  };

  const post = (path, data) => fetchWithTimeout('POST', path, data);

  const postForObject = (path, data, options) =>
    fetchWithTimeout('POST', path, data, options).then((r) => unwrap(r));

  const postForFormData = (path, data) =>
    fetchWithFormData('POST', path, data).then((r) => unwrap(r));

  const putForObject = (path, data) =>
    fetchWithTimeout('put', path, data).then((r) => unwrap(r));

  const getForObject = (path, params, options) =>
    fetchWithTimeout('get', path + toQueryString(params), undefined, options).then((r) => unwrap(r));

  const deleteForObject = (path, params) =>
    fetchWithTimeout('delete', path + toQueryString(params), {
      method: 'delete',
    }).then((r) => unwrap(r));

  return {
    post,
    getForObject,
    putForObject,
    postForObject,
    postForFormData,
    deleteForObject,
  };
}
