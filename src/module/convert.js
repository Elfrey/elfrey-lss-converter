/* global CONFIG, game */


import generateUniqueIds from './generateUniqueIds';
import collectLanguages from './collectLanguages.js';
import getTraits from './getTraits.js';
import getWeapons from './getWeapons.js';
import getArmor from './getArmor.js';
import getTools from './getTools.js';
import htmlToLssJson from './htmlToLssJson.js';
import getWeaponStats from './getWeaponStats';
import getWeaponObject from './getWeaponObject';
import getResource from './getResource';
import { moduleName } from '../_module';


const textTemplate = (text) => {
  return {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text,
      },
    ],
  };
};


const fttSkillsKeys = {
  acr: {
    baseStat: 'dex',
    name: 'acrobatics',
    label: 'Акробатика',
    lssSkill: 'acrobatics',
  },
  ani: {
    baseStat: 'wis',
    name: 'animalHandling',
    label: 'Дрессировка',
    lssSkill: 'animal handling',
  },
  arc: {
    baseStat: 'int',
    name: 'arcana',
    label: 'Магия',
    lssSkill: 'arcana',
  },
  ath: {
    baseStat: 'str',
    name: 'athletics',
    label: 'Атлетика',
    lssSkill: 'athletics',
  },
  dec: {
    baseStat: 'cha',
    name: 'deception',
    label: 'Обман',
    lssSkill: 'deception',
  },
  his: {
    baseStat: 'int',
    name: 'history',
    label: 'История',
    lssSkill: 'history',
  },
  ins: {
    baseStat: 'wis',
    name: 'insight',
    label: 'Проницательность',
    lssSkill: 'insight',
  },
  inv: {
    baseStat: 'int',
    name: 'investigation',
    label: 'Расследование',
    lssSkill: 'investigation',
  },
  itm: {
    baseStat: 'cha',
    name: 'intimidation',
    label: 'Запугивание',
    lssSkill: 'intimidation',
  },
  med: {
    baseStat: 'wis',
    name: 'medicine',
    label: 'Медицина',
    lssSkill: 'medicine',
  },
  nat: {
    baseStat: 'int',
    name: 'nature',
    label: 'Природа',
    lssSkill: 'nature',
  },
  per: {
    baseStat: 'cha',
    name: 'persuasion',
    label: 'Убеждение',
    lssSkill: 'persuasion',
  },
  prc: {
    baseStat: 'wis',
    name: 'perception',
    label: 'Внимание',
    lssSkill: 'perception',
  },
  prf: {
    baseStat: 'cha',
    name: 'performance',
    label: 'Исполнение',
    lssSkill: 'performance',
  },
  rel: {
    baseStat: 'int',
    name: 'religion',
    label: 'Религия',
    lssSkill: 'religion',
  },
  slt: {
    baseStat: 'dex',
    name: 'sleightOfHand',
    label: 'Ловкость рук',
    lssSkill: 'sleight of hand',
  },
  ste: {
    baseStat: 'dex',
    name: 'stealth',
    label: 'Скрытность',
    lssSkill: 'stealth',
  },
  sur: {
    baseStat: 'wis',
    name: 'survival',
    label: 'Выживание',
    lssSkill: 'survival',
  },
};

const convertFoundryToLss = async (actorData) => {
  const useInteractiveBlocks = game.settings.get(moduleName, 'interactive-blocks');
  const randomId = generateUniqueIds(20);
  const itemsPack = game.packs.get('dnd5e.items');
  const {
    abilities,
    attributes,
    details,
    skills,
    spells,
    currency,
    traits,
    tools: actorTools,
  } = actorData.system;
  const { items } = actorData;

  let lssSpells = {
    'spells-level-0': {
      value: {
        id: `hover-toolbar-spells-level-0-${randomId[0]}`,
        data: {
          type: 'doc',
          content: [],
        },
      },
    },
  };
  const lssEquipment = {
    equipment: {
      value: {
        id: `hover-toolbar-equipment-${randomId[10]}`,
        data: {
          type: 'doc',
          content: [],
        },
      },
    },
  };
  const lssAttacks = {
    attacks: {
      value: {
        id: `hover-toolbar-attacks-${randomId[12]}`,
        data: {
          type: 'doc',
          content: [],
        },
      },
    },
  };
  const lssTraits = {
    traits: {
      value: {
        id: `hover-toolbar-traits-${randomId[12]}`,
        data: {
          type: 'doc',
          content: [],
        },
      },
    },
  };
  const insertTrait = ({
                         type = 'text',
                         text,
                         id,
                         textName,
                       }) => {
    const tmpTrait = type === 'resource' ? {
      type: 'resource',
      attrs: {
        id,
        textName,
      },
    } : {
      ...text,
    };
    lssTraits.traits.value.data.content.push(tmpTrait);
  };
  const lssFeatures = {
    features: {
      value: {
        id: `hover-toolbar-features-${randomId[13]}`,
        data: {
          type: 'doc',
          content: [],
        },
      },
    },
  };
  const lssItems = {
    items: {
      value: {
        id: `hover-toolbar-items-${randomId[14]}`,
        data: {
          type: 'doc',
          content: [],
        },
      },
    },
  };
  const lssProf = {
    value: {
      id: `hover-toolbar-prof-${randomId[11]}`,
      data: {
        type: 'doc',
        content: [],
      },
    },
  };
  const lssWeapons = [];
  const lssResource = {};

  const charClass = [];
  const spellCasting = [];
  let spellCastingString = [];
  const hitDie = { value: '' };
  const hitDieMultiple = {};
  let pactSpell = {};
  const spellSlots = {};
  const lssStats = {};
  const lssSaves = {};
  const lssSkills = {};
  let traitStrings = [];
  const characterTraits = {
    'background': {
      'isHidden': false,
      'value': {
        'id': `hover-toolbar-background-${randomId[15]}`,
        'data': {
          'type': 'doc',
          'content':
            htmlToLssJson(details.biography.value),
        },
      },
    },
    'personality': {
      'value': {
        'id': `hover-toolbar-personality-${randomId[16]}`,
        'data': {
          'type': 'doc',
          'content':
            htmlToLssJson(details.trait),
        },
      },
    },
    'ideals': {
      'value': {
        'id': `hover-toolbar-ideals-${randomId[17]}`,
        'data': {
          'type': 'doc',
          'content':
            htmlToLssJson(details.ideal),
        },
      },
    },
    'bonds': {
      'value': {
        'id': `hover-toolbar-bonds-${randomId[18]}`,
        'data': {
          'type': 'doc',
          'content':
            htmlToLssJson(details.bond),
        },
      },
    },
    'flaws': {
      'value': {
        'id': `hover-toolbar-flaws-${randomId[19]}`,
        'data': {
          'type': 'doc',
          'content':
            htmlToLssJson(details.flaw),
        },
      },
    },
  };


  // Get class and spellcasting information
  Object.keys(actorData._classes).forEach((classKey) => {
    const curClass = actorData._classes[classKey];
    const spellClass = curClass.spellcasting.progression;
    if (spellClass !== 'none') {
      spellCasting.push(classKey);
      spellCastingString.push(curClass.name);
    }
    if (hitDieMultiple[curClass.system.hitDice]) {
      hitDieMultiple[curClass.system.hitDice] = {
        current: hitDieMultiple[curClass.system.hitDice].current + curClass.system.levels,
        max: hitDieMultiple[curClass.system.hitDice].max + curClass.system.levels,
      };
    } else {
      hitDieMultiple[curClass.system.hitDice] = {
        current: curClass.system.levels,
        max: curClass.system.levels,
      };
    }
    if (hitDie.value === '') {
      hitDie.value = curClass.system.hitDice;
    } else {
      hitDie.value = 'multiclass';
    }
    // charClass.push(`${curClass.name} (${curClass.system.levels}) ${curClass._classLink.name}`);
    charClass.push(`${curClass.name} (${curClass.system.levels})`);
  });

  // Get spell slots and pact magic
  Object.keys(spells).forEach((spellSlotKey) => {
    const spellSlot = spells[spellSlotKey];
    if (spellSlotKey === 'pact') {
      if (spellSlot.level !== 0) {
        pactSpell = { [`slots-${spellSlot.level}`]: { value: spellSlot.max } };
      }
    } else {
      lssSpells = {
        ...lssSpells,
        [`spells-level-${spellSlot.level}`]: {
          value: {
            id: `hover-toolbar-spells-level-${spellSlot.level}-${randomId[spellSlot.level]}`,
            data: {
              type: 'doc',
              content: [],
            },
          },
        },
      };
      spellSlots[spellSlotKey.replace(/^spell/, 'slots-')] = {
        value: spellSlot.max,
        filled: spellSlot.max,
      };
    }
  });

  // Get stats
  for (let ab in abilities) {
    lssStats[ab] = {
      name: ab,
      label: CONFIG.DND5E.abilities[ab].label,
      score: abilities[ab].value,
      modifier: 0,
      check: 0,
    };
    lssSaves[ab] = {
      name: ab,
      isProf: !!abilities[ab].proficient,
    };
  }

  // Get skills
  for (let skill in skills) {
    lssSkills[fttSkillsKeys[skill].lssSkill] = {
      baseStat: skills[skill].ability,
      name: fttSkillsKeys[skill].lssSkill,
      label: CONFIG.DND5E.skills[skill].label,
      isProf: skills[skill].proficient,
    };
  }

  // Get items, spells, and features
  items.forEach((item) => {
    switch (item.type) {
      case 'spell': {
        if (['rsak', 'msak'].includes(item.system.actionType) && item.system.level === 0) {
          const weaponStats = getWeaponStats(item, actorData);
          lssWeapons.push(getWeaponObject({
            ...item,
            ...weaponStats,
            parent: actorData,
          }));
        }
        lssSpells[`spells-level-${item.system.level}`].value.data.content.push(textTemplate(item.name));
        break;
      }
      case 'equipment': {
        lssEquipment.equipment.value.data.content.push(textTemplate(item.name));
        break;
      }
      case 'weapon': {
        const weaponStats = getWeaponStats(item);
        if (useInteractiveBlocks) {
          lssWeapons.push(getWeaponObject({
            ...item,
            ...weaponStats,
          }));
        } else {
          lssAttacks.attacks.value.data.content.push(textTemplate(`${item.name} ${weaponStats.label}`));
        }
        break;
      }
      case 'feat': {
        if (item.system.activation?.type !== null && item.system.uses.max > 0 && useInteractiveBlocks) {
          const { id, item: resourceItem } = getResource(item);
          lssResource[id] = resourceItem;
          insertTrait({
            type: 'resource',
            id,
            textName: 'traits',
          });
        } else {
          insertTrait({
            text: textTemplate(item.name),
          });
        }
        break;
      }
      case 'consumable':
      case 'container':
      case 'loot': {
        lssItems.items.value.data.content.push(textTemplate(item.name));
        break;
      }
      default: {
        break;
      }
    }
  });

  // Get traits
  const weapons = await getWeapons({
    pack: itemsPack,
    itemIds: CONFIG.DND5E.weaponIds,
    weaponProfs: CONFIG.DND5E.weaponProficiencies,
  });
  const armors = await getArmor({
    pack: itemsPack,
    itemIds: CONFIG.DND5E.armorIds,
    armorProfs: CONFIG.DND5E.armorProficiencies,
  });
  const tools = await getTools({
    pack: itemsPack,
    itemIds: CONFIG.DND5E.toolIds,
    toolsProfs: CONFIG.DND5E.vehicleTypes,
  });

  traitStrings = getTraits({
    traits,
    languages: collectLanguages(CONFIG.DND5E.languages),
    weapons,
    armors,
    tools,
    actorTools,
  });
  lssProf.value.data.content = traitStrings.map((trait) => textTemplate(trait));

  // Set LSS data
  const lssData = {
    isDefault: true,
    jsonType: 'character',
    template: 'default',
    name: { value: actorData.name },
    info: {
      charClass: {
        name: 'charClass',
        label: 'класс и уровень',
        value: charClass.length > 1
          ? charClass.map(cls => `${cls.split(' ')[0].slice(0, 4)} (${cls.split(' (')[1]}`).join(' / ')
          : charClass[0],
      },
      level: { name: 'level', label: 'уровень', value: details.level },
      background: {
        name: 'background',
        label: 'предыстория',
        value: details.background.name,
      },
      playerName: { name: 'playerName', label: 'имя игрока', value: '' },
      race: { name: 'race', label: 'раса', value: details.race.name },
      alignment: {
        name: 'alignment',
        label: 'мировоззрение',
        value: details.alignment,
      },
      experience: {
        name: 'experience',
        label: 'опыт',
        value: details.xp.value,
      },
    },
    subInfo: {
      age: { name: 'age', label: 'возраст', value: details.age },
      height: { name: 'height', label: 'рост', value: details.height },
      weight: { name: 'weight', label: 'вес', value: details.weight },
      eyes: { name: 'eyes', label: 'глаза', value: details.eyes },
      skin: { name: 'skin', label: 'кожа', value: details.skin },
      hair: { name: 'hair', label: 'волосы', value: details.hair },
    },
    spellsInfo: {
      base: {
        name: 'base',
        label: 'Базовая характеристика заклинаний',
        value: CONFIG.DND5E.abilities[attributes.spellcasting].label,
        code: attributes.spellcasting,
      },
      save: {
        name: 'save',
        label: 'Сложность спасброска',
        value: attributes.spelldc,
      },
      mod: {
        name: 'mod',
        label: 'Бонус атаки заклинанием',
        value: attributes.spellmod + attributes.prof,
      },
      available: { classes: spellCasting },
    },
    spells: spellSlots,
    spellsPact: pactSpell,
    proficiency: attributes.prof,
    stats: lssStats,
    saves: lssSaves,
    skills: lssSkills,
    vitality: {
      'hp-dice-current': { value: attributes.hd },
      'hit-die': hitDie,
      'hp-dice-multi': hitDieMultiple,
      ac: { value: attributes.ac.value },
      speed: { value: attributes.movement.walk },
      initiative: { value: attributes.init.total },
      'hp-max': { value: attributes.hp.max },
      'hp-current': { value: attributes.hp.value },
      'hp-temp': { value: attributes.hp.temp },
      isDying: false,
      deathFails: 0,
      deathSuccesses: 0,
    },
    text: {
      prof: lssProf,
      ...lssEquipment,
      ...lssSpells,
      ...lssAttacks,
      ...lssTraits,
      ...lssItems,
      ...lssFeatures,
      ...characterTraits,
    },
    isHidden: false,
    traits: {
      value: { id: 'hover-toolbar-traits', data: { type: 'doc', content: [] } },
    },
    background: {
      value: {
        id: 'hover-toolbar-background',
        data: { type: 'doc', content: [] },
      },
    },
    size: 9,
    coins: {
      cp: { value: currency.cp },
      ep: { value: currency.ep },
      gp: { value: currency.gp },
      pp: { value: currency.pp },
      sp: { value: currency.sp },
    },
    casterClass: { value: spellCastingString.join(', ') }, // no direct mapping found
    weaponsList: lssWeapons,
    resources: lssResource,
  };

  return {
    tags: [],
    disabledBlocks: {
      'info-left': [],
      'info-right': [],
      'notes-left': [],
      'notes-right': [],
    },
    spells: { mode: 'text', prepared: [], book: [] },
    data: JSON.stringify(lssData),
    jsonType: 'character',
    version: '2',
  };
};

export default convertFoundryToLss;
