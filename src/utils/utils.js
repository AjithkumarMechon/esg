
function getDDId(data, type, name) {
  return data.responseBody[type].find((dd) => dd.name === name).id;
}

const utils = { getDDId };

export default utils;
