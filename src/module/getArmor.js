/* global CONFIG, game */



export default async ({pack, itemIds, armorProfs}) => {
  let itemsObject = {};

  for (let itemName in itemIds) {
    let itemId = itemIds[itemName];
    let item = await pack.getDocument(itemId);
    if (item) {
      itemsObject[itemName] = item.name;
    }
  }


  return {
    ...itemsObject,
    ...armorProfs,
  };
}

