
export function convertListToTree(list) {
  const map = {},
    data = [];

  list.forEach(item => {
    map[item._id] = item;
  })

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const pid = item.parentId;

    if (pid == 0) {
      data.push(item)
    } else {
      const parent = map[pid]
      parent.children = (parent.children || []).concat(item)
    }
  }

  // console.log(data, 'hello world');

  return data
}
