import generateUniqueIds from './generateUniqueIds';

const getAbilityMod = (item) => {
  if (item.type === 'spell') {
    return item.parent?.system.attributes.spellcasting;
  }
  const { str, dex } = item.parent?.system.abilities ?? {};


  if (item.system.properties.has('fin') && str && dex) return (dex.mod > str.mod) ? 'dex' : 'str';
  return {
    simpleM: 'str',
    martialM: 'str',
    simpleR: 'dex',
    martialR: 'dex',
  }[item.system.type.value] ?? null;
};

export default (item) => {
  return {
    'id': `weapon-${generateUniqueIds()[0]}`,
    'name': {
      'value': item.name,
    },
    'mod': {
      'value': `+${parseInt(item.system.attack.bonus, 10)}`,
    },
    'dmg': {
      'value': item.damage,
    },
    'ability': item.ability ? item.ability : getAbilityMod(item),
    'isProf': item.system.prof.multiplier !== 0,
  };
};
