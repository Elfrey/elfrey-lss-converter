export default (count = 1) => {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push(Date.now().toString() + Math.floor(Math.random() * 1000).toString().padStart(3, '0'));
  }
  return ids;
}
