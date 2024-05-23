export default (languagesData) => {
  let result = {};

  function traverse(node) {
    if (typeof node === 'object' && node !== null) {
      if (node.children) {
        traverse(node.children);
      } else {
        for (let key in node) {
          if (typeof node[key] === 'object' && node[key] !== null) {
            traverse(node[key]);
          } else {
            result[key] = node[key];
          }
        }
      }
    }
  }

  traverse(languagesData);
  result["druidic"] = languagesData.druidic;
  result["cant"] = languagesData.cant;
  return result;
}
