/* global CONFIG */
function getDamageLabel4e(item) {
  if (!item.system.activities) return [];

  let damages = [];

  if (item.labels.damages.length) {
    damages = item.labels.damages.map(damage => damage.label);
  }

  return damages.join(', ');
}


export default (weapon) => {
  let bonus = weapon.labels.toHit !== '' ? weapon.labels.toHit : 0;

  const damage = getDamageLabel4e(weapon);

  if (damage !== '') {
    return {
      bonus,
      damage,
      label: `(атака +${bonus}, урон ${damage})`,
    };
  }
}
