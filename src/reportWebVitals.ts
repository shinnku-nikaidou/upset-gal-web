export const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      [getCLS, getFID, getFCP, getLCP, getTTFB].map((f) => f(onPerfEntry));
    });
  }
};
