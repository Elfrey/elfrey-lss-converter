/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/_module.js":
/*!************************!*\
  !*** ./src/_module.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   moduleName: () => (/* binding */ moduleName)
/* harmony export */ });
const moduleName = 'elfrey-lss-converter';


/***/ }),

/***/ "./src/module/collectLanguages.js":
/*!****************************************!*\
  !*** ./src/module/collectLanguages.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((languagesData) => {
  let result = {};

  function traverse(node) {
    if (typeof node === 'object' && node !== null) {
      if (node.children) {
        traverse(node.children);
      } else {
        for (let key in node) {
          if (typeof node[key] === 'object' && node[key] !== null) {
            traverse(node[key]);
          } else {
            result[key] = node[key];
          }
        }
      }
    }
  }

  traverse(languagesData);
  result["druidic"] = languagesData.druidic;
  result["cant"] = languagesData.cant;
  return result;
});


/***/ }),

/***/ "./src/module/convert.js":
/*!*******************************!*\
  !*** ./src/module/convert.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generateUniqueIds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateUniqueIds */ "./src/module/generateUniqueIds.js");
/* harmony import */ var _collectLanguages_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collectLanguages.js */ "./src/module/collectLanguages.js");
/* harmony import */ var _getTraits_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getTraits.js */ "./src/module/getTraits.js");
/* harmony import */ var _getWeapons_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWeapons.js */ "./src/module/getWeapons.js");
/* harmony import */ var _getArmor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getArmor.js */ "./src/module/getArmor.js");
/* harmony import */ var _getTools_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getTools.js */ "./src/module/getTools.js");
/* harmony import */ var _htmlToLssJson_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./htmlToLssJson.js */ "./src/module/htmlToLssJson.js");
/* harmony import */ var _getWeaponStats__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWeaponStats */ "./src/module/getWeaponStats.js");
/* harmony import */ var _getWeaponObject__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getWeaponObject */ "./src/module/getWeaponObject.js");
/* harmony import */ var _getResource__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getResource */ "./src/module/getResource.js");
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_module */ "./src/_module.js");
/* global CONFIG, game */















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
  const useInteractiveBlocks = game.settings.get(_module__WEBPACK_IMPORTED_MODULE_10__.moduleName, 'interactive-blocks');
  const randomId = (0,_generateUniqueIds__WEBPACK_IMPORTED_MODULE_0__["default"])(20);
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
            (0,_htmlToLssJson_js__WEBPACK_IMPORTED_MODULE_6__["default"])(details.biography.value),
        },
      },
    },
    'personality': {
      'value': {
        'id': `hover-toolbar-personality-${randomId[16]}`,
        'data': {
          'type': 'doc',
          'content':
            (0,_htmlToLssJson_js__WEBPACK_IMPORTED_MODULE_6__["default"])(details.trait),
        },
      },
    },
    'ideals': {
      'value': {
        'id': `hover-toolbar-ideals-${randomId[17]}`,
        'data': {
          'type': 'doc',
          'content':
            (0,_htmlToLssJson_js__WEBPACK_IMPORTED_MODULE_6__["default"])(details.ideal),
        },
      },
    },
    'bonds': {
      'value': {
        'id': `hover-toolbar-bonds-${randomId[18]}`,
        'data': {
          'type': 'doc',
          'content':
            (0,_htmlToLssJson_js__WEBPACK_IMPORTED_MODULE_6__["default"])(details.bond),
        },
      },
    },
    'flaws': {
      'value': {
        'id': `hover-toolbar-flaws-${randomId[19]}`,
        'data': {
          'type': 'doc',
          'content':
            (0,_htmlToLssJson_js__WEBPACK_IMPORTED_MODULE_6__["default"])(details.flaw),
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
          const weaponStats = (0,_getWeaponStats__WEBPACK_IMPORTED_MODULE_7__["default"])(item, actorData);
          lssWeapons.push((0,_getWeaponObject__WEBPACK_IMPORTED_MODULE_8__["default"])({
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
        const weaponStats = (0,_getWeaponStats__WEBPACK_IMPORTED_MODULE_7__["default"])(item);
        if (useInteractiveBlocks) {
          lssWeapons.push((0,_getWeaponObject__WEBPACK_IMPORTED_MODULE_8__["default"])({
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
          const { id, item: resourceItem } = (0,_getResource__WEBPACK_IMPORTED_MODULE_9__["default"])(item);
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
  const weapons = await (0,_getWeapons_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    pack: itemsPack,
    itemIds: CONFIG.DND5E.weaponIds,
    weaponProfs: CONFIG.DND5E.weaponProficiencies,
  });
  const armors = await (0,_getArmor_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
    pack: itemsPack,
    itemIds: CONFIG.DND5E.armorIds,
    armorProfs: CONFIG.DND5E.armorProficiencies,
  });
  const tools = await (0,_getTools_js__WEBPACK_IMPORTED_MODULE_5__["default"])({
    pack: itemsPack,
    itemIds: CONFIG.DND5E.toolIds,
    toolsProfs: CONFIG.DND5E.vehicleTypes,
  });

  traitStrings = (0,_getTraits_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    traits,
    languages: (0,_collectLanguages_js__WEBPACK_IMPORTED_MODULE_1__["default"])(CONFIG.DND5E.languages),
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (convertFoundryToLss);


/***/ }),

/***/ "./src/module/generateUniqueIds.js":
/*!*****************************************!*\
  !*** ./src/module/generateUniqueIds.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((count = 1) => {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push(Date.now().toString() + Math.floor(Math.random() * 1000).toString().padStart(3, '0'));
  }
  return ids;
});


/***/ }),

/***/ "./src/module/getArmor.js":
/*!********************************!*\
  !*** ./src/module/getArmor.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global CONFIG, game */



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async ({pack, itemIds, armorProfs}) => {
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
});



/***/ }),

/***/ "./src/module/getResource.js":
/*!***********************************!*\
  !*** ./src/module/getResource.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generateUniqueIds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateUniqueIds */ "./src/module/generateUniqueIds.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((item, location = 'traits') => {
  const id = (0,_generateUniqueIds__WEBPACK_IMPORTED_MODULE_0__["default"])();
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
});


/***/ }),

/***/ "./src/module/getTools.js":
/*!********************************!*\
  !*** ./src/module/getTools.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global CONFIG, game */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async ({pack, itemIds, toolsProfs}) => {
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
    ...toolsProfs,
  };
});



/***/ }),

/***/ "./src/module/getTraits.js":
/*!*********************************!*\
  !*** ./src/module/getTraits.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({traits, languages, weapons, armors, tools, actorTools}) => {
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
});


/***/ }),

/***/ "./src/module/getWeaponObject.js":
/*!***************************************!*\
  !*** ./src/module/getWeaponObject.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generateUniqueIds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateUniqueIds */ "./src/module/generateUniqueIds.js");


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((item) => {
  return {
    'id': `weapon-${(0,_generateUniqueIds__WEBPACK_IMPORTED_MODULE_0__["default"])()[0]}`,
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
});


/***/ }),

/***/ "./src/module/getWeaponStats.js":
/*!**************************************!*\
  !*** ./src/module/getWeaponStats.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((weapon) => {
  const bonus = calculateBonus(weapon.getAttackToHit());
  // const damage = weapon.getDerivedDamageLabel().map(({label}) => label).join(', ');
  const damage = transformDamageArray(weapon.getDerivedDamageLabel());
  return {
    bonus,
    damage,
    label: `(атака +${bonus}, урон ${damage})`,
  }
});


/***/ }),

/***/ "./src/module/getWeapons.js":
/*!**********************************!*\
  !*** ./src/module/getWeapons.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global CONFIG, game */



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async ({pack, itemIds, weaponProfs}) => {
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
    ...weaponProfs,
  };
});



/***/ }),

/***/ "./src/module/htmlToLssJson.js":
/*!*************************************!*\
  !*** ./src/module/htmlToLssJson.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((htmlString) => {
  // Create a new DOM parser
  const parser = new DOMParser();
  // Parse the HTML string
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Helper function to process text nodes with inline styles
  function processTextNodes(node) {
    const result = [];
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.textContent.trim().length > 0) {
          result.push({
            type: 'text',
            text: child.textContent.trim()
          });
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        let marks = [];
        if (child.tagName === 'STRONG') {
          marks.push({ type: 'bold' });
        }
        if (child.tagName === 'EM') {
          marks.push({ type: 'italic' });
        }
        if (child.tagName === 'SPAN' && child.style.textDecoration === 'underline') {
          marks.push({ type: 'underline' });
        }
        if (marks.length > 0) {
          result.push({
            type: 'text',
            marks: marks,
            text: `${child.textContent.trim()} `
          });
        } else {
          // Handle other inline styles if needed
          result.push({
            type: 'text',
            text: `${child.textContent.trim()} `
          });
        }
      }
    });
    return result;
  }

  // Function to convert a <p> tag to the specified object format
  function convertParagraph(p) {
    return {
      type: 'paragraph',
      content: processTextNodes(p)
    };
  }

  // Extract all paragraph elements from the HTML
  const paragraphs = doc.querySelectorAll('p');
  const result = [];

  paragraphs.forEach(p => {
    if (p.textContent.trim().length > 0) {
      result.push(convertParagraph(p));
    }
  });

  return result;
});


/***/ }),

/***/ "./src/module/saveToFile.js":
/*!**********************************!*\
  !*** ./src/module/saveToFile.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global saveDataToFile */

function saveJsonFile(data, fileName) {
  // Convert data to JSON string
  const jsonString = JSON.stringify(data, null, 2);
  saveDataToFile(jsonString, 'application/json', `${fileName}-lss.json`);
  // // Create a Blob from the JSON string
  // const blob = new Blob([jsonString], { type: "application/json" });
  //
  // // Use the saveAs function from FileSaver.js
  // saveAs(blob, fileName);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveJsonFile);


/***/ }),

/***/ "./src/module/uidFromString.js":
/*!*************************************!*\
  !*** ./src/module/uidFromString.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((inputString) => {
  // Simple hash function to convert string to a number
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash; // Convert to 32-bit integer
    }
    return hash;
  }

  // Convert hash to a positive number
  function toPositiveNumber(num) {
    return num >>> 0;
  }

  // Pad the number to ensure it has exactly 12 digits
  function padTo12Digits(num) {
    return String(num).padStart(12, '0').slice(-12);
  }

  const hash = hashString(inputString);
  const positiveHash = toPositiveNumber(hash);
  const uniqueId = padTo12Digits(positiveHash);

  return uniqueId;
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/module.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/convert */ "./src/module/convert.js");
/* harmony import */ var _module_saveToFile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/saveToFile */ "./src/module/saveToFile.js");
/* harmony import */ var _module_uidFromString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/uidFromString */ "./src/module/uidFromString.js");
/* harmony import */ var _module_generateUniqueIds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module/generateUniqueIds */ "./src/module/generateUniqueIds.js");
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_module */ "./src/_module.js");
/* global game */





function createActorHeaderButton(config, buttons) {
    const buttonLabel = game.i18n.localize('ELSS.CONVERT');
    if (config.object instanceof Actor) {
        buttons.unshift({
            label: buttonLabel,
            class: 'elss-actor',
            icon: 'fa-solid fa-language',
            onclick: async () => {
                console.clear();
                const jsonString = await (0,_module_convert__WEBPACK_IMPORTED_MODULE_0__["default"])(config.object);
                console.debug('jsonString', jsonString);
            },
        });
    }
}
Hooks.once('ready', async function () {
    Hooks.on('getActorSheet5eHeaderButtons', createActorHeaderButton);
    game.settings.register(_module__WEBPACK_IMPORTED_MODULE_4__.moduleName, 'interactive-blocks', {
        'name': 'Использовать интерактивные блоки',
        'hint': 'При экспорте атаки и способности, которые можно использовать, будут оформлены интерактивными блоками, а не просто текстом',
        'scope': 'world',
        'config': true,
        'type': Boolean,
        'default': true,
    });
});
Hooks.on('getActorDirectoryEntryContext', (data, options) => {
    console.debug('data', data);
    options.push({
        name: 'ELSS.CONVERT',
        icon: '<i class="fas fa-print"></i>',
        callback: async ([entry]) => {
            var _a;
            const actorId = entry.dataset.documentId;
            const actor = (_a = game.actors) === null || _a === void 0 ? void 0 : _a.get(actorId);
            if (actor) {
                const jsonString = await (0,_module_convert__WEBPACK_IMPORTED_MODULE_0__["default"])(actor);
                (0,_module_saveToFile__WEBPACK_IMPORTED_MODULE_1__["default"])(jsonString, actor === null || actor === void 0 ? void 0 : actor.name);
            }
        },
        condition: (li) => {
            var _a;
            const actorId = li.data('documentId');
            const actor = (_a = game.actors) === null || _a === void 0 ? void 0 : _a.get(actorId);
            // Show the option only if the actor is a player character (PC)
            return actor && actor.data.type === 'character';
        },
    });
});
// --------------------------------
if (true) {
    // @ts-ignore
    window.runTmpTest = (runs = 10) => {
        // Example usage and performance measurement using Performance API
        const inputString = 'exampleString';
        performance.mark('startU');
        const uniqueIds = [];
        for (let i = 0; i < runs; i++) {
            uniqueIds.push((0,_module_uidFromString__WEBPACK_IMPORTED_MODULE_2__["default"])(`${inputString}-${i}`));
        }
        // const uniqueId = uidFromString(inputString);
        performance.mark('endU');
        performance.measure('uidFromString', 'startU', 'endU');
        performance.mark('startR');
        const randomIds = [];
        for (let i = 0; i < runs; i++) {
            randomIds.push((0,_module_generateUniqueIds__WEBPACK_IMPORTED_MODULE_3__["default"])()[0]);
        }
        // const randomId = generateUniqueIds();
        performance.mark('endR');
        performance.measure('generateUniqueIds', 'startR', 'endR');
        const measure = performance.getEntriesByName('uidFromString')[0];
        console.debug(`Unique ID`, uniqueIds); // Outputs a 12-digit unique ID
        console.debug(`Time taken for Unique id: ${measure.duration} ms`); // Outputs the time taken in milliseconds
        const measureR = performance.getEntriesByName('generateUniqueIds')[0];
        console.debug('Random ID', randomIds);
        console.debug(`Time taken for random id: ${measureR.duration} ms`); // Outputs the time taken in milliseconds
        // Clear the marks and measures to avoid memory leaks
        performance.clearMarks();
        performance.clearMeasures();
    };
    if (false) {}
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsU0FBUyxDQUFDLElBQUksQ0FBQyxxRUFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFDRCx3Q0FBd0M7UUFDeEMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixXQUFXLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUzRCxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakUsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQywrQkFBK0I7UUFDdEUsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsT0FBTyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7UUFFNUcsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsUUFBUSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7UUFHakgscURBQXFEO1FBQ2pELFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxLQUFVLEVBQUUsRUFTZjtDQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvX21vZHVsZS5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvY29sbGVjdExhbmd1YWdlcy5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvY29udmVydC5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvZ2VuZXJhdGVVbmlxdWVJZHMuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2dldEFybW9yLmpzIiwid2VicGFjazovL2VsZnJleS1sc3MtY29udmVudmVyLy4vc3JjL21vZHVsZS9nZXRSZXNvdXJjZS5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvZ2V0VG9vbHMuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2dldFRyYWl0cy5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvZ2V0V2VhcG9uT2JqZWN0LmpzIiwid2VicGFjazovL2VsZnJleS1sc3MtY29udmVudmVyLy4vc3JjL21vZHVsZS9nZXRXZWFwb25TdGF0cy5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvZ2V0V2VhcG9ucy5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvaHRtbFRvTHNzSnNvbi5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvc2F2ZVRvRmlsZS5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvdWlkRnJvbVN0cmluZy5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VsZnJleS1sc3MtY29udmVudmVyLy4vc3JjL21vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgbW9kdWxlTmFtZSA9ICdlbGZyZXktbHNzLWNvbnZlcnRlcic7XG4iLCJleHBvcnQgZGVmYXVsdCAobGFuZ3VhZ2VzRGF0YSkgPT4ge1xuICBsZXQgcmVzdWx0ID0ge307XG5cbiAgZnVuY3Rpb24gdHJhdmVyc2Uobm9kZSkge1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcgJiYgbm9kZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgdHJhdmVyc2Uobm9kZS5jaGlsZHJlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbm9kZSkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZVtrZXldID09PSAnb2JqZWN0JyAmJiBub2RlW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRyYXZlcnNlKG5vZGVba2V5XSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gbm9kZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRyYXZlcnNlKGxhbmd1YWdlc0RhdGEpO1xuICByZXN1bHRbXCJkcnVpZGljXCJdID0gbGFuZ3VhZ2VzRGF0YS5kcnVpZGljO1xuICByZXN1bHRbXCJjYW50XCJdID0gbGFuZ3VhZ2VzRGF0YS5jYW50O1xuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLyogZ2xvYmFsIENPTkZJRywgZ2FtZSAqL1xyXG5cclxuXHJcbmltcG9ydCBnZW5lcmF0ZVVuaXF1ZUlkcyBmcm9tICcuL2dlbmVyYXRlVW5pcXVlSWRzJztcclxuaW1wb3J0IGNvbGxlY3RMYW5ndWFnZXMgZnJvbSAnLi9jb2xsZWN0TGFuZ3VhZ2VzLmpzJztcclxuaW1wb3J0IGdldFRyYWl0cyBmcm9tICcuL2dldFRyYWl0cy5qcyc7XHJcbmltcG9ydCBnZXRXZWFwb25zIGZyb20gJy4vZ2V0V2VhcG9ucy5qcyc7XHJcbmltcG9ydCBnZXRBcm1vciBmcm9tICcuL2dldEFybW9yLmpzJztcclxuaW1wb3J0IGdldFRvb2xzIGZyb20gJy4vZ2V0VG9vbHMuanMnO1xyXG5pbXBvcnQgaHRtbFRvTHNzSnNvbiBmcm9tICcuL2h0bWxUb0xzc0pzb24uanMnO1xyXG5pbXBvcnQgZ2V0V2VhcG9uU3RhdHMgZnJvbSAnLi9nZXRXZWFwb25TdGF0cyc7XHJcbmltcG9ydCBnZXRXZWFwb25PYmplY3QgZnJvbSAnLi9nZXRXZWFwb25PYmplY3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnLi9nZXRSZXNvdXJjZSc7XHJcbmltcG9ydCB7IG1vZHVsZU5hbWUgfSBmcm9tICcuLi9fbW9kdWxlJztcclxuXHJcblxyXG5jb25zdCB0ZXh0VGVtcGxhdGUgPSAodGV4dCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiAncGFyYWdyYXBoJyxcclxuICAgIGNvbnRlbnQ6IFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICB0ZXh0LFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9O1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGZ0dFNraWxsc0tleXMgPSB7XHJcbiAgYWNyOiB7XHJcbiAgICBiYXNlU3RhdDogJ2RleCcsXHJcbiAgICBuYW1lOiAnYWNyb2JhdGljcycsXHJcbiAgICBsYWJlbDogJ9CQ0LrRgNC+0LHQsNGC0LjQutCwJyxcclxuICAgIGxzc1NraWxsOiAnYWNyb2JhdGljcycsXHJcbiAgfSxcclxuICBhbmk6IHtcclxuICAgIGJhc2VTdGF0OiAnd2lzJyxcclxuICAgIG5hbWU6ICdhbmltYWxIYW5kbGluZycsXHJcbiAgICBsYWJlbDogJ9CU0YDQtdGB0YHQuNGA0L7QstC60LAnLFxyXG4gICAgbHNzU2tpbGw6ICdhbmltYWwgaGFuZGxpbmcnLFxyXG4gIH0sXHJcbiAgYXJjOiB7XHJcbiAgICBiYXNlU3RhdDogJ2ludCcsXHJcbiAgICBuYW1lOiAnYXJjYW5hJyxcclxuICAgIGxhYmVsOiAn0JzQsNCz0LjRjycsXHJcbiAgICBsc3NTa2lsbDogJ2FyY2FuYScsXHJcbiAgfSxcclxuICBhdGg6IHtcclxuICAgIGJhc2VTdGF0OiAnc3RyJyxcclxuICAgIG5hbWU6ICdhdGhsZXRpY3MnLFxyXG4gICAgbGFiZWw6ICfQkNGC0LvQtdGC0LjQutCwJyxcclxuICAgIGxzc1NraWxsOiAnYXRobGV0aWNzJyxcclxuICB9LFxyXG4gIGRlYzoge1xyXG4gICAgYmFzZVN0YXQ6ICdjaGEnLFxyXG4gICAgbmFtZTogJ2RlY2VwdGlvbicsXHJcbiAgICBsYWJlbDogJ9Ce0LHQvNCw0L0nLFxyXG4gICAgbHNzU2tpbGw6ICdkZWNlcHRpb24nLFxyXG4gIH0sXHJcbiAgaGlzOiB7XHJcbiAgICBiYXNlU3RhdDogJ2ludCcsXHJcbiAgICBuYW1lOiAnaGlzdG9yeScsXHJcbiAgICBsYWJlbDogJ9CY0YHRgtC+0YDQuNGPJyxcclxuICAgIGxzc1NraWxsOiAnaGlzdG9yeScsXHJcbiAgfSxcclxuICBpbnM6IHtcclxuICAgIGJhc2VTdGF0OiAnd2lzJyxcclxuICAgIG5hbWU6ICdpbnNpZ2h0JyxcclxuICAgIGxhYmVsOiAn0J/RgNC+0L3QuNGG0LDRgtC10LvRjNC90L7RgdGC0YwnLFxyXG4gICAgbHNzU2tpbGw6ICdpbnNpZ2h0JyxcclxuICB9LFxyXG4gIGludjoge1xyXG4gICAgYmFzZVN0YXQ6ICdpbnQnLFxyXG4gICAgbmFtZTogJ2ludmVzdGlnYXRpb24nLFxyXG4gICAgbGFiZWw6ICfQoNCw0YHRgdC70LXQtNC+0LLQsNC90LjQtScsXHJcbiAgICBsc3NTa2lsbDogJ2ludmVzdGlnYXRpb24nLFxyXG4gIH0sXHJcbiAgaXRtOiB7XHJcbiAgICBiYXNlU3RhdDogJ2NoYScsXHJcbiAgICBuYW1lOiAnaW50aW1pZGF0aW9uJyxcclxuICAgIGxhYmVsOiAn0JfQsNC/0YPQs9C40LLQsNC90LjQtScsXHJcbiAgICBsc3NTa2lsbDogJ2ludGltaWRhdGlvbicsXHJcbiAgfSxcclxuICBtZWQ6IHtcclxuICAgIGJhc2VTdGF0OiAnd2lzJyxcclxuICAgIG5hbWU6ICdtZWRpY2luZScsXHJcbiAgICBsYWJlbDogJ9Cc0LXQtNC40YbQuNC90LAnLFxyXG4gICAgbHNzU2tpbGw6ICdtZWRpY2luZScsXHJcbiAgfSxcclxuICBuYXQ6IHtcclxuICAgIGJhc2VTdGF0OiAnaW50JyxcclxuICAgIG5hbWU6ICduYXR1cmUnLFxyXG4gICAgbGFiZWw6ICfQn9GA0LjRgNC+0LTQsCcsXHJcbiAgICBsc3NTa2lsbDogJ25hdHVyZScsXHJcbiAgfSxcclxuICBwZXI6IHtcclxuICAgIGJhc2VTdGF0OiAnY2hhJyxcclxuICAgIG5hbWU6ICdwZXJzdWFzaW9uJyxcclxuICAgIGxhYmVsOiAn0KPQsdC10LbQtNC10L3QuNC1JyxcclxuICAgIGxzc1NraWxsOiAncGVyc3Vhc2lvbicsXHJcbiAgfSxcclxuICBwcmM6IHtcclxuICAgIGJhc2VTdGF0OiAnd2lzJyxcclxuICAgIG5hbWU6ICdwZXJjZXB0aW9uJyxcclxuICAgIGxhYmVsOiAn0JLQvdC40LzQsNC90LjQtScsXHJcbiAgICBsc3NTa2lsbDogJ3BlcmNlcHRpb24nLFxyXG4gIH0sXHJcbiAgcHJmOiB7XHJcbiAgICBiYXNlU3RhdDogJ2NoYScsXHJcbiAgICBuYW1lOiAncGVyZm9ybWFuY2UnLFxyXG4gICAgbGFiZWw6ICfQmNGB0L/QvtC70L3QtdC90LjQtScsXHJcbiAgICBsc3NTa2lsbDogJ3BlcmZvcm1hbmNlJyxcclxuICB9LFxyXG4gIHJlbDoge1xyXG4gICAgYmFzZVN0YXQ6ICdpbnQnLFxyXG4gICAgbmFtZTogJ3JlbGlnaW9uJyxcclxuICAgIGxhYmVsOiAn0KDQtdC70LjQs9C40Y8nLFxyXG4gICAgbHNzU2tpbGw6ICdyZWxpZ2lvbicsXHJcbiAgfSxcclxuICBzbHQ6IHtcclxuICAgIGJhc2VTdGF0OiAnZGV4JyxcclxuICAgIG5hbWU6ICdzbGVpZ2h0T2ZIYW5kJyxcclxuICAgIGxhYmVsOiAn0JvQvtCy0LrQvtGB0YLRjCDRgNGD0LonLFxyXG4gICAgbHNzU2tpbGw6ICdzbGVpZ2h0IG9mIGhhbmQnLFxyXG4gIH0sXHJcbiAgc3RlOiB7XHJcbiAgICBiYXNlU3RhdDogJ2RleCcsXHJcbiAgICBuYW1lOiAnc3RlYWx0aCcsXHJcbiAgICBsYWJlbDogJ9Ch0LrRgNGL0YLQvdC+0YHRgtGMJyxcclxuICAgIGxzc1NraWxsOiAnc3RlYWx0aCcsXHJcbiAgfSxcclxuICBzdXI6IHtcclxuICAgIGJhc2VTdGF0OiAnd2lzJyxcclxuICAgIG5hbWU6ICdzdXJ2aXZhbCcsXHJcbiAgICBsYWJlbDogJ9CS0YvQttC40LLQsNC90LjQtScsXHJcbiAgICBsc3NTa2lsbDogJ3N1cnZpdmFsJyxcclxuICB9LFxyXG59O1xyXG5cclxuY29uc3QgY29udmVydEZvdW5kcnlUb0xzcyA9IGFzeW5jIChhY3RvckRhdGEpID0+IHtcclxuICBjb25zdCB1c2VJbnRlcmFjdGl2ZUJsb2NrcyA9IGdhbWUuc2V0dGluZ3MuZ2V0KG1vZHVsZU5hbWUsICdpbnRlcmFjdGl2ZS1ibG9ja3MnKTtcclxuICBjb25zdCByYW5kb21JZCA9IGdlbmVyYXRlVW5pcXVlSWRzKDIwKTtcclxuICBjb25zdCBpdGVtc1BhY2sgPSBnYW1lLnBhY2tzLmdldCgnZG5kNWUuaXRlbXMnKTtcclxuICBjb25zdCB7XHJcbiAgICBhYmlsaXRpZXMsXHJcbiAgICBhdHRyaWJ1dGVzLFxyXG4gICAgZGV0YWlscyxcclxuICAgIHNraWxscyxcclxuICAgIHNwZWxscyxcclxuICAgIGN1cnJlbmN5LFxyXG4gICAgdHJhaXRzLFxyXG4gICAgdG9vbHM6IGFjdG9yVG9vbHMsXHJcbiAgfSA9IGFjdG9yRGF0YS5zeXN0ZW07XHJcbiAgY29uc3QgeyBpdGVtcyB9ID0gYWN0b3JEYXRhO1xyXG5cclxuICBsZXQgbHNzU3BlbGxzID0ge1xyXG4gICAgJ3NwZWxscy1sZXZlbC0wJzoge1xyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIGlkOiBgaG92ZXItdG9vbGJhci1zcGVsbHMtbGV2ZWwtMC0ke3JhbmRvbUlkWzBdfWAsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdHlwZTogJ2RvYycsXHJcbiAgICAgICAgICBjb250ZW50OiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG4gIGNvbnN0IGxzc0VxdWlwbWVudCA9IHtcclxuICAgIGVxdWlwbWVudDoge1xyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIGlkOiBgaG92ZXItdG9vbGJhci1lcXVpcG1lbnQtJHtyYW5kb21JZFsxMF19YCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0eXBlOiAnZG9jJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbiAgY29uc3QgbHNzQXR0YWNrcyA9IHtcclxuICAgIGF0dGFja3M6IHtcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBpZDogYGhvdmVyLXRvb2xiYXItYXR0YWNrcy0ke3JhbmRvbUlkWzEyXX1gLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHR5cGU6ICdkb2MnLFxyXG4gICAgICAgICAgY29udGVudDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuICBjb25zdCBsc3NUcmFpdHMgPSB7XHJcbiAgICB0cmFpdHM6IHtcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBpZDogYGhvdmVyLXRvb2xiYXItdHJhaXRzLSR7cmFuZG9tSWRbMTJdfWAsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdHlwZTogJ2RvYycsXHJcbiAgICAgICAgICBjb250ZW50OiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG4gIGNvbnN0IGluc2VydFRyYWl0ID0gKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICB9KSA9PiB7XHJcbiAgICBjb25zdCB0bXBUcmFpdCA9IHR5cGUgPT09ICdyZXNvdXJjZScgPyB7XHJcbiAgICAgIHR5cGU6ICdyZXNvdXJjZScsXHJcbiAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGV4dE5hbWUsXHJcbiAgICAgIH0sXHJcbiAgICB9IDoge1xyXG4gICAgICAuLi50ZXh0LFxyXG4gICAgfTtcclxuICAgIGxzc1RyYWl0cy50cmFpdHMudmFsdWUuZGF0YS5jb250ZW50LnB1c2godG1wVHJhaXQpO1xyXG4gIH07XHJcbiAgY29uc3QgbHNzRmVhdHVyZXMgPSB7XHJcbiAgICBmZWF0dXJlczoge1xyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIGlkOiBgaG92ZXItdG9vbGJhci1mZWF0dXJlcy0ke3JhbmRvbUlkWzEzXX1gLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHR5cGU6ICdkb2MnLFxyXG4gICAgICAgICAgY29udGVudDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuICBjb25zdCBsc3NJdGVtcyA9IHtcclxuICAgIGl0ZW1zOiB7XHJcbiAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgaWQ6IGBob3Zlci10b29sYmFyLWl0ZW1zLSR7cmFuZG9tSWRbMTRdfWAsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdHlwZTogJ2RvYycsXHJcbiAgICAgICAgICBjb250ZW50OiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG4gIGNvbnN0IGxzc1Byb2YgPSB7XHJcbiAgICB2YWx1ZToge1xyXG4gICAgICBpZDogYGhvdmVyLXRvb2xiYXItcHJvZi0ke3JhbmRvbUlkWzExXX1gLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogJ2RvYycsXHJcbiAgICAgICAgY29udGVudDogW10sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbiAgY29uc3QgbHNzV2VhcG9ucyA9IFtdO1xyXG4gIGNvbnN0IGxzc1Jlc291cmNlID0ge307XHJcblxyXG4gIGNvbnN0IGNoYXJDbGFzcyA9IFtdO1xyXG4gIGNvbnN0IHNwZWxsQ2FzdGluZyA9IFtdO1xyXG4gIGxldCBzcGVsbENhc3RpbmdTdHJpbmcgPSBbXTtcclxuICBjb25zdCBoaXREaWUgPSB7IHZhbHVlOiAnJyB9O1xyXG4gIGNvbnN0IGhpdERpZU11bHRpcGxlID0ge307XHJcbiAgbGV0IHBhY3RTcGVsbCA9IHt9O1xyXG4gIGNvbnN0IHNwZWxsU2xvdHMgPSB7fTtcclxuICBjb25zdCBsc3NTdGF0cyA9IHt9O1xyXG4gIGNvbnN0IGxzc1NhdmVzID0ge307XHJcbiAgY29uc3QgbHNzU2tpbGxzID0ge307XHJcbiAgbGV0IHRyYWl0U3RyaW5ncyA9IFtdO1xyXG4gIGNvbnN0IGNoYXJhY3RlclRyYWl0cyA9IHtcclxuICAgICdiYWNrZ3JvdW5kJzoge1xyXG4gICAgICAnaXNIaWRkZW4nOiBmYWxzZSxcclxuICAgICAgJ3ZhbHVlJzoge1xyXG4gICAgICAgICdpZCc6IGBob3Zlci10b29sYmFyLWJhY2tncm91bmQtJHtyYW5kb21JZFsxNV19YCxcclxuICAgICAgICAnZGF0YSc6IHtcclxuICAgICAgICAgICd0eXBlJzogJ2RvYycsXHJcbiAgICAgICAgICAnY29udGVudCc6XHJcbiAgICAgICAgICAgIGh0bWxUb0xzc0pzb24oZGV0YWlscy5iaW9ncmFwaHkudmFsdWUpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgJ3BlcnNvbmFsaXR5Jzoge1xyXG4gICAgICAndmFsdWUnOiB7XHJcbiAgICAgICAgJ2lkJzogYGhvdmVyLXRvb2xiYXItcGVyc29uYWxpdHktJHtyYW5kb21JZFsxNl19YCxcclxuICAgICAgICAnZGF0YSc6IHtcclxuICAgICAgICAgICd0eXBlJzogJ2RvYycsXHJcbiAgICAgICAgICAnY29udGVudCc6XHJcbiAgICAgICAgICAgIGh0bWxUb0xzc0pzb24oZGV0YWlscy50cmFpdCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAnaWRlYWxzJzoge1xyXG4gICAgICAndmFsdWUnOiB7XHJcbiAgICAgICAgJ2lkJzogYGhvdmVyLXRvb2xiYXItaWRlYWxzLSR7cmFuZG9tSWRbMTddfWAsXHJcbiAgICAgICAgJ2RhdGEnOiB7XHJcbiAgICAgICAgICAndHlwZSc6ICdkb2MnLFxyXG4gICAgICAgICAgJ2NvbnRlbnQnOlxyXG4gICAgICAgICAgICBodG1sVG9Mc3NKc29uKGRldGFpbHMuaWRlYWwpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgJ2JvbmRzJzoge1xyXG4gICAgICAndmFsdWUnOiB7XHJcbiAgICAgICAgJ2lkJzogYGhvdmVyLXRvb2xiYXItYm9uZHMtJHtyYW5kb21JZFsxOF19YCxcclxuICAgICAgICAnZGF0YSc6IHtcclxuICAgICAgICAgICd0eXBlJzogJ2RvYycsXHJcbiAgICAgICAgICAnY29udGVudCc6XHJcbiAgICAgICAgICAgIGh0bWxUb0xzc0pzb24oZGV0YWlscy5ib25kKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgICdmbGF3cyc6IHtcclxuICAgICAgJ3ZhbHVlJzoge1xyXG4gICAgICAgICdpZCc6IGBob3Zlci10b29sYmFyLWZsYXdzLSR7cmFuZG9tSWRbMTldfWAsXHJcbiAgICAgICAgJ2RhdGEnOiB7XHJcbiAgICAgICAgICAndHlwZSc6ICdkb2MnLFxyXG4gICAgICAgICAgJ2NvbnRlbnQnOlxyXG4gICAgICAgICAgICBodG1sVG9Mc3NKc29uKGRldGFpbHMuZmxhdyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIEdldCBjbGFzcyBhbmQgc3BlbGxjYXN0aW5nIGluZm9ybWF0aW9uXHJcbiAgT2JqZWN0LmtleXMoYWN0b3JEYXRhLl9jbGFzc2VzKS5mb3JFYWNoKChjbGFzc0tleSkgPT4ge1xyXG4gICAgY29uc3QgY3VyQ2xhc3MgPSBhY3RvckRhdGEuX2NsYXNzZXNbY2xhc3NLZXldO1xyXG4gICAgY29uc3Qgc3BlbGxDbGFzcyA9IGN1ckNsYXNzLnNwZWxsY2FzdGluZy5wcm9ncmVzc2lvbjtcclxuICAgIGlmIChzcGVsbENsYXNzICE9PSAnbm9uZScpIHtcclxuICAgICAgc3BlbGxDYXN0aW5nLnB1c2goY2xhc3NLZXkpO1xyXG4gICAgICBzcGVsbENhc3RpbmdTdHJpbmcucHVzaChjdXJDbGFzcy5uYW1lKTtcclxuICAgIH1cclxuICAgIGlmIChoaXREaWVNdWx0aXBsZVtjdXJDbGFzcy5zeXN0ZW0uaGl0RGljZV0pIHtcclxuICAgICAgaGl0RGllTXVsdGlwbGVbY3VyQ2xhc3Muc3lzdGVtLmhpdERpY2VdID0ge1xyXG4gICAgICAgIGN1cnJlbnQ6IGhpdERpZU11bHRpcGxlW2N1ckNsYXNzLnN5c3RlbS5oaXREaWNlXS5jdXJyZW50ICsgY3VyQ2xhc3Muc3lzdGVtLmxldmVscyxcclxuICAgICAgICBtYXg6IGhpdERpZU11bHRpcGxlW2N1ckNsYXNzLnN5c3RlbS5oaXREaWNlXS5tYXggKyBjdXJDbGFzcy5zeXN0ZW0ubGV2ZWxzLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGl0RGllTXVsdGlwbGVbY3VyQ2xhc3Muc3lzdGVtLmhpdERpY2VdID0ge1xyXG4gICAgICAgIGN1cnJlbnQ6IGN1ckNsYXNzLnN5c3RlbS5sZXZlbHMsXHJcbiAgICAgICAgbWF4OiBjdXJDbGFzcy5zeXN0ZW0ubGV2ZWxzLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKGhpdERpZS52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgaGl0RGllLnZhbHVlID0gY3VyQ2xhc3Muc3lzdGVtLmhpdERpY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoaXREaWUudmFsdWUgPSAnbXVsdGljbGFzcyc7XHJcbiAgICB9XHJcbiAgICAvLyBjaGFyQ2xhc3MucHVzaChgJHtjdXJDbGFzcy5uYW1lfSAoJHtjdXJDbGFzcy5zeXN0ZW0ubGV2ZWxzfSkgJHtjdXJDbGFzcy5fY2xhc3NMaW5rLm5hbWV9YCk7XHJcbiAgICBjaGFyQ2xhc3MucHVzaChgJHtjdXJDbGFzcy5uYW1lfSAoJHtjdXJDbGFzcy5zeXN0ZW0ubGV2ZWxzfSlgKTtcclxuICB9KTtcclxuXHJcbiAgLy8gR2V0IHNwZWxsIHNsb3RzIGFuZCBwYWN0IG1hZ2ljXHJcbiAgT2JqZWN0LmtleXMoc3BlbGxzKS5mb3JFYWNoKChzcGVsbFNsb3RLZXkpID0+IHtcclxuICAgIGNvbnN0IHNwZWxsU2xvdCA9IHNwZWxsc1tzcGVsbFNsb3RLZXldO1xyXG4gICAgaWYgKHNwZWxsU2xvdEtleSA9PT0gJ3BhY3QnKSB7XHJcbiAgICAgIGlmIChzcGVsbFNsb3QubGV2ZWwgIT09IDApIHtcclxuICAgICAgICBwYWN0U3BlbGwgPSB7IFtgc2xvdHMtJHtzcGVsbFNsb3QubGV2ZWx9YF06IHsgdmFsdWU6IHNwZWxsU2xvdC5tYXggfSB9O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsc3NTcGVsbHMgPSB7XHJcbiAgICAgICAgLi4ubHNzU3BlbGxzLFxyXG4gICAgICAgIFtgc3BlbGxzLWxldmVsLSR7c3BlbGxTbG90LmxldmVsfWBdOiB7XHJcbiAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICBpZDogYGhvdmVyLXRvb2xiYXItc3BlbGxzLWxldmVsLSR7c3BlbGxTbG90LmxldmVsfS0ke3JhbmRvbUlkW3NwZWxsU2xvdC5sZXZlbF19YCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdkb2MnLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFtdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICBzcGVsbFNsb3RzW3NwZWxsU2xvdEtleS5yZXBsYWNlKC9ec3BlbGwvLCAnc2xvdHMtJyldID0ge1xyXG4gICAgICAgIHZhbHVlOiBzcGVsbFNsb3QubWF4LFxyXG4gICAgICAgIGZpbGxlZDogc3BlbGxTbG90Lm1heCxcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gR2V0IHN0YXRzXHJcbiAgZm9yIChsZXQgYWIgaW4gYWJpbGl0aWVzKSB7XHJcbiAgICBsc3NTdGF0c1thYl0gPSB7XHJcbiAgICAgIG5hbWU6IGFiLFxyXG4gICAgICBsYWJlbDogQ09ORklHLkRORDVFLmFiaWxpdGllc1thYl0ubGFiZWwsXHJcbiAgICAgIHNjb3JlOiBhYmlsaXRpZXNbYWJdLnZhbHVlLFxyXG4gICAgICBtb2RpZmllcjogMCxcclxuICAgICAgY2hlY2s6IDAsXHJcbiAgICB9O1xyXG4gICAgbHNzU2F2ZXNbYWJdID0ge1xyXG4gICAgICBuYW1lOiBhYixcclxuICAgICAgaXNQcm9mOiAhIWFiaWxpdGllc1thYl0ucHJvZmljaWVudCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgc2tpbGxzXHJcbiAgZm9yIChsZXQgc2tpbGwgaW4gc2tpbGxzKSB7XHJcbiAgICBsc3NTa2lsbHNbZnR0U2tpbGxzS2V5c1tza2lsbF0ubHNzU2tpbGxdID0ge1xyXG4gICAgICBiYXNlU3RhdDogc2tpbGxzW3NraWxsXS5hYmlsaXR5LFxyXG4gICAgICBuYW1lOiBmdHRTa2lsbHNLZXlzW3NraWxsXS5sc3NTa2lsbCxcclxuICAgICAgbGFiZWw6IENPTkZJRy5ETkQ1RS5za2lsbHNbc2tpbGxdLmxhYmVsLFxyXG4gICAgICBpc1Byb2Y6IHNraWxsc1tza2lsbF0ucHJvZmljaWVudCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgaXRlbXMsIHNwZWxscywgYW5kIGZlYXR1cmVzXHJcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcclxuICAgICAgY2FzZSAnc3BlbGwnOiB7XHJcbiAgICAgICAgaWYgKFsncnNhaycsICdtc2FrJ10uaW5jbHVkZXMoaXRlbS5zeXN0ZW0uYWN0aW9uVHlwZSkgJiYgaXRlbS5zeXN0ZW0ubGV2ZWwgPT09IDApIHtcclxuICAgICAgICAgIGNvbnN0IHdlYXBvblN0YXRzID0gZ2V0V2VhcG9uU3RhdHMoaXRlbSwgYWN0b3JEYXRhKTtcclxuICAgICAgICAgIGxzc1dlYXBvbnMucHVzaChnZXRXZWFwb25PYmplY3Qoe1xyXG4gICAgICAgICAgICAuLi5pdGVtLFxyXG4gICAgICAgICAgICAuLi53ZWFwb25TdGF0cyxcclxuICAgICAgICAgICAgcGFyZW50OiBhY3RvckRhdGEsXHJcbiAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxzc1NwZWxsc1tgc3BlbGxzLWxldmVsLSR7aXRlbS5zeXN0ZW0ubGV2ZWx9YF0udmFsdWUuZGF0YS5jb250ZW50LnB1c2godGV4dFRlbXBsYXRlKGl0ZW0ubmFtZSkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2VxdWlwbWVudCc6IHtcclxuICAgICAgICBsc3NFcXVpcG1lbnQuZXF1aXBtZW50LnZhbHVlLmRhdGEuY29udGVudC5wdXNoKHRleHRUZW1wbGF0ZShpdGVtLm5hbWUpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZWFwb24nOiB7XHJcbiAgICAgICAgY29uc3Qgd2VhcG9uU3RhdHMgPSBnZXRXZWFwb25TdGF0cyhpdGVtKTtcclxuICAgICAgICBpZiAodXNlSW50ZXJhY3RpdmVCbG9ja3MpIHtcclxuICAgICAgICAgIGxzc1dlYXBvbnMucHVzaChnZXRXZWFwb25PYmplY3Qoe1xyXG4gICAgICAgICAgICAuLi5pdGVtLFxyXG4gICAgICAgICAgICAuLi53ZWFwb25TdGF0cyxcclxuICAgICAgICAgIH0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbHNzQXR0YWNrcy5hdHRhY2tzLnZhbHVlLmRhdGEuY29udGVudC5wdXNoKHRleHRUZW1wbGF0ZShgJHtpdGVtLm5hbWV9ICR7d2VhcG9uU3RhdHMubGFiZWx9YCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdmZWF0Jzoge1xyXG4gICAgICAgIGlmIChpdGVtLnN5c3RlbS5hY3RpdmF0aW9uPy50eXBlICE9PSBudWxsICYmIGl0ZW0uc3lzdGVtLnVzZXMubWF4ID4gMCAmJiB1c2VJbnRlcmFjdGl2ZUJsb2Nrcykge1xyXG4gICAgICAgICAgY29uc3QgeyBpZCwgaXRlbTogcmVzb3VyY2VJdGVtIH0gPSBnZXRSZXNvdXJjZShpdGVtKTtcclxuICAgICAgICAgIGxzc1Jlc291cmNlW2lkXSA9IHJlc291cmNlSXRlbTtcclxuICAgICAgICAgIGluc2VydFRyYWl0KHtcclxuICAgICAgICAgICAgdHlwZTogJ3Jlc291cmNlJyxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIHRleHROYW1lOiAndHJhaXRzJyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpbnNlcnRUcmFpdCh7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHRUZW1wbGF0ZShpdGVtLm5hbWUpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2NvbnN1bWFibGUnOlxyXG4gICAgICBjYXNlICdjb250YWluZXInOlxyXG4gICAgICBjYXNlICdsb290Jzoge1xyXG4gICAgICAgIGxzc0l0ZW1zLml0ZW1zLnZhbHVlLmRhdGEuY29udGVudC5wdXNoKHRleHRUZW1wbGF0ZShpdGVtLm5hbWUpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gR2V0IHRyYWl0c1xyXG4gIGNvbnN0IHdlYXBvbnMgPSBhd2FpdCBnZXRXZWFwb25zKHtcclxuICAgIHBhY2s6IGl0ZW1zUGFjayxcclxuICAgIGl0ZW1JZHM6IENPTkZJRy5ETkQ1RS53ZWFwb25JZHMsXHJcbiAgICB3ZWFwb25Qcm9mczogQ09ORklHLkRORDVFLndlYXBvblByb2ZpY2llbmNpZXMsXHJcbiAgfSk7XHJcbiAgY29uc3QgYXJtb3JzID0gYXdhaXQgZ2V0QXJtb3Ioe1xyXG4gICAgcGFjazogaXRlbXNQYWNrLFxyXG4gICAgaXRlbUlkczogQ09ORklHLkRORDVFLmFybW9ySWRzLFxyXG4gICAgYXJtb3JQcm9mczogQ09ORklHLkRORDVFLmFybW9yUHJvZmljaWVuY2llcyxcclxuICB9KTtcclxuICBjb25zdCB0b29scyA9IGF3YWl0IGdldFRvb2xzKHtcclxuICAgIHBhY2s6IGl0ZW1zUGFjayxcclxuICAgIGl0ZW1JZHM6IENPTkZJRy5ETkQ1RS50b29sSWRzLFxyXG4gICAgdG9vbHNQcm9mczogQ09ORklHLkRORDVFLnZlaGljbGVUeXBlcyxcclxuICB9KTtcclxuXHJcbiAgdHJhaXRTdHJpbmdzID0gZ2V0VHJhaXRzKHtcclxuICAgIHRyYWl0cyxcclxuICAgIGxhbmd1YWdlczogY29sbGVjdExhbmd1YWdlcyhDT05GSUcuRE5ENUUubGFuZ3VhZ2VzKSxcclxuICAgIHdlYXBvbnMsXHJcbiAgICBhcm1vcnMsXHJcbiAgICB0b29scyxcclxuICAgIGFjdG9yVG9vbHMsXHJcbiAgfSk7XHJcbiAgbHNzUHJvZi52YWx1ZS5kYXRhLmNvbnRlbnQgPSB0cmFpdFN0cmluZ3MubWFwKCh0cmFpdCkgPT4gdGV4dFRlbXBsYXRlKHRyYWl0KSk7XHJcblxyXG4gIC8vIFNldCBMU1MgZGF0YVxyXG4gIGNvbnN0IGxzc0RhdGEgPSB7XHJcbiAgICBpc0RlZmF1bHQ6IHRydWUsXHJcbiAgICBqc29uVHlwZTogJ2NoYXJhY3RlcicsXHJcbiAgICB0ZW1wbGF0ZTogJ2RlZmF1bHQnLFxyXG4gICAgbmFtZTogeyB2YWx1ZTogYWN0b3JEYXRhLm5hbWUgfSxcclxuICAgIGluZm86IHtcclxuICAgICAgY2hhckNsYXNzOiB7XHJcbiAgICAgICAgbmFtZTogJ2NoYXJDbGFzcycsXHJcbiAgICAgICAgbGFiZWw6ICfQutC70LDRgdGBINC4INGD0YDQvtCy0LXQvdGMJyxcclxuICAgICAgICB2YWx1ZTogY2hhckNsYXNzLmxlbmd0aCA+IDFcclxuICAgICAgICAgID8gY2hhckNsYXNzLm1hcChjbHMgPT4gYCR7Y2xzLnNwbGl0KCcgJylbMF0uc2xpY2UoMCwgNCl9ICgke2Nscy5zcGxpdCgnICgnKVsxXX1gKS5qb2luKCcgLyAnKVxyXG4gICAgICAgICAgOiBjaGFyQ2xhc3NbMF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGxldmVsOiB7IG5hbWU6ICdsZXZlbCcsIGxhYmVsOiAn0YPRgNC+0LLQtdC90YwnLCB2YWx1ZTogZGV0YWlscy5sZXZlbCB9LFxyXG4gICAgICBiYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgbmFtZTogJ2JhY2tncm91bmQnLFxyXG4gICAgICAgIGxhYmVsOiAn0L/RgNC10LTRi9GB0YLQvtGA0LjRjycsXHJcbiAgICAgICAgdmFsdWU6IGRldGFpbHMuYmFja2dyb3VuZC5uYW1lLFxyXG4gICAgICB9LFxyXG4gICAgICBwbGF5ZXJOYW1lOiB7IG5hbWU6ICdwbGF5ZXJOYW1lJywgbGFiZWw6ICfQuNC80Y8g0LjQs9GA0L7QutCwJywgdmFsdWU6ICcnIH0sXHJcbiAgICAgIHJhY2U6IHsgbmFtZTogJ3JhY2UnLCBsYWJlbDogJ9GA0LDRgdCwJywgdmFsdWU6IGRldGFpbHMucmFjZS5uYW1lIH0sXHJcbiAgICAgIGFsaWdubWVudDoge1xyXG4gICAgICAgIG5hbWU6ICdhbGlnbm1lbnQnLFxyXG4gICAgICAgIGxhYmVsOiAn0LzQuNGA0L7QstC+0LfQt9GA0LXQvdC40LUnLFxyXG4gICAgICAgIHZhbHVlOiBkZXRhaWxzLmFsaWdubWVudCxcclxuICAgICAgfSxcclxuICAgICAgZXhwZXJpZW5jZToge1xyXG4gICAgICAgIG5hbWU6ICdleHBlcmllbmNlJyxcclxuICAgICAgICBsYWJlbDogJ9C+0L/Ri9GCJyxcclxuICAgICAgICB2YWx1ZTogZGV0YWlscy54cC52YWx1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzdWJJbmZvOiB7XHJcbiAgICAgIGFnZTogeyBuYW1lOiAnYWdlJywgbGFiZWw6ICfQstC+0LfRgNCw0YHRgicsIHZhbHVlOiBkZXRhaWxzLmFnZSB9LFxyXG4gICAgICBoZWlnaHQ6IHsgbmFtZTogJ2hlaWdodCcsIGxhYmVsOiAn0YDQvtGB0YInLCB2YWx1ZTogZGV0YWlscy5oZWlnaHQgfSxcclxuICAgICAgd2VpZ2h0OiB7IG5hbWU6ICd3ZWlnaHQnLCBsYWJlbDogJ9Cy0LXRgScsIHZhbHVlOiBkZXRhaWxzLndlaWdodCB9LFxyXG4gICAgICBleWVzOiB7IG5hbWU6ICdleWVzJywgbGFiZWw6ICfQs9C70LDQt9CwJywgdmFsdWU6IGRldGFpbHMuZXllcyB9LFxyXG4gICAgICBza2luOiB7IG5hbWU6ICdza2luJywgbGFiZWw6ICfQutC+0LbQsCcsIHZhbHVlOiBkZXRhaWxzLnNraW4gfSxcclxuICAgICAgaGFpcjogeyBuYW1lOiAnaGFpcicsIGxhYmVsOiAn0LLQvtC70L7RgdGLJywgdmFsdWU6IGRldGFpbHMuaGFpciB9LFxyXG4gICAgfSxcclxuICAgIHNwZWxsc0luZm86IHtcclxuICAgICAgYmFzZToge1xyXG4gICAgICAgIG5hbWU6ICdiYXNlJyxcclxuICAgICAgICBsYWJlbDogJ9CR0LDQt9C+0LLQsNGPINGF0LDRgNCw0LrRgtC10YDQuNGB0YLQuNC60LAg0LfQsNC60LvQuNC90LDQvdC40LknLFxyXG4gICAgICAgIHZhbHVlOiBDT05GSUcuRE5ENUUuYWJpbGl0aWVzW2F0dHJpYnV0ZXMuc3BlbGxjYXN0aW5nXS5sYWJlbCxcclxuICAgICAgICBjb2RlOiBhdHRyaWJ1dGVzLnNwZWxsY2FzdGluZyxcclxuICAgICAgfSxcclxuICAgICAgc2F2ZToge1xyXG4gICAgICAgIG5hbWU6ICdzYXZlJyxcclxuICAgICAgICBsYWJlbDogJ9Ch0LvQvtC20L3QvtGB0YLRjCDRgdC/0LDRgdCx0YDQvtGB0LrQsCcsXHJcbiAgICAgICAgdmFsdWU6IGF0dHJpYnV0ZXMuc3BlbGxkYyxcclxuICAgICAgfSxcclxuICAgICAgbW9kOiB7XHJcbiAgICAgICAgbmFtZTogJ21vZCcsXHJcbiAgICAgICAgbGFiZWw6ICfQkdC+0L3Rg9GBINCw0YLQsNC60Lgg0LfQsNC60LvQuNC90LDQvdC40LXQvCcsXHJcbiAgICAgICAgdmFsdWU6IGF0dHJpYnV0ZXMuc3BlbGxtb2QgKyBhdHRyaWJ1dGVzLnByb2YsXHJcbiAgICAgIH0sXHJcbiAgICAgIGF2YWlsYWJsZTogeyBjbGFzc2VzOiBzcGVsbENhc3RpbmcgfSxcclxuICAgIH0sXHJcbiAgICBzcGVsbHM6IHNwZWxsU2xvdHMsXHJcbiAgICBzcGVsbHNQYWN0OiBwYWN0U3BlbGwsXHJcbiAgICBwcm9maWNpZW5jeTogYXR0cmlidXRlcy5wcm9mLFxyXG4gICAgc3RhdHM6IGxzc1N0YXRzLFxyXG4gICAgc2F2ZXM6IGxzc1NhdmVzLFxyXG4gICAgc2tpbGxzOiBsc3NTa2lsbHMsXHJcbiAgICB2aXRhbGl0eToge1xyXG4gICAgICAnaHAtZGljZS1jdXJyZW50JzogeyB2YWx1ZTogYXR0cmlidXRlcy5oZCB9LFxyXG4gICAgICAnaGl0LWRpZSc6IGhpdERpZSxcclxuICAgICAgJ2hwLWRpY2UtbXVsdGknOiBoaXREaWVNdWx0aXBsZSxcclxuICAgICAgYWM6IHsgdmFsdWU6IGF0dHJpYnV0ZXMuYWMudmFsdWUgfSxcclxuICAgICAgc3BlZWQ6IHsgdmFsdWU6IGF0dHJpYnV0ZXMubW92ZW1lbnQud2FsayB9LFxyXG4gICAgICBpbml0aWF0aXZlOiB7IHZhbHVlOiBhdHRyaWJ1dGVzLmluaXQudG90YWwgfSxcclxuICAgICAgJ2hwLW1heCc6IHsgdmFsdWU6IGF0dHJpYnV0ZXMuaHAubWF4IH0sXHJcbiAgICAgICdocC1jdXJyZW50JzogeyB2YWx1ZTogYXR0cmlidXRlcy5ocC52YWx1ZSB9LFxyXG4gICAgICAnaHAtdGVtcCc6IHsgdmFsdWU6IGF0dHJpYnV0ZXMuaHAudGVtcCB9LFxyXG4gICAgICBpc0R5aW5nOiBmYWxzZSxcclxuICAgICAgZGVhdGhGYWlsczogMCxcclxuICAgICAgZGVhdGhTdWNjZXNzZXM6IDAsXHJcbiAgICB9LFxyXG4gICAgdGV4dDoge1xyXG4gICAgICBwcm9mOiBsc3NQcm9mLFxyXG4gICAgICAuLi5sc3NFcXVpcG1lbnQsXHJcbiAgICAgIC4uLmxzc1NwZWxscyxcclxuICAgICAgLi4ubHNzQXR0YWNrcyxcclxuICAgICAgLi4ubHNzVHJhaXRzLFxyXG4gICAgICAuLi5sc3NJdGVtcyxcclxuICAgICAgLi4ubHNzRmVhdHVyZXMsXHJcbiAgICAgIC4uLmNoYXJhY3RlclRyYWl0cyxcclxuICAgIH0sXHJcbiAgICBpc0hpZGRlbjogZmFsc2UsXHJcbiAgICB0cmFpdHM6IHtcclxuICAgICAgdmFsdWU6IHsgaWQ6ICdob3Zlci10b29sYmFyLXRyYWl0cycsIGRhdGE6IHsgdHlwZTogJ2RvYycsIGNvbnRlbnQ6IFtdIH0gfSxcclxuICAgIH0sXHJcbiAgICBiYWNrZ3JvdW5kOiB7XHJcbiAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgaWQ6ICdob3Zlci10b29sYmFyLWJhY2tncm91bmQnLFxyXG4gICAgICAgIGRhdGE6IHsgdHlwZTogJ2RvYycsIGNvbnRlbnQ6IFtdIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2l6ZTogOSxcclxuICAgIGNvaW5zOiB7XHJcbiAgICAgIGNwOiB7IHZhbHVlOiBjdXJyZW5jeS5jcCB9LFxyXG4gICAgICBlcDogeyB2YWx1ZTogY3VycmVuY3kuZXAgfSxcclxuICAgICAgZ3A6IHsgdmFsdWU6IGN1cnJlbmN5LmdwIH0sXHJcbiAgICAgIHBwOiB7IHZhbHVlOiBjdXJyZW5jeS5wcCB9LFxyXG4gICAgICBzcDogeyB2YWx1ZTogY3VycmVuY3kuc3AgfSxcclxuICAgIH0sXHJcbiAgICBjYXN0ZXJDbGFzczogeyB2YWx1ZTogc3BlbGxDYXN0aW5nU3RyaW5nLmpvaW4oJywgJykgfSwgLy8gbm8gZGlyZWN0IG1hcHBpbmcgZm91bmRcclxuICAgIHdlYXBvbnNMaXN0OiBsc3NXZWFwb25zLFxyXG4gICAgcmVzb3VyY2VzOiBsc3NSZXNvdXJjZSxcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdGFnczogW10sXHJcbiAgICBkaXNhYmxlZEJsb2Nrczoge1xyXG4gICAgICAnaW5mby1sZWZ0JzogW10sXHJcbiAgICAgICdpbmZvLXJpZ2h0JzogW10sXHJcbiAgICAgICdub3Rlcy1sZWZ0JzogW10sXHJcbiAgICAgICdub3Rlcy1yaWdodCc6IFtdLFxyXG4gICAgfSxcclxuICAgIHNwZWxsczogeyBtb2RlOiAndGV4dCcsIHByZXBhcmVkOiBbXSwgYm9vazogW10gfSxcclxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGxzc0RhdGEpLFxyXG4gICAganNvblR5cGU6ICdjaGFyYWN0ZXInLFxyXG4gICAgdmVyc2lvbjogJzInLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0Rm91bmRyeVRvTHNzO1xyXG4iLCJleHBvcnQgZGVmYXVsdCAoY291bnQgPSAxKSA9PiB7XG4gIGNvbnN0IGlkcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICBpZHMucHVzaChEYXRlLm5vdygpLnRvU3RyaW5nKCkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKS50b1N0cmluZygpLnBhZFN0YXJ0KDMsICcwJykpO1xuICB9XG4gIHJldHVybiBpZHM7XG59XG4iLCIvKiBnbG9iYWwgQ09ORklHLCBnYW1lICovXG5cblxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoe3BhY2ssIGl0ZW1JZHMsIGFybW9yUHJvZnN9KSA9PiB7XG4gIGxldCBpdGVtc09iamVjdCA9IHt9O1xuXG4gIGZvciAobGV0IGl0ZW1OYW1lIGluIGl0ZW1JZHMpIHtcbiAgICBsZXQgaXRlbUlkID0gaXRlbUlkc1tpdGVtTmFtZV07XG4gICAgbGV0IGl0ZW0gPSBhd2FpdCBwYWNrLmdldERvY3VtZW50KGl0ZW1JZCk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGl0ZW1zT2JqZWN0W2l0ZW1OYW1lXSA9IGl0ZW0ubmFtZTtcbiAgICB9XG4gIH1cblxuXG4gIHJldHVybiB7XG4gICAgLi4uaXRlbXNPYmplY3QsXG4gICAgLi4uYXJtb3JQcm9mcyxcbiAgfTtcbn1cblxuIiwiaW1wb3J0IGdlbmVyYXRlVW5pcXVlSWRzIGZyb20gJy4vZ2VuZXJhdGVVbmlxdWVJZHMnO1xuXG5leHBvcnQgZGVmYXVsdCAoaXRlbSwgbG9jYXRpb24gPSAndHJhaXRzJykgPT4ge1xuICBjb25zdCBpZCA9IGdlbmVyYXRlVW5pcXVlSWRzKCk7XG4gIGNvbnN0IGZvdW5kcnlVc2VzID0gWydkYXduJywgJ2RheScsICdkdXNrJywgJ2xyJ107XG4gIGxldCBpY29uID0gJyc7XG4gIGlmIChpdGVtLnN5c3RlbS51c2VzLnBlciA9PT0gJ3NyJykge1xuICAgIGljb24gPSAnc2hvcnQtcmVzdCc7XG4gIH0gZWxzZSBpZiAoZm91bmRyeVVzZXMuaW5jbHVkZXMoaXRlbS5zeXN0ZW0udXNlcy5wZXIpKSB7XG4gICAgaWNvbiA9ICdsb25nLXJlc3QnO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpZDogYHJlc291cmNlLSR7aWR9YCxcbiAgICBpdGVtOiB7XG4gICAgICAnaWQnOiBgcmVzb3VyY2UtJHtpZH1gLFxuICAgICAgJ25hbWUnOiBpdGVtLm5hbWUsXG4gICAgICAnY3VycmVudCc6IGl0ZW0uc3lzdGVtLnVzZXMubWF4LFxuICAgICAgJ21heCc6IGl0ZW0uc3lzdGVtLnVzZXMubWF4LFxuICAgICAgbG9jYXRpb24sXG4gICAgICAnaXNMb25nUmVzdCc6IGZvdW5kcnlVc2VzLmluY2x1ZGVzKGl0ZW0uc3lzdGVtLnVzZXMucGVyKSxcbiAgICAgICdpc1Nob3J0UmVzdCc6IGl0ZW0uc3lzdGVtLnVzZXMucGVyID09PSAnc3InLFxuICAgICAgaWNvbixcbiAgICB9LFxuICB9O1xufVxuIiwiLyogZ2xvYmFsIENPTkZJRywgZ2FtZSAqL1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoe3BhY2ssIGl0ZW1JZHMsIHRvb2xzUHJvZnN9KSA9PiB7XG4gIGxldCBpdGVtc09iamVjdCA9IHt9O1xuXG4gIGZvciAobGV0IGl0ZW1OYW1lIGluIGl0ZW1JZHMpIHtcbiAgICBsZXQgaXRlbUlkID0gaXRlbUlkc1tpdGVtTmFtZV07XG4gICAgbGV0IGl0ZW0gPSBhd2FpdCBwYWNrLmdldERvY3VtZW50KGl0ZW1JZCk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGl0ZW1zT2JqZWN0W2l0ZW1OYW1lXSA9IGl0ZW0ubmFtZTtcbiAgICB9XG4gIH1cblxuXG4gIHJldHVybiB7XG4gICAgLi4uaXRlbXNPYmplY3QsXG4gICAgLi4udG9vbHNQcm9mcyxcbiAgfTtcbn1cblxuIiwiLyogZ2xvYmFsIENPTkZJRyAqL1xuXG5cbmNvbnN0IHRyYWl0c0NvbmZpZyA9IHtcbiAgXCJzaXplXCI6IHtcInRpdGxlXCI6IFwi0KDQsNC30LzQtdGAXCIsIFwiY29uZmlnS2V5XCI6IFwiYWN0b3JTaXplc1wifSxcbiAgXCJkaVwiOiB7XCJ0aXRsZVwiOiBcItCd0LXQstC+0YHQv9GA0LjQuNC80YfQuNCy0L7RgdGC0Ywg0Log0YPRgNC+0L3Rg1wiLCBcImNvbmZpZ0tleVwiOiBcImRhbWFnZVR5cGVzXCJ9LFxuICBcImRyXCI6IHtcInRpdGxlXCI6IFwi0KPRgdGC0L7QudGH0LjQstC+0YHRgtGMINC6INGD0YDQvtC90YNcIiwgXCJjb25maWdLZXlcIjogXCJkYW1hZ2VUeXBlc1wifSxcbiAgXCJkdlwiOiB7XCJ0aXRsZVwiOiBcItCj0Y/Qt9Cy0LjQvNC+0YHRgtGMINC6INGD0YDQvtC90YNcIiwgXCJjb25maWdLZXlcIjogXCJkYW1hZ2VUeXBlc1wifSxcbiAgLy8gXCJkbVwiOiB7XCJ0aXRsZVwiOiBcItCc0L7QtNC40YTQuNCw0LrRgtC+0YAg0YPRgNC+0L3QsFwiLCBcImNvbmZpZ0tleVwiOiBcImRhbWFnZVR5cGVzXCJ9LFxuICBcImNpXCI6IHtcbiAgICBcInRpdGxlXCI6IFwi0J3QtdCy0L7RgdC/0YDQuNC40LzRh9C40LLQvtGB0YLRjCDQuiDRgdC+0YHRgtC+0Y/QvdC40Y5cIixcbiAgICBcImNvbmZpZ0tleVwiOiBcImNvbmRpdGlvblR5cGVzXCJcbiAgfSxcbiAgXCJsYW5ndWFnZXNcIjoge1widGl0bGVcIjogXCLQr9C30YvQutC4XCIsIFwiY29uZmlnS2V5XCI6IFwibGFuZ3VhZ2VzXCJ9LFxuICBcIndlYXBvblByb2ZcIjoge1widGl0bGVcIjogXCLQo9C80LXQvdC40Y8g0LIg0L7RgNGD0LbQuNC4XCIsIFwiY29uZmlnS2V5XCI6IFwid2VhcG9uVHlwZXNcIn0sXG4gIFwiYXJtb3JQcm9mXCI6IHtcInRpdGxlXCI6IFwi0KPQvNC10L3QuNGPINCyINCx0YDQvtC90LVcIiwgXCJjb25maWdLZXlcIjogXCJhcm1vclR5cGVzXCJ9LFxuICBcInRvb2xQcm9mXCI6IHtcInRpdGxlXCI6IFwi0KPQvNC10L3QuNGPINCyINC40L3RgdGC0YDRg9C80LXQvdGC0LDRhVwiLCBcImNvbmZpZ0tleVwiOiBcInRvb2xJZHNcIn1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKHt0cmFpdHMsIGxhbmd1YWdlcywgd2VhcG9ucywgYXJtb3JzLCB0b29scywgYWN0b3JUb29sc30pID0+IHtcbiAgbGV0IHRyYWl0U3RyaW5ncyA9IFtdXG4gIGZvciAobGV0IFt0cmFpdEtleSwgdHJhaXRWYWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModHJhaXRzKSkge1xuICAgIGxldCB0cmFpdFN0cmluZyA9IHRyYWl0c0NvbmZpZ1t0cmFpdEtleV0/LnRpdGxlIHx8ICcnO1xuICAgIGlmICh0cmFpdFN0cmluZyAhPT0gJycpIHtcbiAgICAgIHRyYWl0U3RyaW5nICs9ICc6ICc7XG5cbiAgICAgIHN3aXRjaCAodHJhaXRLZXkpIHtcbiAgICAgICAgY2FzZSAnc2l6ZSc6IHtcbiAgICAgICAgICB0cmFpdFN0cmluZyArPSBDT05GSUcuRE5ENUVbdHJhaXRzQ29uZmlnW3RyYWl0S2V5XS5jb25maWdLZXldW3RyYWl0VmFsdWVdLmxhYmVsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2RpJzpcbiAgICAgICAgY2FzZSAnZHInOlxuICAgICAgICBjYXNlICdkdic6XG4gICAgICAgIGNhc2UgJ2RtJzpcbiAgICAgICAgY2FzZSAnY2knOiB7XG4gICAgICAgICAgdHJhaXRTdHJpbmcgKz0gQXJyYXkuZnJvbSh0cmFpdFZhbHVlLnZhbHVlKS5tYXAoKGRhbWFnZVR5cGUpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIENPTkZJRy5ETkQ1RVt0cmFpdHNDb25maWdbdHJhaXRLZXldLmNvbmZpZ0tleV1bZGFtYWdlVHlwZV0ubGFiZWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApLmpvaW4oJywgJykgKyBgJHt0cmFpdFZhbHVlLmN1c3RvbSAhPT0gJycgPyBgLCAke3RyYWl0VmFsdWUuY3VzdG9tfWAgOiAnJ31gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xhbmd1YWdlcyc6IHtcbiAgICAgICAgICB0cmFpdFN0cmluZyArPSBBcnJheS5mcm9tKHRyYWl0VmFsdWUudmFsdWUpLm1hcCgobGFuZ3VhZ2UpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlc1tsYW5ndWFnZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKS5qb2luKCcsICcpICsgYCR7dHJhaXRWYWx1ZS5jdXN0b20gIT09ICcnID8gYCwgJHt0cmFpdFZhbHVlLmN1c3RvbX1gIDogJyd9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd3ZWFwb25Qcm9mJzoge1xuICAgICAgICAgIHRyYWl0U3RyaW5nICs9IEFycmF5LmZyb20odHJhaXRWYWx1ZS52YWx1ZSkubWFwKCh3ZWFwb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHdlYXBvbnNbd2VhcG9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApLmpvaW4oJywgJykgKyBgJHt0cmFpdFZhbHVlLmN1c3RvbSAhPT0gJycgPyBgLCAke3RyYWl0VmFsdWUuY3VzdG9tfWAgOiAnJ31gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2FybW9yUHJvZic6IHtcbiAgICAgICAgICB0cmFpdFN0cmluZyArPSBBcnJheS5mcm9tKHRyYWl0VmFsdWUudmFsdWUpLm1hcCgoYXJtb3IpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFybW9yc1thcm1vcl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKS5qb2luKCcsICcpICsgYCR7dHJhaXRWYWx1ZS5jdXN0b20gIT09ICcnID8gYCwgJHt0cmFpdFZhbHVlLmN1c3RvbX1gIDogJyd9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd0b29sUHJvZic6IHtcbiAgICAgICAgICBjb25zdCB0b29sc0FycmF5ID0gW107XG4gICAgICAgICAgZm9yIChsZXQgdG9vbCBpbiBhY3RvclRvb2xzKSB7XG4gICAgICAgICAgICB0b29sc0FycmF5LnB1c2goYCR7dG9vbHNbdG9vbF19ICR7YWN0b3JUb29sc1t0b29sXS52YWx1ZSAhPT0gMSA/IGAoeCR7YWN0b3JUb29sc1t0b29sXS52YWx1ZX0pYCA6ICcnfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cmFpdFN0cmluZyArPSB0b29sc0FycmF5LmpvaW4oJywgJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRyYWl0U3RyaW5ncy5wdXNoKHRyYWl0U3RyaW5nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRyYWl0U3RyaW5nc1xufVxuIiwiaW1wb3J0IGdlbmVyYXRlVW5pcXVlSWRzIGZyb20gJy4vZ2VuZXJhdGVVbmlxdWVJZHMnO1xuXG5jb25zdCBnZXRBYmlsaXR5TW9kID0gKGl0ZW0pID0+IHtcbiAgaWYgKGl0ZW0udHlwZSA9PT0gJ3NwZWxsJykge1xuICAgIHJldHVybiBpdGVtLnBhcmVudD8uc3lzdGVtLmF0dHJpYnV0ZXMuc3BlbGxjYXN0aW5nO1xuICB9XG4gIGNvbnN0IHsgc3RyLCBkZXggfSA9IGl0ZW0ucGFyZW50Py5zeXN0ZW0uYWJpbGl0aWVzID8/IHt9O1xuXG5cbiAgaWYgKGl0ZW0uc3lzdGVtLnByb3BlcnRpZXMuaGFzKCdmaW4nKSAmJiBzdHIgJiYgZGV4KSByZXR1cm4gKGRleC5tb2QgPiBzdHIubW9kKSA/ICdkZXgnIDogJ3N0cic7XG4gIHJldHVybiB7XG4gICAgc2ltcGxlTTogJ3N0cicsXG4gICAgbWFydGlhbE06ICdzdHInLFxuICAgIHNpbXBsZVI6ICdkZXgnLFxuICAgIG1hcnRpYWxSOiAnZGV4JyxcbiAgfVtpdGVtLnN5c3RlbS50eXBlLnZhbHVlXSA/PyBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKGl0ZW0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICAnaWQnOiBgd2VhcG9uLSR7Z2VuZXJhdGVVbmlxdWVJZHMoKVswXX1gLFxuICAgICduYW1lJzoge1xuICAgICAgJ3ZhbHVlJzogaXRlbS5uYW1lLFxuICAgIH0sXG4gICAgJ21vZCc6IHtcbiAgICAgICd2YWx1ZSc6IGArJHtwYXJzZUludChpdGVtLnN5c3RlbS5hdHRhY2suYm9udXMsIDEwKX1gLFxuICAgIH0sXG4gICAgJ2RtZyc6IHtcbiAgICAgICd2YWx1ZSc6IGl0ZW0uZGFtYWdlLFxuICAgIH0sXG4gICAgJ2FiaWxpdHknOiBpdGVtLmFiaWxpdHkgPyBpdGVtLmFiaWxpdHkgOiBnZXRBYmlsaXR5TW9kKGl0ZW0pLFxuICAgICdpc1Byb2YnOiBpdGVtLnN5c3RlbS5wcm9mLm11bHRpcGxpZXIgIT09IDAsXG4gIH07XG59O1xuIiwiLyogZ2xvYmFsIENPTkZJRyAqL1xuY29uc3QgdHJhbnNmb3JtRGFtYWdlQXJyYXkgPSAoZGFtYWdlQXJyYXkpID0+IHtcbiAgbGV0IHJlc3VsdCA9IGRhbWFnZUFycmF5Lm1hcChpdGVtID0+IHtcbiAgICBsZXQgZm9ybXVsYSA9IGl0ZW0uZm9ybXVsYTtcbiAgICBsZXQgZGFtYWdlVHlwZSA9IGl0ZW0uZGFtYWdlVHlwZTtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBmb3JtdWxhIGFscmVhZHkgY29udGFpbnMgYnJhY2tldHNcbiAgICBsZXQgbWF0Y2ggPSBmb3JtdWxhLm1hdGNoKC9cXFsoLio/KVxcXS8pO1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBsZXQgZGFtYWdlVHlwZSA9IG1hdGNoWzFdO1xuICAgICAgZm9ybXVsYSA9IGZvcm11bGEucmVwbGFjZShgWyR7ZGFtYWdlVHlwZX1dYCwgJycpICsgYFske0NPTkZJRy5ETkQ1RS5kYW1hZ2VUeXBlc1tkYW1hZ2VUeXBlXS5sYWJlbH1dYFxuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtdWxhID0gZm9ybXVsYSArIGBbJHtDT05GSUcuRE5ENUUuZGFtYWdlVHlwZXNbZGFtYWdlVHlwZV0ubGFiZWx9XWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm11bGE7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQuam9pbignICsgJyk7XG59XG5cbmNvbnN0IGNhbGN1bGF0ZUJvbnVzID0gKGRhdGEpID0+IHtcbiAgY29uc3Qgcm9sbERhdGEgPSBkYXRhLnJvbGxEYXRhO1xuICBjb25zdCBwYXJ0cyA9IGRhdGEucGFydHM7XG5cbiAgbGV0IHN1bSA9IDA7XG5cbiAgcGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICBpZiAocGFydC5zdGFydHNXaXRoKCdAJykpIHtcbiAgICAgIC8vIFJlbW92ZSAnQCcgYW5kIGdldCB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBmcm9tIHJvbGxEYXRhXG4gICAgICBjb25zdCBrZXkgPSBwYXJ0LnNsaWNlKDEpO1xuICAgICAgY29uc3QgdmFsdWUgPSByb2xsRGF0YVtrZXldO1xuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VtICs9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGl0J3Mgbm90IGEgcmVmZXJlbmNlLCBwYXJzZSBpdCBkaXJlY3RseSBhcyBhbiBpbnRlZ2VyXG4gICAgICBzdW0gKz0gcGFyc2VJbnQocGFydCwgMTApO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN1bTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKHdlYXBvbikgPT4ge1xuICBjb25zdCBib251cyA9IGNhbGN1bGF0ZUJvbnVzKHdlYXBvbi5nZXRBdHRhY2tUb0hpdCgpKTtcbiAgLy8gY29uc3QgZGFtYWdlID0gd2VhcG9uLmdldERlcml2ZWREYW1hZ2VMYWJlbCgpLm1hcCgoe2xhYmVsfSkgPT4gbGFiZWwpLmpvaW4oJywgJyk7XG4gIGNvbnN0IGRhbWFnZSA9IHRyYW5zZm9ybURhbWFnZUFycmF5KHdlYXBvbi5nZXREZXJpdmVkRGFtYWdlTGFiZWwoKSk7XG4gIHJldHVybiB7XG4gICAgYm9udXMsXG4gICAgZGFtYWdlLFxuICAgIGxhYmVsOiBgKNCw0YLQsNC60LAgKyR7Ym9udXN9LCDRg9GA0L7QvSAke2RhbWFnZX0pYCxcbiAgfVxufVxuIiwiLyogZ2xvYmFsIENPTkZJRywgZ2FtZSAqL1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHtwYWNrLCBpdGVtSWRzLCB3ZWFwb25Qcm9mc30pID0+IHtcbiAgbGV0IGl0ZW1zT2JqZWN0ID0ge307XG5cbiAgZm9yIChsZXQgaXRlbU5hbWUgaW4gaXRlbUlkcykge1xuICAgIGxldCBpdGVtSWQgPSBpdGVtSWRzW2l0ZW1OYW1lXTtcbiAgICBsZXQgaXRlbSA9IGF3YWl0IHBhY2suZ2V0RG9jdW1lbnQoaXRlbUlkKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaXRlbXNPYmplY3RbaXRlbU5hbWVdID0gaXRlbS5uYW1lO1xuICAgIH1cbiAgfVxuXG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pdGVtc09iamVjdCxcbiAgICAuLi53ZWFwb25Qcm9mcyxcbiAgfTtcbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgKGh0bWxTdHJpbmcpID0+IHtcbiAgLy8gQ3JlYXRlIGEgbmV3IERPTSBwYXJzZXJcbiAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAvLyBQYXJzZSB0aGUgSFRNTCBzdHJpbmdcbiAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sU3RyaW5nLCAndGV4dC9odG1sJyk7XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHByb2Nlc3MgdGV4dCBub2RlcyB3aXRoIGlubGluZSBzdHlsZXNcbiAgZnVuY3Rpb24gcHJvY2Vzc1RleHROb2Rlcyhub2RlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICBpZiAoY2hpbGQudGV4dENvbnRlbnQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB0ZXh0OiBjaGlsZC50ZXh0Q29udGVudC50cmltKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgbGV0IG1hcmtzID0gW107XG4gICAgICAgIGlmIChjaGlsZC50YWdOYW1lID09PSAnU1RST05HJykge1xuICAgICAgICAgIG1hcmtzLnB1c2goeyB0eXBlOiAnYm9sZCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkLnRhZ05hbWUgPT09ICdFTScpIHtcbiAgICAgICAgICBtYXJrcy5wdXNoKHsgdHlwZTogJ2l0YWxpYycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkLnRhZ05hbWUgPT09ICdTUEFOJyAmJiBjaGlsZC5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9PT0gJ3VuZGVybGluZScpIHtcbiAgICAgICAgICBtYXJrcy5wdXNoKHsgdHlwZTogJ3VuZGVybGluZScgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hcmtzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBtYXJrczogbWFya3MsXG4gICAgICAgICAgICB0ZXh0OiBgJHtjaGlsZC50ZXh0Q29udGVudC50cmltKCl9IGBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBIYW5kbGUgb3RoZXIgaW5saW5lIHN0eWxlcyBpZiBuZWVkZWRcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB0ZXh0OiBgJHtjaGlsZC50ZXh0Q29udGVudC50cmltKCl9IGBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjb252ZXJ0IGEgPHA+IHRhZyB0byB0aGUgc3BlY2lmaWVkIG9iamVjdCBmb3JtYXRcbiAgZnVuY3Rpb24gY29udmVydFBhcmFncmFwaChwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgY29udGVudDogcHJvY2Vzc1RleHROb2RlcyhwKVxuICAgIH07XG4gIH1cblxuICAvLyBFeHRyYWN0IGFsbCBwYXJhZ3JhcGggZWxlbWVudHMgZnJvbSB0aGUgSFRNTFxuICBjb25zdCBwYXJhZ3JhcGhzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ3AnKTtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgcGFyYWdyYXBocy5mb3JFYWNoKHAgPT4ge1xuICAgIGlmIChwLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICByZXN1bHQucHVzaChjb252ZXJ0UGFyYWdyYXBoKHApKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKiBnbG9iYWwgc2F2ZURhdGFUb0ZpbGUgKi9cblxuZnVuY3Rpb24gc2F2ZUpzb25GaWxlKGRhdGEsIGZpbGVOYW1lKSB7XG4gIC8vIENvbnZlcnQgZGF0YSB0byBKU09OIHN0cmluZ1xuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gIHNhdmVEYXRhVG9GaWxlKGpzb25TdHJpbmcsICdhcHBsaWNhdGlvbi9qc29uJywgYCR7ZmlsZU5hbWV9LWxzcy5qc29uYCk7XG4gIC8vIC8vIENyZWF0ZSBhIEJsb2IgZnJvbSB0aGUgSlNPTiBzdHJpbmdcbiAgLy8gY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uU3RyaW5nXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcbiAgLy9cbiAgLy8gLy8gVXNlIHRoZSBzYXZlQXMgZnVuY3Rpb24gZnJvbSBGaWxlU2F2ZXIuanNcbiAgLy8gc2F2ZUFzKGJsb2IsIGZpbGVOYW1lKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2F2ZUpzb25GaWxlO1xuIiwiZXhwb3J0IGRlZmF1bHQgKGlucHV0U3RyaW5nKSA9PiB7XG4gIC8vIFNpbXBsZSBoYXNoIGZ1bmN0aW9uIHRvIGNvbnZlcnQgc3RyaW5nIHRvIGEgbnVtYmVyXG4gIGZ1bmN0aW9uIGhhc2hTdHJpbmcoc3RyKSB7XG4gICAgbGV0IGhhc2ggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICBoYXNoID0gKGhhc2ggPDwgNSkgLSBoYXNoICsgY2hhcjtcbiAgICAgIGhhc2ggJj0gaGFzaDsgLy8gQ29udmVydCB0byAzMi1iaXQgaW50ZWdlclxuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbiAgfVxuXG4gIC8vIENvbnZlcnQgaGFzaCB0byBhIHBvc2l0aXZlIG51bWJlclxuICBmdW5jdGlvbiB0b1Bvc2l0aXZlTnVtYmVyKG51bSkge1xuICAgIHJldHVybiBudW0gPj4+IDA7XG4gIH1cblxuICAvLyBQYWQgdGhlIG51bWJlciB0byBlbnN1cmUgaXQgaGFzIGV4YWN0bHkgMTIgZGlnaXRzXG4gIGZ1bmN0aW9uIHBhZFRvMTJEaWdpdHMobnVtKSB7XG4gICAgcmV0dXJuIFN0cmluZyhudW0pLnBhZFN0YXJ0KDEyLCAnMCcpLnNsaWNlKC0xMik7XG4gIH1cblxuICBjb25zdCBoYXNoID0gaGFzaFN0cmluZyhpbnB1dFN0cmluZyk7XG4gIGNvbnN0IHBvc2l0aXZlSGFzaCA9IHRvUG9zaXRpdmVOdW1iZXIoaGFzaCk7XG4gIGNvbnN0IHVuaXF1ZUlkID0gcGFkVG8xMkRpZ2l0cyhwb3NpdGl2ZUhhc2gpO1xuXG4gIHJldHVybiB1bmlxdWVJZDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZ2xvYmFsIGdhbWUgKi9cclxuaW1wb3J0IGNvbnZlcnRGb3VuZHJ5VG9Mc3MgZnJvbSAnLi9tb2R1bGUvY29udmVydCc7XHJcbmltcG9ydCBzYXZlSnNvbkZpbGUgZnJvbSAnLi9tb2R1bGUvc2F2ZVRvRmlsZSc7XHJcblxyXG5pbXBvcnQgdWlkRnJvbVN0cmluZyBmcm9tICcuL21vZHVsZS91aWRGcm9tU3RyaW5nJztcclxuaW1wb3J0IGdlbmVyYXRlVW5pcXVlSWRzIGZyb20gJy4vbW9kdWxlL2dlbmVyYXRlVW5pcXVlSWRzJztcclxuaW1wb3J0IHsgbW9kdWxlTmFtZSB9IGZyb20gJy4vX21vZHVsZSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVBY3RvckhlYWRlckJ1dHRvbihjb25maWcsIGJ1dHRvbnMpIHtcclxuICBjb25zdCBidXR0b25MYWJlbCA9IGdhbWUuaTE4bi5sb2NhbGl6ZSgnRUxTUy5DT05WRVJUJyk7XHJcbiAgaWYgKGNvbmZpZy5vYmplY3QgaW5zdGFuY2VvZiBBY3Rvcikge1xyXG4gICAgYnV0dG9ucy51bnNoaWZ0KHtcclxuICAgICAgbGFiZWw6IGJ1dHRvbkxhYmVsLFxyXG4gICAgICBjbGFzczogJ2Vsc3MtYWN0b3InLFxyXG4gICAgICBpY29uOiAnZmEtc29saWQgZmEtbGFuZ3VhZ2UnLFxyXG4gICAgICBvbmNsaWNrOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5jbGVhcigpO1xyXG4gICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBhd2FpdCBjb252ZXJ0Rm91bmRyeVRvTHNzKGNvbmZpZy5vYmplY3QpO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoJ2pzb25TdHJpbmcnLCBqc29uU3RyaW5nKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbkhvb2tzLm9uY2UoJ3JlYWR5JywgYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgSG9va3Mub24oJ2dldEFjdG9yU2hlZXQ1ZUhlYWRlckJ1dHRvbnMnLCBjcmVhdGVBY3RvckhlYWRlckJ1dHRvbik7XHJcbiAgZ2FtZS5zZXR0aW5ncy5yZWdpc3Rlcihtb2R1bGVOYW1lLCAnaW50ZXJhY3RpdmUtYmxvY2tzJywge1xyXG4gICAgJ25hbWUnOiAn0JjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINC40L3RgtC10YDQsNC60YLQuNCy0L3Ri9C1INCx0LvQvtC60LgnLFxyXG4gICAgJ2hpbnQnOiAn0J/RgNC4INGN0LrRgdC/0L7RgNGC0LUg0LDRgtCw0LrQuCDQuCDRgdC/0L7RgdC+0LHQvdC+0YHRgtC4LCDQutC+0YLQvtGA0YvQtSDQvNC+0LbQvdC+INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCwg0LHRg9C00YPRgiDQvtGE0L7RgNC80LvQtdC90Ysg0LjQvdGC0LXRgNCw0LrRgtC40LLQvdGL0LzQuCDQsdC70L7QutCw0LzQuCwg0LAg0L3QtSDQv9GA0L7RgdGC0L4g0YLQtdC60YHRgtC+0LwnLFxyXG4gICAgJ3Njb3BlJzogJ3dvcmxkJyxcclxuICAgICdjb25maWcnOiB0cnVlLFxyXG4gICAgJ3R5cGUnOiBCb29sZWFuLFxyXG4gICAgJ2RlZmF1bHQnOiB0cnVlLFxyXG4gIH0pO1xyXG5cclxufSk7XHJcblxyXG5Ib29rcy5vbignZ2V0QWN0b3JEaXJlY3RvcnlFbnRyeUNvbnRleHQnLCAoZGF0YSwgb3B0aW9ucykgPT4ge1xyXG4gIGNvbnNvbGUuZGVidWcoJ2RhdGEnLCBkYXRhKTtcclxuICBvcHRpb25zLnB1c2goe1xyXG4gICAgbmFtZTogJ0VMU1MuQ09OVkVSVCcsXHJcbiAgICBpY29uOiAnPGkgY2xhc3M9XCJmYXMgZmEtcHJpbnRcIj48L2k+JyxcclxuICAgIGNhbGxiYWNrOiBhc3luYyAoW2VudHJ5XSkgPT4ge1xyXG4gICAgICBjb25zdCBhY3RvcklkID0gZW50cnkuZGF0YXNldC5kb2N1bWVudElkO1xyXG4gICAgICBjb25zdCBhY3RvciA9IGdhbWUuYWN0b3JzPy5nZXQoYWN0b3JJZCk7XHJcbiAgICAgIGlmIChhY3Rvcikge1xyXG4gICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBhd2FpdCBjb252ZXJ0Rm91bmRyeVRvTHNzKGFjdG9yKTtcclxuICAgICAgICBzYXZlSnNvbkZpbGUoanNvblN0cmluZywgYWN0b3I/Lm5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29uZGl0aW9uOiAobGkpID0+IHtcclxuICAgICAgY29uc3QgYWN0b3JJZCA9IGxpLmRhdGEoJ2RvY3VtZW50SWQnKTtcclxuICAgICAgY29uc3QgYWN0b3IgPSBnYW1lLmFjdG9ycz8uZ2V0KGFjdG9ySWQpO1xyXG4gICAgICAvLyBTaG93IHRoZSBvcHRpb24gb25seSBpZiB0aGUgYWN0b3IgaXMgYSBwbGF5ZXIgY2hhcmFjdGVyIChQQylcclxuICAgICAgcmV0dXJuIGFjdG9yICYmIGFjdG9yLmRhdGEudHlwZSA9PT0gJ2NoYXJhY3Rlcic7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59KTtcclxuXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuXHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIHdpbmRvdy5ydW5UbXBUZXN0ID0gKHJ1bnMgPSAxMCkgPT4ge1xyXG4gICAgLy8gRXhhbXBsZSB1c2FnZSBhbmQgcGVyZm9ybWFuY2UgbWVhc3VyZW1lbnQgdXNpbmcgUGVyZm9ybWFuY2UgQVBJXHJcbiAgICBjb25zdCBpbnB1dFN0cmluZyA9ICdleGFtcGxlU3RyaW5nJztcclxuXHJcbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdzdGFydFUnKTtcclxuICAgIGNvbnN0IHVuaXF1ZUlkczogc3RyaW5nW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVuczsgaSsrKSB7XHJcbiAgICAgIHVuaXF1ZUlkcy5wdXNoKHVpZEZyb21TdHJpbmcoYCR7aW5wdXRTdHJpbmd9LSR7aX1gKSk7XHJcbiAgICB9XHJcbiAgICAvLyBjb25zdCB1bmlxdWVJZCA9IHVpZEZyb21TdHJpbmcoaW5wdXRTdHJpbmcpO1xyXG4gICAgcGVyZm9ybWFuY2UubWFyaygnZW5kVScpO1xyXG4gICAgcGVyZm9ybWFuY2UubWVhc3VyZSgndWlkRnJvbVN0cmluZycsICdzdGFydFUnLCAnZW5kVScpO1xyXG5cclxuXHJcbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdzdGFydFInKTtcclxuICAgIGNvbnN0IHJhbmRvbUlkczogc3RyaW5nW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVuczsgaSsrKSB7XHJcbiAgICAgIHJhbmRvbUlkcy5wdXNoKGdlbmVyYXRlVW5pcXVlSWRzKClbMF0pO1xyXG4gICAgfVxyXG4gICAgLy8gY29uc3QgcmFuZG9tSWQgPSBnZW5lcmF0ZVVuaXF1ZUlkcygpO1xyXG4gICAgcGVyZm9ybWFuY2UubWFyaygnZW5kUicpO1xyXG4gICAgcGVyZm9ybWFuY2UubWVhc3VyZSgnZ2VuZXJhdGVVbmlxdWVJZHMnLCAnc3RhcnRSJywgJ2VuZFInKTtcclxuXHJcbiAgICBjb25zdCBtZWFzdXJlID0gcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5TmFtZSgndWlkRnJvbVN0cmluZycpWzBdO1xyXG4gICAgY29uc29sZS5kZWJ1ZyhgVW5pcXVlIElEYCwgdW5pcXVlSWRzKTsgLy8gT3V0cHV0cyBhIDEyLWRpZ2l0IHVuaXF1ZSBJRFxyXG4gICAgY29uc29sZS5kZWJ1ZyhgVGltZSB0YWtlbiBmb3IgVW5pcXVlIGlkOiAke21lYXN1cmUuZHVyYXRpb259IG1zYCk7IC8vIE91dHB1dHMgdGhlIHRpbWUgdGFrZW4gaW4gbWlsbGlzZWNvbmRzXHJcblxyXG4gICAgY29uc3QgbWVhc3VyZVIgPSBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKCdnZW5lcmF0ZVVuaXF1ZUlkcycpWzBdO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnUmFuZG9tIElEJywgcmFuZG9tSWRzKTtcclxuICAgIGNvbnNvbGUuZGVidWcoYFRpbWUgdGFrZW4gZm9yIHJhbmRvbSBpZDogJHttZWFzdXJlUi5kdXJhdGlvbn0gbXNgKTsgLy8gT3V0cHV0cyB0aGUgdGltZSB0YWtlbiBpbiBtaWxsaXNlY29uZHNcclxuXHJcblxyXG4vLyBDbGVhciB0aGUgbWFya3MgYW5kIG1lYXN1cmVzIHRvIGF2b2lkIG1lbW9yeSBsZWFrc1xyXG4gICAgcGVyZm9ybWFuY2UuY2xlYXJNYXJrcygpO1xyXG4gICAgcGVyZm9ybWFuY2UuY2xlYXJNZWFzdXJlcygpO1xyXG4gIH07XHJcbiAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XHJcbiAgICBpZiAobW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gJ2FwcGx5Jykge1xyXG4gICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIGluIF90ZW1wbGF0ZUNhY2hlKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfdGVtcGxhdGVDYWNoZSwgdGVtcGxhdGUpKSB7XHJcbiAgICAgICAgICBkZWxldGUgX3RlbXBsYXRlQ2FjaGVbdGVtcGxhdGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=