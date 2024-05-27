import generateUniqueIds from './generateUniqueIds';

export default (item, location = 'traits') => {
  const id = generateUniqueIds();
  const foundryUses = ['dawn', 'day', 'dusk', 'lr'];
  let icon = '';
  if (item.system.uses.per === 'sr') {
    icon = 'short-rest';
  } else if (foundryUses.includes(item.system.uses.per)) {
    icon = 'long-rest';
  }

  return {
    id: `resource-${id}`,
    item: {
      'id': `resource-${id}`,
      'name': item.name,
      'current': item.system.uses.max,
      'max': item.system.uses.max,
      location,
      'isLongRest': foundryUses.includes(item.system.uses.per),
      'isShortRest': item.system.uses.per === 'sr',
      icon,
    },
  };
}
