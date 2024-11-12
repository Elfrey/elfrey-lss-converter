/* global CONFIG */
const transformDamageArray = (damageArray) => {
  let result = damageArray.map(item => {
    let formula = item.formula;
    let damageType = item.damageType;

    // Check if the formula already contains brackets
    let match = formula.match(/\[(.*?)\]/);

    if (match) {
      let damageType = match[1];
      formula = formula.replace(`[${damageType}]`, '') + `[${CONFIG.DND5E.damageTypes[damageType].label}]`
    } else {
      formula = formula + `[${CONFIG.DND5E.damageTypes[damageType].label}]`;
    }

    return formula;
  });

  return result.join(' + ');
}

const calculateBonus = (data) => {
  const rollData = data.rollData;
  const parts = data.parts;

  let sum = 0;

  parts.forEach(part => {
    if (typeof part === 'string' && part.startsWith('@')) {
      const key = part.slice(1);
      const value = rollData[key];
      if (value !== undefined) {
        sum += parseInt(value, 10);
      }
    } else {
      sum += parseInt(part, 10);
    }
  });

  return sum;
}

export default (weapon) => {
  console.debug('weapon', weapon);
  let bonus = 0;
  const attackToHit = weapon.getAttackToHit();
  if (attackToHit) {
    bonus = calculateBonus(attackToHit);
  }
  const damage = transformDamageArray(weapon.getDerivedDamageLabel());
  return {
    bonus,
    damage,
    label: `(атака +${bonus}, урон ${damage})`,
  }
}
