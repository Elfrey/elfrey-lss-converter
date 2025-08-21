/* global CONFIG, game */

export default async ({ pack, itemIds, weaponProfs }) => {
  const result = {};

  // Safely iterate itemIds if provided and a plain object
  const ids = (itemIds && typeof itemIds === 'object') ? itemIds : {};
  const hasPack = !!(pack && typeof pack.getDocument === 'function');

  if (hasPack) {
    for (const itemName in ids) {
      try {
        const itemId = ids[itemName];
        // getDocument may throw if ID is invalid
        const item = await pack.getDocument(itemId);
        if (item) {
          result[itemName] = item.name;
        }
      } catch (e) {
        // ignore missing entries to remain compatible across system versions
      }
    }
  }

  return {
    ...result,
    ...(weaponProfs || {}),
  };
};

