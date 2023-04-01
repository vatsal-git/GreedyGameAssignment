export const sortByKey = (a, b, key) => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

export const getUnitNum = (num) => {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(2) + "K";
  } else if (num >= 1000000 && num < 1000000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B";
  } else return num.toFixed(2);
};

export const getParamValue = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};
