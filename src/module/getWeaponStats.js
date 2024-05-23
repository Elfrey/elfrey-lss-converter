function calculateBonus(data) {
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
  const damage = weapon.getDerivedDamageLabel().map(({label}) => label).join(', ');
  return `(атака +${bonus}, урон ${damage})`
}
