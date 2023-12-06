const handleResponseError = (response, type) => {
  if (response.status !== 200) {
    throw Error(`${type} Response ${response.status}: ${response.statusText}`);
  }
};

export { handleResponseError };
