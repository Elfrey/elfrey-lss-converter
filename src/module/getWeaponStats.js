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
    if (part.startsWith('@')) {
      // Remove '@' and get the corresponding value from rollData
      const key = part.slice(1);
      const value = rollData[key];
      if (value !== undefined) {
        sum += parseInt(value, 10);
      }
    } else {
      // If it's not a reference, parse it directly as an integer
      sum += parseInt(part, 10);
    }
  });

  return sum;
}

export default (weapon) => {
  const bonus = calculateBonus(weapon.getAttackToHit());
  // const damage = weapon.getDerivedDamageLabel().map(({label}) => label).join(', ');
  const damage = transformDamageArray(weapon.getDerivedDamageLabel());
  return {
    bonus,
    damage,
    label: `(атака +${bonus}, урон ${damage})`,
  }
}
