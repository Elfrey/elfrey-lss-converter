/* global CONFIG */


const traitsConfig = {
  "size": {"title": "Размер", "configKey": "actorSizes"},
  "di": {"title": "Невосприимчивость к урону", "configKey": "damageTypes"},
  "dr": {"title": "Устойчивость к урону", "configKey": "damageTypes"},
  "dv": {"title": "Уязвимость к урону", "configKey": "damageTypes"},
  // "dm": {"title": "Модифиактор урона", "configKey": "damageTypes"},
  "ci": {
    "title": "Невосприимчивость к состоянию",
    "configKey": "conditionTypes"
  },
  "languages": {"title": "Языки", "configKey": "languages"},
  "weaponProf": {"title": "Умения в оружии", "configKey": "weaponTypes"},
  "armorProf": {"title": "Умения в броне", "configKey": "armorTypes"},
  "toolProf": {"title": "Умения в инструментах", "configKey": "toolIds"}
}

export default ({traits, languages, weapons, armors, tools, actorTools}) => {
  let traitStrings = []
  for (let [traitKey, traitValue] of Object.entries(traits)) {
    let traitString = traitsConfig[traitKey]?.title || '';
    if (traitString !== '') {
      traitString += ': ';

      switch (traitKey) {
        case 'size': {
          traitString += CONFIG.DND5E[traitsConfig[traitKey].configKey][traitValue].label;
          break;
        }
        case 'di':
        case 'dr':
        case 'dv':
        case 'dm':
        case 'ci': {
          traitString += Array.from(traitValue.value).map((damageType) => {
              return CONFIG.DND5E[traitsConfig[traitKey].configKey][damageType].label
            }
          ).join(', ') + `${traitValue.custom !== '' ? `, ${traitValue.custom}` : ''}`;
          break;
        }
        case 'languages': {
          traitString += Array.from(traitValue.value).map((language) => {
              return languages[language];
            }
          ).join(', ') + `${traitValue.custom !== '' ? `, ${traitValue.custom}` : ''}`;
          break;
        }
        case 'weaponProf': {
          traitString += Array.from(traitValue.value).map((weapon) => {
              return weapons[weapon];
            }
          ).join(', ') + `${traitValue.custom !== '' ? `, ${traitValue.custom}` : ''}`;
          break;
        }
        case 'armorProf': {
          traitString += Array.from(traitValue.value).map((armor) => {
              return armors[armor];
            }
          ).join(', ') + `${traitValue.custom !== '' ? `, ${traitValue.custom}` : ''}`;
          break;
        }
        case 'toolProf': {
          const toolsArray = [];
          for (let tool in actorTools) {
            toolsArray.push(`${tools[tool]} ${actorTools[tool].value !== 1 ? `(x${actorTools[tool].value})` : ''}`);
          }
          traitString += toolsArray.join(', ');
          break;
        }
      }
      traitStrings.push(traitString);
    }
  }
  return traitStrings
}
