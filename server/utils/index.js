
export function convertListToTree(list) {
  const map = {},
    data = [];

  list.forEach(item => {
    map[item._id] = item;
  })

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const parent = item.parent;

    if (!parent) {
      data.push(item)
    } else {
      const realParent = map[parent._id]
      realParent.children = (realParent.children || []).concat(item)
    }
  }

  // console.log(data, 'hello world');

  return data
}