export const clearUrl = (param) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(param);
    const queryString = searchParams.toString();
    const newUrl = queryString
      ? window.location.pathname + "?" + queryString
      : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  };
