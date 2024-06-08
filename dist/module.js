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
  const insertFeature = ({
                           text,
                         }) => {
    lssFeatures.features.value.data.content.push(text);
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
        if (item.system.activation?.type !== null && item.system.uses.max > 0) {
          if (useInteractiveBlocks) {
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
        } else {
          insertFeature({
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
        value: details.background?.name || '',
      },
      playerName: { name: 'playerName', label: 'имя игрока', value: '' },
      race: { name: 'race', label: 'раса', value: details.race?.name || '' },
      alignment: {
        name: 'alignment',
        label: 'мировоззрение',
        value: details.alignment || '',
      },
      experience: {
        name: 'experience',
        label: 'опыт',
        value: details.xp.value,
      },
    },
    subInfo: {
      age: { name: 'age', label: 'возраст', value: details.age || '' },
      height: { name: 'height', label: 'рост', value: details.height || '' },
      weight: { name: 'weight', label: 'вес', value: details.weight || '' },
      eyes: { name: 'eyes', label: 'глаза', value: details.eyes || '' },
      skin: { name: 'skin', label: 'кожа', value: details.skin || '' },
      hair: { name: 'hair', label: 'волосы', value: details.hair || '' },
    },
    spellsInfo: {
      base: {
        name: 'base',
        label: 'Базовая характеристика заклинаний',
        value: CONFIG.DND5E.abilities[attributes.spellcasting]?.label || 'Интеллект',
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
/* global game, ui  */





/*
function createActorHeaderButton(config, buttons) {
  const buttonLabel = game.i18n.localize('ELSS.CONVERT');
  if (config.object instanceof Actor) {
    buttons.unshift({
      label: buttonLabel,
      class: 'elss-actor',
      icon: 'fa-solid fa-language',
      onclick: async () => {
        console.clear();
        const jsonString = await convertFoundryToLss(config.object);
        console.debug('jsonString', jsonString);
      },
    });
  }
}
*/
Hooks.once('ready', async function () {
    // Hooks.on('getActorSheet5eHeaderButtons', createActorHeaderButton);
    game.settings.register(_module__WEBPACK_IMPORTED_MODULE_4__.moduleName, 'interactive-blocks', {
        'name': 'Использовать интерактивные блоки',
        'hint': 'При экспорте атаки и способности, которые можно использовать, будут оформлены интерактивными блоками, а не просто текстом',
        'scope': 'world',
        'config': true,
        'type': Boolean,
        'default': true,
    });
});
Hooks.on('getActorDirectoryEntryContext', (_, options) => {
    options.push({
        name: 'ELSS.CONVERT',
        icon: '<i class="fas fa-print"></i>',
        callback: async ([entry]) => {
            var _a;
            const actorId = entry.dataset.documentId;
            const actor = (_a = game.actors) === null || _a === void 0 ? void 0 : _a.get(actorId);
            if (actor) {
                if (ui.notifications) {
                    ui.notifications.info(game.i18n.localize('ELSS.CONVERT_START'));
                }
                const jsonString = await (0,_module_convert__WEBPACK_IMPORTED_MODULE_0__["default"])(actor);
                (0,_module_saveToFile__WEBPACK_IMPORTED_MODULE_1__["default"])(jsonString, actor === null || actor === void 0 ? void 0 : actor.name);
                if (ui.notifications) {
                    ui.notifications.info(game.i18n.localize('ELSS.CONVERT_END'));
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU87Ozs7Ozs7Ozs7Ozs7OztBQ0FQLGlFQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJEO0FBQ0E7QUFDQTtBQUNvRDtBQUNDO0FBQ2Q7QUFDRTtBQUNKO0FBQ0E7QUFDVTtBQUNEO0FBQ0U7QUFDUjtBQUNBO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZ0RBQVU7QUFDM0QsbUJBQW1CLDhEQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixVQUFVLFFBQVE7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsWUFBWTtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxhQUFhO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGFBQWE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsYUFBYTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsYUFBYTtBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxhQUFhO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxhQUFhO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxhQUFhO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQWE7QUFDekIsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJDQUEyQyxhQUFhO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQWE7QUFDekIsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNDQUFzQyxhQUFhO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQWE7QUFDekIsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFDQUFxQyxhQUFhO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQWE7QUFDekIsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFDQUFxQyxhQUFhO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQWE7QUFDekIsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLHlCQUF5QixlQUFlLEdBQUcsdUJBQXVCLElBQUkseUJBQXlCO0FBQy9GLHNCQUFzQixlQUFlLEdBQUcsdUJBQXVCO0FBQy9ELEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsVUFBVSxnQkFBZ0IsTUFBTTtBQUN0RDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBLDhDQUE4QyxnQkFBZ0IsR0FBRywwQkFBMEI7QUFDM0Y7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDJEQUFjO0FBQzVDLDBCQUEwQiw0REFBZTtBQUN6QztBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxrQ0FBa0Msa0JBQWtCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDJEQUFjO0FBQzFDO0FBQ0EsMEJBQTBCLDREQUFlO0FBQ3pDO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsVUFBVTtBQUNWLHFFQUFxRSxXQUFXLEVBQUUsa0JBQWtCO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUIsRUFBRSx3REFBVztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFlBQVk7QUFDWjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLHdCQUF3QiwwREFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsdUJBQXVCLHdEQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxzQkFBc0Isd0RBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUJBQWlCLHlEQUFTO0FBQzFCO0FBQ0EsZUFBZSxnRUFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLCtCQUErQixHQUFHLG1CQUFtQjtBQUN6RjtBQUNBLE9BQU87QUFDUCxlQUFlLHVEQUF1RDtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxvQkFBb0Isb0RBQW9EO0FBQ3hFLGNBQWMsOERBQThEO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLGFBQWEseURBQXlEO0FBQ3RFLGdCQUFnQiw0REFBNEQ7QUFDNUUsZ0JBQWdCLDJEQUEyRDtBQUMzRSxjQUFjLHlEQUF5RDtBQUN2RSxjQUFjLHdEQUF3RDtBQUN0RSxjQUFjLDBEQUEwRDtBQUN4RSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLG1CQUFtQix1QkFBdUI7QUFDMUMsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0EsWUFBWSw0QkFBNEI7QUFDeEMsZUFBZSxpQ0FBaUM7QUFDaEQsb0JBQW9CLDhCQUE4QjtBQUNsRCxrQkFBa0IsMEJBQTBCO0FBQzVDLHNCQUFzQiw0QkFBNEI7QUFDbEQsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQyw0QkFBNEI7QUFDL0UsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwwQkFBMEI7QUFDMUMsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEMsWUFBWSxvQkFBb0I7QUFDaEMsWUFBWSxvQkFBb0I7QUFDaEMsWUFBWSxvQkFBb0I7QUFDaEMsWUFBWSxvQkFBb0I7QUFDaEMsS0FBSztBQUNMLG1CQUFtQixzQ0FBc0M7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxjQUFjLHNDQUFzQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOW1CbkMsaUVBQWU7QUFDZjtBQUNBLGtCQUFrQixXQUFXO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ05EOzs7O0FBSUEsaUVBQWUsUUFBUSwwQkFBMEI7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQm1EOztBQUVwRCxpRUFBZTtBQUNmLGFBQWEsOERBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsR0FBRztBQUN2QjtBQUNBLHdCQUF3QixHQUFHO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekJEOztBQUVBLGlFQUFlLFFBQVEsMEJBQTBCO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkQ7OztBQUdBO0FBQ0EsV0FBVyw2Q0FBNkM7QUFDeEQsU0FBUyxpRUFBaUU7QUFDMUUsU0FBUyw0REFBNEQ7QUFDckUsU0FBUywwREFBMEQ7QUFDbkUsWUFBWSx5REFBeUQ7QUFDckU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGdCQUFnQiwyQ0FBMkM7QUFDM0QsaUJBQWlCLHVEQUF1RDtBQUN4RSxnQkFBZ0IscURBQXFEO0FBQ3JFLGVBQWU7QUFDZjs7QUFFQSxpRUFBZSxFQUFFLHNEQUFzRDtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdDQUFnQyxrQkFBa0IsT0FBTztBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0NBQWdDLGtCQUFrQixPQUFPO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQ0FBZ0Msa0JBQWtCLE9BQU87QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdDQUFnQyxrQkFBa0IsT0FBTztBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGFBQWEsRUFBRSxvQ0FBb0MsdUJBQXVCLFFBQVE7QUFDakg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzVFbUQ7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxXQUFXOzs7QUFHckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlO0FBQ2Y7QUFDQSxvQkFBb0IsOERBQWlCLE1BQU07QUFDM0M7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG1CQUFtQix1Q0FBdUM7QUFDMUQsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsV0FBVyxjQUFjLDJDQUEyQztBQUN4RyxNQUFNO0FBQ04sOEJBQThCLDJDQUEyQztBQUN6RTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUEsaUVBQWU7QUFDZjtBQUNBLHlEQUF5RCxNQUFNO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLE1BQU0sU0FBUyxPQUFPO0FBQzVDO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdEREOzs7O0FBSUEsaUVBQWUsUUFBUSwyQkFBMkI7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCRCxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0I7QUFDdkM7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0MsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMEJBQTBCO0FBQy9DLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2pFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsU0FBUztBQUM3RDtBQUNBLDJDQUEyQywwQkFBMEI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNiNUIsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7VUMzQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQSxzQkFBc0I7QUFDNkI7QUFDSjtBQUVJO0FBQ1E7QUFDcEI7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQkU7QUFHRixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLO0lBQ3ZCLHFFQUFxRTtJQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQywrQ0FBVSxFQUFFLG9CQUFvQixFQUFFO1FBQ3ZELE1BQU0sRUFBRSxrQ0FBa0M7UUFDMUMsTUFBTSxFQUFFLDJIQUEySDtRQUNuSSxPQUFPLEVBQUUsT0FBTztRQUNoQixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxPQUFPO1FBQ2YsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUM7QUFFSCxLQUFLLENBQUMsRUFBRSxDQUFDLCtCQUErQixFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDWCxJQUFJLEVBQUUsY0FBYztRQUNwQixJQUFJLEVBQUUsOEJBQThCO1FBQ3BDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFOztZQUMxQixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUN6QyxNQUFNLEtBQUssR0FBRyxVQUFJLENBQUMsTUFBTSwwQ0FBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFO29CQUNwQixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7aUJBQ2pFO2dCQUNELE1BQU0sVUFBVSxHQUFHLE1BQU0sMkRBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BELDhEQUFZLENBQUMsVUFBVSxFQUFFLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFO29CQUNwQixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7aUJBQy9EO2FBQ0Y7UUFDSCxDQUFDO1FBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7O1lBQ2hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsTUFBTSxLQUFLLEdBQUcsVUFBSSxDQUFDLE1BQU0sMENBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLCtEQUErRDtZQUMvRCxPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUM7UUFDbEQsQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBR0gsbUNBQW1DO0FBQ25DLElBQUksSUFBc0MsRUFBRTtJQUUxQyxhQUFhO0lBQ2IsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNoQyxrRUFBa0U7UUFDbEUsTUFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBRXBDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsU0FBUyxDQUFDLElBQUksQ0FBQyxpRUFBYSxDQUFDLEdBQUcsV0FBVyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUNELCtDQUErQztRQUMvQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUd2RCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLFNBQVMsQ0FBQyxJQUFJLENBQUMscUVBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0Qsd0NBQXdDO1FBQ3hDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFM0QsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsK0JBQStCO1FBQ3RFLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLE9BQU8sQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMseUNBQXlDO1FBRTVHLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLFFBQVEsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMseUNBQXlDO1FBR2pILHFEQUFxRDtRQUNqRCxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekIsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUNGLElBQUksS0FBVSxFQUFFLEVBU2Y7Q0FDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZnJleS1sc3MtY29udmVudmVyLy4vc3JjL19tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2NvbGxlY3RMYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2dlbmVyYXRlVW5pcXVlSWRzLmpzIiwid2VicGFjazovL2VsZnJleS1sc3MtY29udmVudmVyLy4vc3JjL21vZHVsZS9nZXRBcm1vci5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvZ2V0UmVzb3VyY2UuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2dldFRvb2xzLmpzIiwid2VicGFjazovL2VsZnJleS1sc3MtY29udmVudmVyLy4vc3JjL21vZHVsZS9nZXRUcmFpdHMuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2dldFdlYXBvbk9iamVjdC5qcyIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUvZ2V0V2VhcG9uU3RhdHMuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2dldFdlYXBvbnMuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL2h0bWxUb0xzc0pzb24uanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL3NhdmVUb0ZpbGUuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvLi9zcmMvbW9kdWxlL3VpZEZyb21TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VsZnJleS1sc3MtY29udmVudmVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZWxmcmV5LWxzcy1jb252ZW52ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lbGZyZXktbHNzLWNvbnZlbnZlci8uL3NyYy9tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IG1vZHVsZU5hbWUgPSAnZWxmcmV5LWxzcy1jb252ZXJ0ZXInO1xuIiwiZXhwb3J0IGRlZmF1bHQgKGxhbmd1YWdlc0RhdGEpID0+IHtcbiAgbGV0IHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGUpIHtcbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnICYmIG5vZGUgIT09IG51bGwpIHtcbiAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHRyYXZlcnNlKG5vZGUuY2hpbGRyZW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5vZGUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5vZGVba2V5XSA9PT0gJ29iamVjdCcgJiYgbm9kZVtrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0cmF2ZXJzZShub2RlW2tleV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IG5vZGVba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0cmF2ZXJzZShsYW5ndWFnZXNEYXRhKTtcbiAgcmVzdWx0W1wiZHJ1aWRpY1wiXSA9IGxhbmd1YWdlc0RhdGEuZHJ1aWRpYztcbiAgcmVzdWx0W1wiY2FudFwiXSA9IGxhbmd1YWdlc0RhdGEuY2FudDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qIGdsb2JhbCBDT05GSUcsIGdhbWUgKi9cclxuXHJcblxyXG5pbXBvcnQgZ2VuZXJhdGVVbmlxdWVJZHMgZnJvbSAnLi9nZW5lcmF0ZVVuaXF1ZUlkcyc7XHJcbmltcG9ydCBjb2xsZWN0TGFuZ3VhZ2VzIGZyb20gJy4vY29sbGVjdExhbmd1YWdlcy5qcyc7XHJcbmltcG9ydCBnZXRUcmFpdHMgZnJvbSAnLi9nZXRUcmFpdHMuanMnO1xyXG5pbXBvcnQgZ2V0V2VhcG9ucyBmcm9tICcuL2dldFdlYXBvbnMuanMnO1xyXG5pbXBvcnQgZ2V0QXJtb3IgZnJvbSAnLi9nZXRBcm1vci5qcyc7XHJcbmltcG9ydCBnZXRUb29scyBmcm9tICcuL2dldFRvb2xzLmpzJztcclxuaW1wb3J0IGh0bWxUb0xzc0pzb24gZnJvbSAnLi9odG1sVG9Mc3NKc29uLmpzJztcclxuaW1wb3J0IGdldFdlYXBvblN0YXRzIGZyb20gJy4vZ2V0V2VhcG9uU3RhdHMnO1xyXG5pbXBvcnQgZ2V0V2VhcG9uT2JqZWN0IGZyb20gJy4vZ2V0V2VhcG9uT2JqZWN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJy4vZ2V0UmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIH0gZnJvbSAnLi4vX21vZHVsZSc7XHJcblxyXG5cclxuY29uc3QgdGV4dFRlbXBsYXRlID0gKHRleHQpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogJ3BhcmFncmFwaCcsXHJcbiAgICBjb250ZW50OiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgdGV4dCxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfTtcclxufTtcclxuXHJcblxyXG5jb25zdCBmdHRTa2lsbHNLZXlzID0ge1xyXG4gIGFjcjoge1xyXG4gICAgYmFzZVN0YXQ6ICdkZXgnLFxyXG4gICAgbmFtZTogJ2Fjcm9iYXRpY3MnLFxyXG4gICAgbGFiZWw6ICfQkNC60YDQvtCx0LDRgtC40LrQsCcsXHJcbiAgICBsc3NTa2lsbDogJ2Fjcm9iYXRpY3MnLFxyXG4gIH0sXHJcbiAgYW5pOiB7XHJcbiAgICBiYXNlU3RhdDogJ3dpcycsXHJcbiAgICBuYW1lOiAnYW5pbWFsSGFuZGxpbmcnLFxyXG4gICAgbGFiZWw6ICfQlNGA0LXRgdGB0LjRgNC+0LLQutCwJyxcclxuICAgIGxzc1NraWxsOiAnYW5pbWFsIGhhbmRsaW5nJyxcclxuICB9LFxyXG4gIGFyYzoge1xyXG4gICAgYmFzZVN0YXQ6ICdpbnQnLFxyXG4gICAgbmFtZTogJ2FyY2FuYScsXHJcbiAgICBsYWJlbDogJ9Cc0LDQs9C40Y8nLFxyXG4gICAgbHNzU2tpbGw6ICdhcmNhbmEnLFxyXG4gIH0sXHJcbiAgYXRoOiB7XHJcbiAgICBiYXNlU3RhdDogJ3N0cicsXHJcbiAgICBuYW1lOiAnYXRobGV0aWNzJyxcclxuICAgIGxhYmVsOiAn0JDRgtC70LXRgtC40LrQsCcsXHJcbiAgICBsc3NTa2lsbDogJ2F0aGxldGljcycsXHJcbiAgfSxcclxuICBkZWM6IHtcclxuICAgIGJhc2VTdGF0OiAnY2hhJyxcclxuICAgIG5hbWU6ICdkZWNlcHRpb24nLFxyXG4gICAgbGFiZWw6ICfQntCx0LzQsNC9JyxcclxuICAgIGxzc1NraWxsOiAnZGVjZXB0aW9uJyxcclxuICB9LFxyXG4gIGhpczoge1xyXG4gICAgYmFzZVN0YXQ6ICdpbnQnLFxyXG4gICAgbmFtZTogJ2hpc3RvcnknLFxyXG4gICAgbGFiZWw6ICfQmNGB0YLQvtGA0LjRjycsXHJcbiAgICBsc3NTa2lsbDogJ2hpc3RvcnknLFxyXG4gIH0sXHJcbiAgaW5zOiB7XHJcbiAgICBiYXNlU3RhdDogJ3dpcycsXHJcbiAgICBuYW1lOiAnaW5zaWdodCcsXHJcbiAgICBsYWJlbDogJ9Cf0YDQvtC90LjRhtCw0YLQtdC70YzQvdC+0YHRgtGMJyxcclxuICAgIGxzc1NraWxsOiAnaW5zaWdodCcsXHJcbiAgfSxcclxuICBpbnY6IHtcclxuICAgIGJhc2VTdGF0OiAnaW50JyxcclxuICAgIG5hbWU6ICdpbnZlc3RpZ2F0aW9uJyxcclxuICAgIGxhYmVsOiAn0KDQsNGB0YHQu9C10LTQvtCy0LDQvdC40LUnLFxyXG4gICAgbHNzU2tpbGw6ICdpbnZlc3RpZ2F0aW9uJyxcclxuICB9LFxyXG4gIGl0bToge1xyXG4gICAgYmFzZVN0YXQ6ICdjaGEnLFxyXG4gICAgbmFtZTogJ2ludGltaWRhdGlvbicsXHJcbiAgICBsYWJlbDogJ9CX0LDQv9GD0LPQuNCy0LDQvdC40LUnLFxyXG4gICAgbHNzU2tpbGw6ICdpbnRpbWlkYXRpb24nLFxyXG4gIH0sXHJcbiAgbWVkOiB7XHJcbiAgICBiYXNlU3RhdDogJ3dpcycsXHJcbiAgICBuYW1lOiAnbWVkaWNpbmUnLFxyXG4gICAgbGFiZWw6ICfQnNC10LTQuNGG0LjQvdCwJyxcclxuICAgIGxzc1NraWxsOiAnbWVkaWNpbmUnLFxyXG4gIH0sXHJcbiAgbmF0OiB7XHJcbiAgICBiYXNlU3RhdDogJ2ludCcsXHJcbiAgICBuYW1lOiAnbmF0dXJlJyxcclxuICAgIGxhYmVsOiAn0J/RgNC40YDQvtC00LAnLFxyXG4gICAgbHNzU2tpbGw6ICduYXR1cmUnLFxyXG4gIH0sXHJcbiAgcGVyOiB7XHJcbiAgICBiYXNlU3RhdDogJ2NoYScsXHJcbiAgICBuYW1lOiAncGVyc3Vhc2lvbicsXHJcbiAgICBsYWJlbDogJ9Cj0LHQtdC20LTQtdC90LjQtScsXHJcbiAgICBsc3NTa2lsbDogJ3BlcnN1YXNpb24nLFxyXG4gIH0sXHJcbiAgcHJjOiB7XHJcbiAgICBiYXNlU3RhdDogJ3dpcycsXHJcbiAgICBuYW1lOiAncGVyY2VwdGlvbicsXHJcbiAgICBsYWJlbDogJ9CS0L3QuNC80LDQvdC40LUnLFxyXG4gICAgbHNzU2tpbGw6ICdwZXJjZXB0aW9uJyxcclxuICB9LFxyXG4gIHByZjoge1xyXG4gICAgYmFzZVN0YXQ6ICdjaGEnLFxyXG4gICAgbmFtZTogJ3BlcmZvcm1hbmNlJyxcclxuICAgIGxhYmVsOiAn0JjRgdC/0L7Qu9C90LXQvdC40LUnLFxyXG4gICAgbHNzU2tpbGw6ICdwZXJmb3JtYW5jZScsXHJcbiAgfSxcclxuICByZWw6IHtcclxuICAgIGJhc2VTdGF0OiAnaW50JyxcclxuICAgIG5hbWU6ICdyZWxpZ2lvbicsXHJcbiAgICBsYWJlbDogJ9Cg0LXQu9C40LPQuNGPJyxcclxuICAgIGxzc1NraWxsOiAncmVsaWdpb24nLFxyXG4gIH0sXHJcbiAgc2x0OiB7XHJcbiAgICBiYXNlU3RhdDogJ2RleCcsXHJcbiAgICBuYW1lOiAnc2xlaWdodE9mSGFuZCcsXHJcbiAgICBsYWJlbDogJ9Cb0L7QstC60L7RgdGC0Ywg0YDRg9C6JyxcclxuICAgIGxzc1NraWxsOiAnc2xlaWdodCBvZiBoYW5kJyxcclxuICB9LFxyXG4gIHN0ZToge1xyXG4gICAgYmFzZVN0YXQ6ICdkZXgnLFxyXG4gICAgbmFtZTogJ3N0ZWFsdGgnLFxyXG4gICAgbGFiZWw6ICfQodC60YDRi9GC0L3QvtGB0YLRjCcsXHJcbiAgICBsc3NTa2lsbDogJ3N0ZWFsdGgnLFxyXG4gIH0sXHJcbiAgc3VyOiB7XHJcbiAgICBiYXNlU3RhdDogJ3dpcycsXHJcbiAgICBuYW1lOiAnc3Vydml2YWwnLFxyXG4gICAgbGFiZWw6ICfQktGL0LbQuNCy0LDQvdC40LUnLFxyXG4gICAgbHNzU2tpbGw6ICdzdXJ2aXZhbCcsXHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IGNvbnZlcnRGb3VuZHJ5VG9Mc3MgPSBhc3luYyAoYWN0b3JEYXRhKSA9PiB7XHJcbiAgY29uc3QgdXNlSW50ZXJhY3RpdmVCbG9ja3MgPSBnYW1lLnNldHRpbmdzLmdldChtb2R1bGVOYW1lLCAnaW50ZXJhY3RpdmUtYmxvY2tzJyk7XHJcbiAgY29uc3QgcmFuZG9tSWQgPSBnZW5lcmF0ZVVuaXF1ZUlkcygyMCk7XHJcbiAgY29uc3QgaXRlbXNQYWNrID0gZ2FtZS5wYWNrcy5nZXQoJ2RuZDVlLml0ZW1zJyk7XHJcbiAgY29uc3Qge1xyXG4gICAgYWJpbGl0aWVzLFxyXG4gICAgYXR0cmlidXRlcyxcclxuICAgIGRldGFpbHMsXHJcbiAgICBza2lsbHMsXHJcbiAgICBzcGVsbHMsXHJcbiAgICBjdXJyZW5jeSxcclxuICAgIHRyYWl0cyxcclxuICAgIHRvb2xzOiBhY3RvclRvb2xzLFxyXG4gIH0gPSBhY3RvckRhdGEuc3lzdGVtO1xyXG4gIGNvbnN0IHsgaXRlbXMgfSA9IGFjdG9yRGF0YTtcclxuXHJcbiAgbGV0IGxzc1NwZWxscyA9IHtcclxuICAgICdzcGVsbHMtbGV2ZWwtMCc6IHtcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBpZDogYGhvdmVyLXRvb2xiYXItc3BlbGxzLWxldmVsLTAtJHtyYW5kb21JZFswXX1gLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHR5cGU6ICdkb2MnLFxyXG4gICAgICAgICAgY29udGVudDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuICBjb25zdCBsc3NFcXVpcG1lbnQgPSB7XHJcbiAgICBlcXVpcG1lbnQ6IHtcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBpZDogYGhvdmVyLXRvb2xiYXItZXF1aXBtZW50LSR7cmFuZG9tSWRbMTBdfWAsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdHlwZTogJ2RvYycsXHJcbiAgICAgICAgICBjb250ZW50OiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG4gIGNvbnN0IGxzc0F0dGFja3MgPSB7XHJcbiAgICBhdHRhY2tzOiB7XHJcbiAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgaWQ6IGBob3Zlci10b29sYmFyLWF0dGFja3MtJHtyYW5kb21JZFsxMl19YCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0eXBlOiAnZG9jJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbiAgY29uc3QgbHNzVHJhaXRzID0ge1xyXG4gICAgdHJhaXRzOiB7XHJcbiAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgaWQ6IGBob3Zlci10b29sYmFyLXRyYWl0cy0ke3JhbmRvbUlkWzEyXX1gLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHR5cGU6ICdkb2MnLFxyXG4gICAgICAgICAgY29udGVudDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuICBjb25zdCBpbnNlcnRUcmFpdCA9ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSkgPT4ge1xyXG4gICAgY29uc3QgdG1wVHJhaXQgPSB0eXBlID09PSAncmVzb3VyY2UnID8ge1xyXG4gICAgICB0eXBlOiAncmVzb3VyY2UnLFxyXG4gICAgICBhdHRyczoge1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRleHROYW1lLFxyXG4gICAgICB9LFxyXG4gICAgfSA6IHtcclxuICAgICAgLi4udGV4dCxcclxuICAgIH07XHJcbiAgICBsc3NUcmFpdHMudHJhaXRzLnZhbHVlLmRhdGEuY29udGVudC5wdXNoKHRtcFRyYWl0KTtcclxuICB9O1xyXG4gIGNvbnN0IGluc2VydEZlYXR1cmUgPSAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSkgPT4ge1xyXG4gICAgbHNzRmVhdHVyZXMuZmVhdHVyZXMudmFsdWUuZGF0YS5jb250ZW50LnB1c2godGV4dCk7XHJcbiAgfTtcclxuICBjb25zdCBsc3NGZWF0dXJlcyA9IHtcclxuICAgIGZlYXR1cmVzOiB7XHJcbiAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgaWQ6IGBob3Zlci10b29sYmFyLWZlYXR1cmVzLSR7cmFuZG9tSWRbMTNdfWAsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdHlwZTogJ2RvYycsXHJcbiAgICAgICAgICBjb250ZW50OiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG4gIGNvbnN0IGxzc0l0ZW1zID0ge1xyXG4gICAgaXRlbXM6IHtcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICBpZDogYGhvdmVyLXRvb2xiYXItaXRlbXMtJHtyYW5kb21JZFsxNF19YCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0eXBlOiAnZG9jJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbiAgY29uc3QgbHNzUHJvZiA9IHtcclxuICAgIHZhbHVlOiB7XHJcbiAgICAgIGlkOiBgaG92ZXItdG9vbGJhci1wcm9mLSR7cmFuZG9tSWRbMTFdfWAsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiAnZG9jJyxcclxuICAgICAgICBjb250ZW50OiBbXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuICBjb25zdCBsc3NXZWFwb25zID0gW107XHJcbiAgY29uc3QgbHNzUmVzb3VyY2UgPSB7fTtcclxuXHJcbiAgY29uc3QgY2hhckNsYXNzID0gW107XHJcbiAgY29uc3Qgc3BlbGxDYXN0aW5nID0gW107XHJcbiAgbGV0IHNwZWxsQ2FzdGluZ1N0cmluZyA9IFtdO1xyXG4gIGNvbnN0IGhpdERpZSA9IHsgdmFsdWU6ICcnIH07XHJcbiAgY29uc3QgaGl0RGllTXVsdGlwbGUgPSB7fTtcclxuICBsZXQgcGFjdFNwZWxsID0ge307XHJcbiAgY29uc3Qgc3BlbGxTbG90cyA9IHt9O1xyXG4gIGNvbnN0IGxzc1N0YXRzID0ge307XHJcbiAgY29uc3QgbHNzU2F2ZXMgPSB7fTtcclxuICBjb25zdCBsc3NTa2lsbHMgPSB7fTtcclxuICBsZXQgdHJhaXRTdHJpbmdzID0gW107XHJcbiAgY29uc3QgY2hhcmFjdGVyVHJhaXRzID0ge1xyXG4gICAgJ2JhY2tncm91bmQnOiB7XHJcbiAgICAgICdpc0hpZGRlbic6IGZhbHNlLFxyXG4gICAgICAndmFsdWUnOiB7XHJcbiAgICAgICAgJ2lkJzogYGhvdmVyLXRvb2xiYXItYmFja2dyb3VuZC0ke3JhbmRvbUlkWzE1XX1gLFxyXG4gICAgICAgICdkYXRhJzoge1xyXG4gICAgICAgICAgJ3R5cGUnOiAnZG9jJyxcclxuICAgICAgICAgICdjb250ZW50JzpcclxuICAgICAgICAgICAgaHRtbFRvTHNzSnNvbihkZXRhaWxzLmJpb2dyYXBoeS52YWx1ZSksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAncGVyc29uYWxpdHknOiB7XHJcbiAgICAgICd2YWx1ZSc6IHtcclxuICAgICAgICAnaWQnOiBgaG92ZXItdG9vbGJhci1wZXJzb25hbGl0eS0ke3JhbmRvbUlkWzE2XX1gLFxyXG4gICAgICAgICdkYXRhJzoge1xyXG4gICAgICAgICAgJ3R5cGUnOiAnZG9jJyxcclxuICAgICAgICAgICdjb250ZW50JzpcclxuICAgICAgICAgICAgaHRtbFRvTHNzSnNvbihkZXRhaWxzLnRyYWl0KSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgICdpZGVhbHMnOiB7XHJcbiAgICAgICd2YWx1ZSc6IHtcclxuICAgICAgICAnaWQnOiBgaG92ZXItdG9vbGJhci1pZGVhbHMtJHtyYW5kb21JZFsxN119YCxcclxuICAgICAgICAnZGF0YSc6IHtcclxuICAgICAgICAgICd0eXBlJzogJ2RvYycsXHJcbiAgICAgICAgICAnY29udGVudCc6XHJcbiAgICAgICAgICAgIGh0bWxUb0xzc0pzb24oZGV0YWlscy5pZGVhbCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAnYm9uZHMnOiB7XHJcbiAgICAgICd2YWx1ZSc6IHtcclxuICAgICAgICAnaWQnOiBgaG92ZXItdG9vbGJhci1ib25kcy0ke3JhbmRvbUlkWzE4XX1gLFxyXG4gICAgICAgICdkYXRhJzoge1xyXG4gICAgICAgICAgJ3R5cGUnOiAnZG9jJyxcclxuICAgICAgICAgICdjb250ZW50JzpcclxuICAgICAgICAgICAgaHRtbFRvTHNzSnNvbihkZXRhaWxzLmJvbmQpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgJ2ZsYXdzJzoge1xyXG4gICAgICAndmFsdWUnOiB7XHJcbiAgICAgICAgJ2lkJzogYGhvdmVyLXRvb2xiYXItZmxhd3MtJHtyYW5kb21JZFsxOV19YCxcclxuICAgICAgICAnZGF0YSc6IHtcclxuICAgICAgICAgICd0eXBlJzogJ2RvYycsXHJcbiAgICAgICAgICAnY29udGVudCc6XHJcbiAgICAgICAgICAgIGh0bWxUb0xzc0pzb24oZGV0YWlscy5mbGF3KSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gR2V0IGNsYXNzIGFuZCBzcGVsbGNhc3RpbmcgaW5mb3JtYXRpb25cclxuICBPYmplY3Qua2V5cyhhY3RvckRhdGEuX2NsYXNzZXMpLmZvckVhY2goKGNsYXNzS2V5KSA9PiB7XHJcbiAgICBjb25zdCBjdXJDbGFzcyA9IGFjdG9yRGF0YS5fY2xhc3Nlc1tjbGFzc0tleV07XHJcbiAgICBjb25zdCBzcGVsbENsYXNzID0gY3VyQ2xhc3Muc3BlbGxjYXN0aW5nLnByb2dyZXNzaW9uO1xyXG4gICAgaWYgKHNwZWxsQ2xhc3MgIT09ICdub25lJykge1xyXG4gICAgICBzcGVsbENhc3RpbmcucHVzaChjbGFzc0tleSk7XHJcbiAgICAgIHNwZWxsQ2FzdGluZ1N0cmluZy5wdXNoKGN1ckNsYXNzLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGhpdERpZU11bHRpcGxlW2N1ckNsYXNzLnN5c3RlbS5oaXREaWNlXSkge1xyXG4gICAgICBoaXREaWVNdWx0aXBsZVtjdXJDbGFzcy5zeXN0ZW0uaGl0RGljZV0gPSB7XHJcbiAgICAgICAgY3VycmVudDogaGl0RGllTXVsdGlwbGVbY3VyQ2xhc3Muc3lzdGVtLmhpdERpY2VdLmN1cnJlbnQgKyBjdXJDbGFzcy5zeXN0ZW0ubGV2ZWxzLFxyXG4gICAgICAgIG1heDogaGl0RGllTXVsdGlwbGVbY3VyQ2xhc3Muc3lzdGVtLmhpdERpY2VdLm1heCArIGN1ckNsYXNzLnN5c3RlbS5sZXZlbHMsXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoaXREaWVNdWx0aXBsZVtjdXJDbGFzcy5zeXN0ZW0uaGl0RGljZV0gPSB7XHJcbiAgICAgICAgY3VycmVudDogY3VyQ2xhc3Muc3lzdGVtLmxldmVscyxcclxuICAgICAgICBtYXg6IGN1ckNsYXNzLnN5c3RlbS5sZXZlbHMsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoaGl0RGllLnZhbHVlID09PSAnJykge1xyXG4gICAgICBoaXREaWUudmFsdWUgPSBjdXJDbGFzcy5zeXN0ZW0uaGl0RGljZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhpdERpZS52YWx1ZSA9ICdtdWx0aWNsYXNzJztcclxuICAgIH1cclxuICAgIC8vIGNoYXJDbGFzcy5wdXNoKGAke2N1ckNsYXNzLm5hbWV9ICgke2N1ckNsYXNzLnN5c3RlbS5sZXZlbHN9KSAke2N1ckNsYXNzLl9jbGFzc0xpbmsubmFtZX1gKTtcclxuICAgIGNoYXJDbGFzcy5wdXNoKGAke2N1ckNsYXNzLm5hbWV9ICgke2N1ckNsYXNzLnN5c3RlbS5sZXZlbHN9KWApO1xyXG4gIH0pO1xyXG5cclxuICAvLyBHZXQgc3BlbGwgc2xvdHMgYW5kIHBhY3QgbWFnaWNcclxuICBPYmplY3Qua2V5cyhzcGVsbHMpLmZvckVhY2goKHNwZWxsU2xvdEtleSkgPT4ge1xyXG4gICAgY29uc3Qgc3BlbGxTbG90ID0gc3BlbGxzW3NwZWxsU2xvdEtleV07XHJcbiAgICBpZiAoc3BlbGxTbG90S2V5ID09PSAncGFjdCcpIHtcclxuICAgICAgaWYgKHNwZWxsU2xvdC5sZXZlbCAhPT0gMCkge1xyXG4gICAgICAgIHBhY3RTcGVsbCA9IHsgW2BzbG90cy0ke3NwZWxsU2xvdC5sZXZlbH1gXTogeyB2YWx1ZTogc3BlbGxTbG90Lm1heCB9IH07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxzc1NwZWxscyA9IHtcclxuICAgICAgICAuLi5sc3NTcGVsbHMsXHJcbiAgICAgICAgW2BzcGVsbHMtbGV2ZWwtJHtzcGVsbFNsb3QubGV2ZWx9YF06IHtcclxuICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgIGlkOiBgaG92ZXItdG9vbGJhci1zcGVsbHMtbGV2ZWwtJHtzcGVsbFNsb3QubGV2ZWx9LSR7cmFuZG9tSWRbc3BlbGxTbG90LmxldmVsXX1gLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ2RvYycsXHJcbiAgICAgICAgICAgICAgY29udGVudDogW10sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIHNwZWxsU2xvdHNbc3BlbGxTbG90S2V5LnJlcGxhY2UoL15zcGVsbC8sICdzbG90cy0nKV0gPSB7XHJcbiAgICAgICAgdmFsdWU6IHNwZWxsU2xvdC5tYXgsXHJcbiAgICAgICAgZmlsbGVkOiBzcGVsbFNsb3QubWF4LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBHZXQgc3RhdHNcclxuICBmb3IgKGxldCBhYiBpbiBhYmlsaXRpZXMpIHtcclxuICAgIGxzc1N0YXRzW2FiXSA9IHtcclxuICAgICAgbmFtZTogYWIsXHJcbiAgICAgIGxhYmVsOiBDT05GSUcuRE5ENUUuYWJpbGl0aWVzW2FiXS5sYWJlbCxcclxuICAgICAgc2NvcmU6IGFiaWxpdGllc1thYl0udmFsdWUsXHJcbiAgICAgIG1vZGlmaWVyOiAwLFxyXG4gICAgICBjaGVjazogMCxcclxuICAgIH07XHJcbiAgICBsc3NTYXZlc1thYl0gPSB7XHJcbiAgICAgIG5hbWU6IGFiLFxyXG4gICAgICBpc1Byb2Y6ICEhYWJpbGl0aWVzW2FiXS5wcm9maWNpZW50LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIEdldCBza2lsbHNcclxuICBmb3IgKGxldCBza2lsbCBpbiBza2lsbHMpIHtcclxuICAgIGxzc1NraWxsc1tmdHRTa2lsbHNLZXlzW3NraWxsXS5sc3NTa2lsbF0gPSB7XHJcbiAgICAgIGJhc2VTdGF0OiBza2lsbHNbc2tpbGxdLmFiaWxpdHksXHJcbiAgICAgIG5hbWU6IGZ0dFNraWxsc0tleXNbc2tpbGxdLmxzc1NraWxsLFxyXG4gICAgICBsYWJlbDogQ09ORklHLkRORDVFLnNraWxsc1tza2lsbF0ubGFiZWwsXHJcbiAgICAgIGlzUHJvZjogc2tpbGxzW3NraWxsXS5wcm9maWNpZW50LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIEdldCBpdGVtcywgc3BlbGxzLCBhbmQgZmVhdHVyZXNcclxuICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xyXG4gICAgICBjYXNlICdzcGVsbCc6IHtcclxuICAgICAgICBpZiAoWydyc2FrJywgJ21zYWsnXS5pbmNsdWRlcyhpdGVtLnN5c3RlbS5hY3Rpb25UeXBlKSAmJiBpdGVtLnN5c3RlbS5sZXZlbCA9PT0gMCkge1xyXG4gICAgICAgICAgY29uc3Qgd2VhcG9uU3RhdHMgPSBnZXRXZWFwb25TdGF0cyhpdGVtLCBhY3RvckRhdGEpO1xyXG4gICAgICAgICAgbHNzV2VhcG9ucy5wdXNoKGdldFdlYXBvbk9iamVjdCh7XHJcbiAgICAgICAgICAgIC4uLml0ZW0sXHJcbiAgICAgICAgICAgIC4uLndlYXBvblN0YXRzLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IGFjdG9yRGF0YSxcclxuICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbHNzU3BlbGxzW2BzcGVsbHMtbGV2ZWwtJHtpdGVtLnN5c3RlbS5sZXZlbH1gXS52YWx1ZS5kYXRhLmNvbnRlbnQucHVzaCh0ZXh0VGVtcGxhdGUoaXRlbS5uYW1lKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnZXF1aXBtZW50Jzoge1xyXG4gICAgICAgIGxzc0VxdWlwbWVudC5lcXVpcG1lbnQudmFsdWUuZGF0YS5jb250ZW50LnB1c2godGV4dFRlbXBsYXRlKGl0ZW0ubmFtZSkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlYXBvbic6IHtcclxuICAgICAgICBjb25zdCB3ZWFwb25TdGF0cyA9IGdldFdlYXBvblN0YXRzKGl0ZW0pO1xyXG4gICAgICAgIGlmICh1c2VJbnRlcmFjdGl2ZUJsb2Nrcykge1xyXG4gICAgICAgICAgbHNzV2VhcG9ucy5wdXNoKGdldFdlYXBvbk9iamVjdCh7XHJcbiAgICAgICAgICAgIC4uLml0ZW0sXHJcbiAgICAgICAgICAgIC4uLndlYXBvblN0YXRzLFxyXG4gICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsc3NBdHRhY2tzLmF0dGFja3MudmFsdWUuZGF0YS5jb250ZW50LnB1c2godGV4dFRlbXBsYXRlKGAke2l0ZW0ubmFtZX0gJHt3ZWFwb25TdGF0cy5sYWJlbH1gKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2ZlYXQnOiB7XHJcbiAgICAgICAgaWYgKGl0ZW0uc3lzdGVtLmFjdGl2YXRpb24/LnR5cGUgIT09IG51bGwgJiYgaXRlbS5zeXN0ZW0udXNlcy5tYXggPiAwKSB7XHJcbiAgICAgICAgICBpZiAodXNlSW50ZXJhY3RpdmVCbG9ja3MpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpZCwgaXRlbTogcmVzb3VyY2VJdGVtIH0gPSBnZXRSZXNvdXJjZShpdGVtKTtcclxuICAgICAgICAgICAgbHNzUmVzb3VyY2VbaWRdID0gcmVzb3VyY2VJdGVtO1xyXG4gICAgICAgICAgICBpbnNlcnRUcmFpdCh7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ3Jlc291cmNlJyxcclxuICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICB0ZXh0TmFtZTogJ3RyYWl0cycsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5zZXJ0VHJhaXQoe1xyXG4gICAgICAgICAgICAgIHRleHQ6IHRleHRUZW1wbGF0ZShpdGVtLm5hbWUpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaW5zZXJ0RmVhdHVyZSh7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHRUZW1wbGF0ZShpdGVtLm5hbWUpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2NvbnN1bWFibGUnOlxyXG4gICAgICBjYXNlICdjb250YWluZXInOlxyXG4gICAgICBjYXNlICdsb290Jzoge1xyXG4gICAgICAgIGxzc0l0ZW1zLml0ZW1zLnZhbHVlLmRhdGEuY29udGVudC5wdXNoKHRleHRUZW1wbGF0ZShpdGVtLm5hbWUpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gR2V0IHRyYWl0c1xyXG4gIGNvbnN0IHdlYXBvbnMgPSBhd2FpdCBnZXRXZWFwb25zKHtcclxuICAgIHBhY2s6IGl0ZW1zUGFjayxcclxuICAgIGl0ZW1JZHM6IENPTkZJRy5ETkQ1RS53ZWFwb25JZHMsXHJcbiAgICB3ZWFwb25Qcm9mczogQ09ORklHLkRORDVFLndlYXBvblByb2ZpY2llbmNpZXMsXHJcbiAgfSk7XHJcbiAgY29uc3QgYXJtb3JzID0gYXdhaXQgZ2V0QXJtb3Ioe1xyXG4gICAgcGFjazogaXRlbXNQYWNrLFxyXG4gICAgaXRlbUlkczogQ09ORklHLkRORDVFLmFybW9ySWRzLFxyXG4gICAgYXJtb3JQcm9mczogQ09ORklHLkRORDVFLmFybW9yUHJvZmljaWVuY2llcyxcclxuICB9KTtcclxuICBjb25zdCB0b29scyA9IGF3YWl0IGdldFRvb2xzKHtcclxuICAgIHBhY2s6IGl0ZW1zUGFjayxcclxuICAgIGl0ZW1JZHM6IENPTkZJRy5ETkQ1RS50b29sSWRzLFxyXG4gICAgdG9vbHNQcm9mczogQ09ORklHLkRORDVFLnZlaGljbGVUeXBlcyxcclxuICB9KTtcclxuXHJcbiAgdHJhaXRTdHJpbmdzID0gZ2V0VHJhaXRzKHtcclxuICAgIHRyYWl0cyxcclxuICAgIGxhbmd1YWdlczogY29sbGVjdExhbmd1YWdlcyhDT05GSUcuRE5ENUUubGFuZ3VhZ2VzKSxcclxuICAgIHdlYXBvbnMsXHJcbiAgICBhcm1vcnMsXHJcbiAgICB0b29scyxcclxuICAgIGFjdG9yVG9vbHMsXHJcbiAgfSk7XHJcbiAgbHNzUHJvZi52YWx1ZS5kYXRhLmNvbnRlbnQgPSB0cmFpdFN0cmluZ3MubWFwKCh0cmFpdCkgPT4gdGV4dFRlbXBsYXRlKHRyYWl0KSk7XHJcblxyXG4gIC8vIFNldCBMU1MgZGF0YVxyXG4gIGNvbnN0IGxzc0RhdGEgPSB7XHJcbiAgICBpc0RlZmF1bHQ6IHRydWUsXHJcbiAgICBqc29uVHlwZTogJ2NoYXJhY3RlcicsXHJcbiAgICB0ZW1wbGF0ZTogJ2RlZmF1bHQnLFxyXG4gICAgbmFtZTogeyB2YWx1ZTogYWN0b3JEYXRhLm5hbWUgfSxcclxuICAgIGluZm86IHtcclxuICAgICAgY2hhckNsYXNzOiB7XHJcbiAgICAgICAgbmFtZTogJ2NoYXJDbGFzcycsXHJcbiAgICAgICAgbGFiZWw6ICfQutC70LDRgdGBINC4INGD0YDQvtCy0LXQvdGMJyxcclxuICAgICAgICB2YWx1ZTogY2hhckNsYXNzLmxlbmd0aCA+IDFcclxuICAgICAgICAgID8gY2hhckNsYXNzLm1hcChjbHMgPT4gYCR7Y2xzLnNwbGl0KCcgJylbMF0uc2xpY2UoMCwgNCl9ICgke2Nscy5zcGxpdCgnICgnKVsxXX1gKS5qb2luKCcgLyAnKVxyXG4gICAgICAgICAgOiBjaGFyQ2xhc3NbMF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGxldmVsOiB7IG5hbWU6ICdsZXZlbCcsIGxhYmVsOiAn0YPRgNC+0LLQtdC90YwnLCB2YWx1ZTogZGV0YWlscy5sZXZlbCB9LFxyXG4gICAgICBiYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgbmFtZTogJ2JhY2tncm91bmQnLFxyXG4gICAgICAgIGxhYmVsOiAn0L/RgNC10LTRi9GB0YLQvtGA0LjRjycsXHJcbiAgICAgICAgdmFsdWU6IGRldGFpbHMuYmFja2dyb3VuZD8ubmFtZSB8fCAnJyxcclxuICAgICAgfSxcclxuICAgICAgcGxheWVyTmFtZTogeyBuYW1lOiAncGxheWVyTmFtZScsIGxhYmVsOiAn0LjQvNGPINC40LPRgNC+0LrQsCcsIHZhbHVlOiAnJyB9LFxyXG4gICAgICByYWNlOiB7IG5hbWU6ICdyYWNlJywgbGFiZWw6ICfRgNCw0YHQsCcsIHZhbHVlOiBkZXRhaWxzLnJhY2U/Lm5hbWUgfHwgJycgfSxcclxuICAgICAgYWxpZ25tZW50OiB7XHJcbiAgICAgICAgbmFtZTogJ2FsaWdubWVudCcsXHJcbiAgICAgICAgbGFiZWw6ICfQvNC40YDQvtCy0L7Qt9C30YDQtdC90LjQtScsXHJcbiAgICAgICAgdmFsdWU6IGRldGFpbHMuYWxpZ25tZW50IHx8ICcnLFxyXG4gICAgICB9LFxyXG4gICAgICBleHBlcmllbmNlOiB7XHJcbiAgICAgICAgbmFtZTogJ2V4cGVyaWVuY2UnLFxyXG4gICAgICAgIGxhYmVsOiAn0L7Qv9GL0YInLFxyXG4gICAgICAgIHZhbHVlOiBkZXRhaWxzLnhwLnZhbHVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHN1YkluZm86IHtcclxuICAgICAgYWdlOiB7IG5hbWU6ICdhZ2UnLCBsYWJlbDogJ9Cy0L7Qt9GA0LDRgdGCJywgdmFsdWU6IGRldGFpbHMuYWdlIHx8ICcnIH0sXHJcbiAgICAgIGhlaWdodDogeyBuYW1lOiAnaGVpZ2h0JywgbGFiZWw6ICfRgNC+0YHRgicsIHZhbHVlOiBkZXRhaWxzLmhlaWdodCB8fCAnJyB9LFxyXG4gICAgICB3ZWlnaHQ6IHsgbmFtZTogJ3dlaWdodCcsIGxhYmVsOiAn0LLQtdGBJywgdmFsdWU6IGRldGFpbHMud2VpZ2h0IHx8ICcnIH0sXHJcbiAgICAgIGV5ZXM6IHsgbmFtZTogJ2V5ZXMnLCBsYWJlbDogJ9Cz0LvQsNC30LAnLCB2YWx1ZTogZGV0YWlscy5leWVzIHx8ICcnIH0sXHJcbiAgICAgIHNraW46IHsgbmFtZTogJ3NraW4nLCBsYWJlbDogJ9C60L7QttCwJywgdmFsdWU6IGRldGFpbHMuc2tpbiB8fCAnJyB9LFxyXG4gICAgICBoYWlyOiB7IG5hbWU6ICdoYWlyJywgbGFiZWw6ICfQstC+0LvQvtGB0YsnLCB2YWx1ZTogZGV0YWlscy5oYWlyIHx8ICcnIH0sXHJcbiAgICB9LFxyXG4gICAgc3BlbGxzSW5mbzoge1xyXG4gICAgICBiYXNlOiB7XHJcbiAgICAgICAgbmFtZTogJ2Jhc2UnLFxyXG4gICAgICAgIGxhYmVsOiAn0JHQsNC30L7QstCw0Y8g0YXQsNGA0LDQutGC0LXRgNC40YHRgtC40LrQsCDQt9Cw0LrQu9C40L3QsNC90LjQuScsXHJcbiAgICAgICAgdmFsdWU6IENPTkZJRy5ETkQ1RS5hYmlsaXRpZXNbYXR0cmlidXRlcy5zcGVsbGNhc3RpbmddPy5sYWJlbCB8fCAn0JjQvdGC0LXQu9C70LXQutGCJyxcclxuICAgICAgICBjb2RlOiBhdHRyaWJ1dGVzLnNwZWxsY2FzdGluZyxcclxuICAgICAgfSxcclxuICAgICAgc2F2ZToge1xyXG4gICAgICAgIG5hbWU6ICdzYXZlJyxcclxuICAgICAgICBsYWJlbDogJ9Ch0LvQvtC20L3QvtGB0YLRjCDRgdC/0LDRgdCx0YDQvtGB0LrQsCcsXHJcbiAgICAgICAgdmFsdWU6IGF0dHJpYnV0ZXMuc3BlbGxkYyxcclxuICAgICAgfSxcclxuICAgICAgbW9kOiB7XHJcbiAgICAgICAgbmFtZTogJ21vZCcsXHJcbiAgICAgICAgbGFiZWw6ICfQkdC+0L3Rg9GBINCw0YLQsNC60Lgg0LfQsNC60LvQuNC90LDQvdC40LXQvCcsXHJcbiAgICAgICAgdmFsdWU6IGF0dHJpYnV0ZXMuc3BlbGxtb2QgKyBhdHRyaWJ1dGVzLnByb2YsXHJcbiAgICAgIH0sXHJcbiAgICAgIGF2YWlsYWJsZTogeyBjbGFzc2VzOiBzcGVsbENhc3RpbmcgfSxcclxuICAgIH0sXHJcbiAgICBzcGVsbHM6IHNwZWxsU2xvdHMsXHJcbiAgICBzcGVsbHNQYWN0OiBwYWN0U3BlbGwsXHJcbiAgICBwcm9maWNpZW5jeTogYXR0cmlidXRlcy5wcm9mLFxyXG4gICAgc3RhdHM6IGxzc1N0YXRzLFxyXG4gICAgc2F2ZXM6IGxzc1NhdmVzLFxyXG4gICAgc2tpbGxzOiBsc3NTa2lsbHMsXHJcbiAgICB2aXRhbGl0eToge1xyXG4gICAgICAnaHAtZGljZS1jdXJyZW50JzogeyB2YWx1ZTogYXR0cmlidXRlcy5oZCB9LFxyXG4gICAgICAnaGl0LWRpZSc6IGhpdERpZSxcclxuICAgICAgJ2hwLWRpY2UtbXVsdGknOiBoaXREaWVNdWx0aXBsZSxcclxuICAgICAgYWM6IHsgdmFsdWU6IGF0dHJpYnV0ZXMuYWMudmFsdWUgfSxcclxuICAgICAgc3BlZWQ6IHsgdmFsdWU6IGF0dHJpYnV0ZXMubW92ZW1lbnQud2FsayB9LFxyXG4gICAgICBpbml0aWF0aXZlOiB7IHZhbHVlOiBhdHRyaWJ1dGVzLmluaXQudG90YWwgfSxcclxuICAgICAgJ2hwLW1heCc6IHsgdmFsdWU6IGF0dHJpYnV0ZXMuaHAubWF4IH0sXHJcbiAgICAgICdocC1jdXJyZW50JzogeyB2YWx1ZTogYXR0cmlidXRlcy5ocC52YWx1ZSB9LFxyXG4gICAgICAnaHAtdGVtcCc6IHsgdmFsdWU6IGF0dHJpYnV0ZXMuaHAudGVtcCB9LFxyXG4gICAgICBpc0R5aW5nOiBmYWxzZSxcclxuICAgICAgZGVhdGhGYWlsczogMCxcclxuICAgICAgZGVhdGhTdWNjZXNzZXM6IDAsXHJcbiAgICB9LFxyXG4gICAgdGV4dDoge1xyXG4gICAgICBwcm9mOiBsc3NQcm9mLFxyXG4gICAgICAuLi5sc3NFcXVpcG1lbnQsXHJcbiAgICAgIC4uLmxzc1NwZWxscyxcclxuICAgICAgLi4ubHNzQXR0YWNrcyxcclxuICAgICAgLi4ubHNzVHJhaXRzLFxyXG4gICAgICAuLi5sc3NJdGVtcyxcclxuICAgICAgLi4ubHNzRmVhdHVyZXMsXHJcbiAgICAgIC4uLmNoYXJhY3RlclRyYWl0cyxcclxuICAgIH0sXHJcbiAgICBpc0hpZGRlbjogZmFsc2UsXHJcbiAgICB0cmFpdHM6IHtcclxuICAgICAgdmFsdWU6IHsgaWQ6ICdob3Zlci10b29sYmFyLXRyYWl0cycsIGRhdGE6IHsgdHlwZTogJ2RvYycsIGNvbnRlbnQ6IFtdIH0gfSxcclxuICAgIH0sXHJcbiAgICBiYWNrZ3JvdW5kOiB7XHJcbiAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgaWQ6ICdob3Zlci10b29sYmFyLWJhY2tncm91bmQnLFxyXG4gICAgICAgIGRhdGE6IHsgdHlwZTogJ2RvYycsIGNvbnRlbnQ6IFtdIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2l6ZTogOSxcclxuICAgIGNvaW5zOiB7XHJcbiAgICAgIGNwOiB7IHZhbHVlOiBjdXJyZW5jeS5jcCB9LFxyXG4gICAgICBlcDogeyB2YWx1ZTogY3VycmVuY3kuZXAgfSxcclxuICAgICAgZ3A6IHsgdmFsdWU6IGN1cnJlbmN5LmdwIH0sXHJcbiAgICAgIHBwOiB7IHZhbHVlOiBjdXJyZW5jeS5wcCB9LFxyXG4gICAgICBzcDogeyB2YWx1ZTogY3VycmVuY3kuc3AgfSxcclxuICAgIH0sXHJcbiAgICBjYXN0ZXJDbGFzczogeyB2YWx1ZTogc3BlbGxDYXN0aW5nU3RyaW5nLmpvaW4oJywgJykgfSwgLy8gbm8gZGlyZWN0IG1hcHBpbmcgZm91bmRcclxuICAgIHdlYXBvbnNMaXN0OiBsc3NXZWFwb25zLFxyXG4gICAgcmVzb3VyY2VzOiBsc3NSZXNvdXJjZSxcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdGFnczogW10sXHJcbiAgICBkaXNhYmxlZEJsb2Nrczoge1xyXG4gICAgICAnaW5mby1sZWZ0JzogW10sXHJcbiAgICAgICdpbmZvLXJpZ2h0JzogW10sXHJcbiAgICAgICdub3Rlcy1sZWZ0JzogW10sXHJcbiAgICAgICdub3Rlcy1yaWdodCc6IFtdLFxyXG4gICAgfSxcclxuICAgIHNwZWxsczogeyBtb2RlOiAndGV4dCcsIHByZXBhcmVkOiBbXSwgYm9vazogW10gfSxcclxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGxzc0RhdGEpLFxyXG4gICAganNvblR5cGU6ICdjaGFyYWN0ZXInLFxyXG4gICAgdmVyc2lvbjogJzInLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0Rm91bmRyeVRvTHNzO1xyXG4iLCJleHBvcnQgZGVmYXVsdCAoY291bnQgPSAxKSA9PiB7XG4gIGNvbnN0IGlkcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICBpZHMucHVzaChEYXRlLm5vdygpLnRvU3RyaW5nKCkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKS50b1N0cmluZygpLnBhZFN0YXJ0KDMsICcwJykpO1xuICB9XG4gIHJldHVybiBpZHM7XG59XG4iLCIvKiBnbG9iYWwgQ09ORklHLCBnYW1lICovXG5cblxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoe3BhY2ssIGl0ZW1JZHMsIGFybW9yUHJvZnN9KSA9PiB7XG4gIGxldCBpdGVtc09iamVjdCA9IHt9O1xuXG4gIGZvciAobGV0IGl0ZW1OYW1lIGluIGl0ZW1JZHMpIHtcbiAgICBsZXQgaXRlbUlkID0gaXRlbUlkc1tpdGVtTmFtZV07XG4gICAgbGV0IGl0ZW0gPSBhd2FpdCBwYWNrLmdldERvY3VtZW50KGl0ZW1JZCk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGl0ZW1zT2JqZWN0W2l0ZW1OYW1lXSA9IGl0ZW0ubmFtZTtcbiAgICB9XG4gIH1cblxuXG4gIHJldHVybiB7XG4gICAgLi4uaXRlbXNPYmplY3QsXG4gICAgLi4uYXJtb3JQcm9mcyxcbiAgfTtcbn1cblxuIiwiaW1wb3J0IGdlbmVyYXRlVW5pcXVlSWRzIGZyb20gJy4vZ2VuZXJhdGVVbmlxdWVJZHMnO1xuXG5leHBvcnQgZGVmYXVsdCAoaXRlbSwgbG9jYXRpb24gPSAndHJhaXRzJykgPT4ge1xuICBjb25zdCBpZCA9IGdlbmVyYXRlVW5pcXVlSWRzKCk7XG4gIGNvbnN0IGZvdW5kcnlVc2VzID0gWydkYXduJywgJ2RheScsICdkdXNrJywgJ2xyJ107XG4gIGxldCBpY29uID0gJyc7XG4gIGlmIChpdGVtLnN5c3RlbS51c2VzLnBlciA9PT0gJ3NyJykge1xuICAgIGljb24gPSAnc2hvcnQtcmVzdCc7XG4gIH0gZWxzZSBpZiAoZm91bmRyeVVzZXMuaW5jbHVkZXMoaXRlbS5zeXN0ZW0udXNlcy5wZXIpKSB7XG4gICAgaWNvbiA9ICdsb25nLXJlc3QnO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpZDogYHJlc291cmNlLSR7aWR9YCxcbiAgICBpdGVtOiB7XG4gICAgICAnaWQnOiBgcmVzb3VyY2UtJHtpZH1gLFxuICAgICAgJ25hbWUnOiBpdGVtLm5hbWUsXG4gICAgICAnY3VycmVudCc6IGl0ZW0uc3lzdGVtLnVzZXMubWF4LFxuICAgICAgJ21heCc6IGl0ZW0uc3lzdGVtLnVzZXMubWF4LFxuICAgICAgbG9jYXRpb24sXG4gICAgICAnaXNMb25nUmVzdCc6IGZvdW5kcnlVc2VzLmluY2x1ZGVzKGl0ZW0uc3lzdGVtLnVzZXMucGVyKSxcbiAgICAgICdpc1Nob3J0UmVzdCc6IGl0ZW0uc3lzdGVtLnVzZXMucGVyID09PSAnc3InLFxuICAgICAgaWNvbixcbiAgICB9LFxuICB9O1xufVxuIiwiLyogZ2xvYmFsIENPTkZJRywgZ2FtZSAqL1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoe3BhY2ssIGl0ZW1JZHMsIHRvb2xzUHJvZnN9KSA9PiB7XG4gIGxldCBpdGVtc09iamVjdCA9IHt9O1xuXG4gIGZvciAobGV0IGl0ZW1OYW1lIGluIGl0ZW1JZHMpIHtcbiAgICBsZXQgaXRlbUlkID0gaXRlbUlkc1tpdGVtTmFtZV07XG4gICAgbGV0IGl0ZW0gPSBhd2FpdCBwYWNrLmdldERvY3VtZW50KGl0ZW1JZCk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGl0ZW1zT2JqZWN0W2l0ZW1OYW1lXSA9IGl0ZW0ubmFtZTtcbiAgICB9XG4gIH1cblxuXG4gIHJldHVybiB7XG4gICAgLi4uaXRlbXNPYmplY3QsXG4gICAgLi4udG9vbHNQcm9mcyxcbiAgfTtcbn1cblxuIiwiLyogZ2xvYmFsIENPTkZJRyAqL1xuXG5cbmNvbnN0IHRyYWl0c0NvbmZpZyA9IHtcbiAgXCJzaXplXCI6IHtcInRpdGxlXCI6IFwi0KDQsNC30LzQtdGAXCIsIFwiY29uZmlnS2V5XCI6IFwiYWN0b3JTaXplc1wifSxcbiAgXCJkaVwiOiB7XCJ0aXRsZVwiOiBcItCd0LXQstC+0YHQv9GA0LjQuNC80YfQuNCy0L7RgdGC0Ywg0Log0YPRgNC+0L3Rg1wiLCBcImNvbmZpZ0tleVwiOiBcImRhbWFnZVR5cGVzXCJ9LFxuICBcImRyXCI6IHtcInRpdGxlXCI6IFwi0KPRgdGC0L7QudGH0LjQstC+0YHRgtGMINC6INGD0YDQvtC90YNcIiwgXCJjb25maWdLZXlcIjogXCJkYW1hZ2VUeXBlc1wifSxcbiAgXCJkdlwiOiB7XCJ0aXRsZVwiOiBcItCj0Y/Qt9Cy0LjQvNC+0YHRgtGMINC6INGD0YDQvtC90YNcIiwgXCJjb25maWdLZXlcIjogXCJkYW1hZ2VUeXBlc1wifSxcbiAgLy8gXCJkbVwiOiB7XCJ0aXRsZVwiOiBcItCc0L7QtNC40YTQuNCw0LrRgtC+0YAg0YPRgNC+0L3QsFwiLCBcImNvbmZpZ0tleVwiOiBcImRhbWFnZVR5cGVzXCJ9LFxuICBcImNpXCI6IHtcbiAgICBcInRpdGxlXCI6IFwi0J3QtdCy0L7RgdC/0YDQuNC40LzRh9C40LLQvtGB0YLRjCDQuiDRgdC+0YHRgtC+0Y/QvdC40Y5cIixcbiAgICBcImNvbmZpZ0tleVwiOiBcImNvbmRpdGlvblR5cGVzXCJcbiAgfSxcbiAgXCJsYW5ndWFnZXNcIjoge1widGl0bGVcIjogXCLQr9C30YvQutC4XCIsIFwiY29uZmlnS2V5XCI6IFwibGFuZ3VhZ2VzXCJ9LFxuICBcIndlYXBvblByb2ZcIjoge1widGl0bGVcIjogXCLQo9C80LXQvdC40Y8g0LIg0L7RgNGD0LbQuNC4XCIsIFwiY29uZmlnS2V5XCI6IFwid2VhcG9uVHlwZXNcIn0sXG4gIFwiYXJtb3JQcm9mXCI6IHtcInRpdGxlXCI6IFwi0KPQvNC10L3QuNGPINCyINCx0YDQvtC90LVcIiwgXCJjb25maWdLZXlcIjogXCJhcm1vclR5cGVzXCJ9LFxuICBcInRvb2xQcm9mXCI6IHtcInRpdGxlXCI6IFwi0KPQvNC10L3QuNGPINCyINC40L3RgdGC0YDRg9C80LXQvdGC0LDRhVwiLCBcImNvbmZpZ0tleVwiOiBcInRvb2xJZHNcIn1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKHt0cmFpdHMsIGxhbmd1YWdlcywgd2VhcG9ucywgYXJtb3JzLCB0b29scywgYWN0b3JUb29sc30pID0+IHtcbiAgbGV0IHRyYWl0U3RyaW5ncyA9IFtdXG4gIGZvciAobGV0IFt0cmFpdEtleSwgdHJhaXRWYWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModHJhaXRzKSkge1xuICAgIGxldCB0cmFpdFN0cmluZyA9IHRyYWl0c0NvbmZpZ1t0cmFpdEtleV0/LnRpdGxlIHx8ICcnO1xuICAgIGlmICh0cmFpdFN0cmluZyAhPT0gJycpIHtcbiAgICAgIHRyYWl0U3RyaW5nICs9ICc6ICc7XG5cbiAgICAgIHN3aXRjaCAodHJhaXRLZXkpIHtcbiAgICAgICAgY2FzZSAnc2l6ZSc6IHtcbiAgICAgICAgICB0cmFpdFN0cmluZyArPSBDT05GSUcuRE5ENUVbdHJhaXRzQ29uZmlnW3RyYWl0S2V5XS5jb25maWdLZXldW3RyYWl0VmFsdWVdLmxhYmVsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2RpJzpcbiAgICAgICAgY2FzZSAnZHInOlxuICAgICAgICBjYXNlICdkdic6XG4gICAgICAgIGNhc2UgJ2RtJzpcbiAgICAgICAgY2FzZSAnY2knOiB7XG4gICAgICAgICAgdHJhaXRTdHJpbmcgKz0gQXJyYXkuZnJvbSh0cmFpdFZhbHVlLnZhbHVlKS5tYXAoKGRhbWFnZVR5cGUpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIENPTkZJRy5ETkQ1RVt0cmFpdHNDb25maWdbdHJhaXRLZXldLmNvbmZpZ0tleV1bZGFtYWdlVHlwZV0ubGFiZWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApLmpvaW4oJywgJykgKyBgJHt0cmFpdFZhbHVlLmN1c3RvbSAhPT0gJycgPyBgLCAke3RyYWl0VmFsdWUuY3VzdG9tfWAgOiAnJ31gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xhbmd1YWdlcyc6IHtcbiAgICAgICAgICB0cmFpdFN0cmluZyArPSBBcnJheS5mcm9tKHRyYWl0VmFsdWUudmFsdWUpLm1hcCgobGFuZ3VhZ2UpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlc1tsYW5ndWFnZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKS5qb2luKCcsICcpICsgYCR7dHJhaXRWYWx1ZS5jdXN0b20gIT09ICcnID8gYCwgJHt0cmFpdFZhbHVlLmN1c3RvbX1gIDogJyd9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd3ZWFwb25Qcm9mJzoge1xuICAgICAgICAgIHRyYWl0U3RyaW5nICs9IEFycmF5LmZyb20odHJhaXRWYWx1ZS52YWx1ZSkubWFwKCh3ZWFwb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHdlYXBvbnNbd2VhcG9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApLmpvaW4oJywgJykgKyBgJHt0cmFpdFZhbHVlLmN1c3RvbSAhPT0gJycgPyBgLCAke3RyYWl0VmFsdWUuY3VzdG9tfWAgOiAnJ31gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2FybW9yUHJvZic6IHtcbiAgICAgICAgICB0cmFpdFN0cmluZyArPSBBcnJheS5mcm9tKHRyYWl0VmFsdWUudmFsdWUpLm1hcCgoYXJtb3IpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFybW9yc1thcm1vcl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKS5qb2luKCcsICcpICsgYCR7dHJhaXRWYWx1ZS5jdXN0b20gIT09ICcnID8gYCwgJHt0cmFpdFZhbHVlLmN1c3RvbX1gIDogJyd9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd0b29sUHJvZic6IHtcbiAgICAgICAgICBjb25zdCB0b29sc0FycmF5ID0gW107XG4gICAgICAgICAgZm9yIChsZXQgdG9vbCBpbiBhY3RvclRvb2xzKSB7XG4gICAgICAgICAgICB0b29sc0FycmF5LnB1c2goYCR7dG9vbHNbdG9vbF19ICR7YWN0b3JUb29sc1t0b29sXS52YWx1ZSAhPT0gMSA/IGAoeCR7YWN0b3JUb29sc1t0b29sXS52YWx1ZX0pYCA6ICcnfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cmFpdFN0cmluZyArPSB0b29sc0FycmF5LmpvaW4oJywgJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRyYWl0U3RyaW5ncy5wdXNoKHRyYWl0U3RyaW5nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRyYWl0U3RyaW5nc1xufVxuIiwiaW1wb3J0IGdlbmVyYXRlVW5pcXVlSWRzIGZyb20gJy4vZ2VuZXJhdGVVbmlxdWVJZHMnO1xuXG5jb25zdCBnZXRBYmlsaXR5TW9kID0gKGl0ZW0pID0+IHtcbiAgaWYgKGl0ZW0udHlwZSA9PT0gJ3NwZWxsJykge1xuICAgIHJldHVybiBpdGVtLnBhcmVudD8uc3lzdGVtLmF0dHJpYnV0ZXMuc3BlbGxjYXN0aW5nO1xuICB9XG4gIGNvbnN0IHsgc3RyLCBkZXggfSA9IGl0ZW0ucGFyZW50Py5zeXN0ZW0uYWJpbGl0aWVzID8/IHt9O1xuXG5cbiAgaWYgKGl0ZW0uc3lzdGVtLnByb3BlcnRpZXMuaGFzKCdmaW4nKSAmJiBzdHIgJiYgZGV4KSByZXR1cm4gKGRleC5tb2QgPiBzdHIubW9kKSA/ICdkZXgnIDogJ3N0cic7XG4gIHJldHVybiB7XG4gICAgc2ltcGxlTTogJ3N0cicsXG4gICAgbWFydGlhbE06ICdzdHInLFxuICAgIHNpbXBsZVI6ICdkZXgnLFxuICAgIG1hcnRpYWxSOiAnZGV4JyxcbiAgfVtpdGVtLnN5c3RlbS50eXBlLnZhbHVlXSA/PyBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKGl0ZW0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICAnaWQnOiBgd2VhcG9uLSR7Z2VuZXJhdGVVbmlxdWVJZHMoKVswXX1gLFxuICAgICduYW1lJzoge1xuICAgICAgJ3ZhbHVlJzogaXRlbS5uYW1lLFxuICAgIH0sXG4gICAgJ21vZCc6IHtcbiAgICAgICd2YWx1ZSc6IGArJHtwYXJzZUludChpdGVtLnN5c3RlbS5hdHRhY2suYm9udXMsIDEwKX1gLFxuICAgIH0sXG4gICAgJ2RtZyc6IHtcbiAgICAgICd2YWx1ZSc6IGl0ZW0uZGFtYWdlLFxuICAgIH0sXG4gICAgJ2FiaWxpdHknOiBpdGVtLmFiaWxpdHkgPyBpdGVtLmFiaWxpdHkgOiBnZXRBYmlsaXR5TW9kKGl0ZW0pLFxuICAgICdpc1Byb2YnOiBpdGVtLnN5c3RlbS5wcm9mLm11bHRpcGxpZXIgIT09IDAsXG4gIH07XG59O1xuIiwiLyogZ2xvYmFsIENPTkZJRyAqL1xuY29uc3QgdHJhbnNmb3JtRGFtYWdlQXJyYXkgPSAoZGFtYWdlQXJyYXkpID0+IHtcbiAgbGV0IHJlc3VsdCA9IGRhbWFnZUFycmF5Lm1hcChpdGVtID0+IHtcbiAgICBsZXQgZm9ybXVsYSA9IGl0ZW0uZm9ybXVsYTtcbiAgICBsZXQgZGFtYWdlVHlwZSA9IGl0ZW0uZGFtYWdlVHlwZTtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBmb3JtdWxhIGFscmVhZHkgY29udGFpbnMgYnJhY2tldHNcbiAgICBsZXQgbWF0Y2ggPSBmb3JtdWxhLm1hdGNoKC9cXFsoLio/KVxcXS8pO1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBsZXQgZGFtYWdlVHlwZSA9IG1hdGNoWzFdO1xuICAgICAgZm9ybXVsYSA9IGZvcm11bGEucmVwbGFjZShgWyR7ZGFtYWdlVHlwZX1dYCwgJycpICsgYFske0NPTkZJRy5ETkQ1RS5kYW1hZ2VUeXBlc1tkYW1hZ2VUeXBlXS5sYWJlbH1dYFxuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtdWxhID0gZm9ybXVsYSArIGBbJHtDT05GSUcuRE5ENUUuZGFtYWdlVHlwZXNbZGFtYWdlVHlwZV0ubGFiZWx9XWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm11bGE7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQuam9pbignICsgJyk7XG59XG5cbmNvbnN0IGNhbGN1bGF0ZUJvbnVzID0gKGRhdGEpID0+IHtcbiAgY29uc3Qgcm9sbERhdGEgPSBkYXRhLnJvbGxEYXRhO1xuICBjb25zdCBwYXJ0cyA9IGRhdGEucGFydHM7XG5cbiAgbGV0IHN1bSA9IDA7XG5cbiAgcGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICBpZiAocGFydC5zdGFydHNXaXRoKCdAJykpIHtcbiAgICAgIC8vIFJlbW92ZSAnQCcgYW5kIGdldCB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBmcm9tIHJvbGxEYXRhXG4gICAgICBjb25zdCBrZXkgPSBwYXJ0LnNsaWNlKDEpO1xuICAgICAgY29uc3QgdmFsdWUgPSByb2xsRGF0YVtrZXldO1xuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VtICs9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGl0J3Mgbm90IGEgcmVmZXJlbmNlLCBwYXJzZSBpdCBkaXJlY3RseSBhcyBhbiBpbnRlZ2VyXG4gICAgICBzdW0gKz0gcGFyc2VJbnQocGFydCwgMTApO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN1bTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKHdlYXBvbikgPT4ge1xuICBjb25zdCBib251cyA9IGNhbGN1bGF0ZUJvbnVzKHdlYXBvbi5nZXRBdHRhY2tUb0hpdCgpKTtcbiAgLy8gY29uc3QgZGFtYWdlID0gd2VhcG9uLmdldERlcml2ZWREYW1hZ2VMYWJlbCgpLm1hcCgoe2xhYmVsfSkgPT4gbGFiZWwpLmpvaW4oJywgJyk7XG4gIGNvbnN0IGRhbWFnZSA9IHRyYW5zZm9ybURhbWFnZUFycmF5KHdlYXBvbi5nZXREZXJpdmVkRGFtYWdlTGFiZWwoKSk7XG4gIHJldHVybiB7XG4gICAgYm9udXMsXG4gICAgZGFtYWdlLFxuICAgIGxhYmVsOiBgKNCw0YLQsNC60LAgKyR7Ym9udXN9LCDRg9GA0L7QvSAke2RhbWFnZX0pYCxcbiAgfVxufVxuIiwiLyogZ2xvYmFsIENPTkZJRywgZ2FtZSAqL1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHtwYWNrLCBpdGVtSWRzLCB3ZWFwb25Qcm9mc30pID0+IHtcbiAgbGV0IGl0ZW1zT2JqZWN0ID0ge307XG5cbiAgZm9yIChsZXQgaXRlbU5hbWUgaW4gaXRlbUlkcykge1xuICAgIGxldCBpdGVtSWQgPSBpdGVtSWRzW2l0ZW1OYW1lXTtcbiAgICBsZXQgaXRlbSA9IGF3YWl0IHBhY2suZ2V0RG9jdW1lbnQoaXRlbUlkKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaXRlbXNPYmplY3RbaXRlbU5hbWVdID0gaXRlbS5uYW1lO1xuICAgIH1cbiAgfVxuXG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pdGVtc09iamVjdCxcbiAgICAuLi53ZWFwb25Qcm9mcyxcbiAgfTtcbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgKGh0bWxTdHJpbmcpID0+IHtcbiAgLy8gQ3JlYXRlIGEgbmV3IERPTSBwYXJzZXJcbiAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAvLyBQYXJzZSB0aGUgSFRNTCBzdHJpbmdcbiAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sU3RyaW5nLCAndGV4dC9odG1sJyk7XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHByb2Nlc3MgdGV4dCBub2RlcyB3aXRoIGlubGluZSBzdHlsZXNcbiAgZnVuY3Rpb24gcHJvY2Vzc1RleHROb2Rlcyhub2RlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICBpZiAoY2hpbGQudGV4dENvbnRlbnQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB0ZXh0OiBjaGlsZC50ZXh0Q29udGVudC50cmltKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgbGV0IG1hcmtzID0gW107XG4gICAgICAgIGlmIChjaGlsZC50YWdOYW1lID09PSAnU1RST05HJykge1xuICAgICAgICAgIG1hcmtzLnB1c2goeyB0eXBlOiAnYm9sZCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkLnRhZ05hbWUgPT09ICdFTScpIHtcbiAgICAgICAgICBtYXJrcy5wdXNoKHsgdHlwZTogJ2l0YWxpYycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkLnRhZ05hbWUgPT09ICdTUEFOJyAmJiBjaGlsZC5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9PT0gJ3VuZGVybGluZScpIHtcbiAgICAgICAgICBtYXJrcy5wdXNoKHsgdHlwZTogJ3VuZGVybGluZScgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hcmtzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBtYXJrczogbWFya3MsXG4gICAgICAgICAgICB0ZXh0OiBgJHtjaGlsZC50ZXh0Q29udGVudC50cmltKCl9IGBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBIYW5kbGUgb3RoZXIgaW5saW5lIHN0eWxlcyBpZiBuZWVkZWRcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB0ZXh0OiBgJHtjaGlsZC50ZXh0Q29udGVudC50cmltKCl9IGBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjb252ZXJ0IGEgPHA+IHRhZyB0byB0aGUgc3BlY2lmaWVkIG9iamVjdCBmb3JtYXRcbiAgZnVuY3Rpb24gY29udmVydFBhcmFncmFwaChwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgY29udGVudDogcHJvY2Vzc1RleHROb2RlcyhwKVxuICAgIH07XG4gIH1cblxuICAvLyBFeHRyYWN0IGFsbCBwYXJhZ3JhcGggZWxlbWVudHMgZnJvbSB0aGUgSFRNTFxuICBjb25zdCBwYXJhZ3JhcGhzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ3AnKTtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgcGFyYWdyYXBocy5mb3JFYWNoKHAgPT4ge1xuICAgIGlmIChwLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICByZXN1bHQucHVzaChjb252ZXJ0UGFyYWdyYXBoKHApKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKiBnbG9iYWwgc2F2ZURhdGFUb0ZpbGUgKi9cblxuZnVuY3Rpb24gc2F2ZUpzb25GaWxlKGRhdGEsIGZpbGVOYW1lKSB7XG4gIC8vIENvbnZlcnQgZGF0YSB0byBKU09OIHN0cmluZ1xuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gIHNhdmVEYXRhVG9GaWxlKGpzb25TdHJpbmcsICdhcHBsaWNhdGlvbi9qc29uJywgYCR7ZmlsZU5hbWV9LWxzcy5qc29uYCk7XG4gIC8vIC8vIENyZWF0ZSBhIEJsb2IgZnJvbSB0aGUgSlNPTiBzdHJpbmdcbiAgLy8gY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uU3RyaW5nXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcbiAgLy9cbiAgLy8gLy8gVXNlIHRoZSBzYXZlQXMgZnVuY3Rpb24gZnJvbSBGaWxlU2F2ZXIuanNcbiAgLy8gc2F2ZUFzKGJsb2IsIGZpbGVOYW1lKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2F2ZUpzb25GaWxlO1xuIiwiZXhwb3J0IGRlZmF1bHQgKGlucHV0U3RyaW5nKSA9PiB7XG4gIC8vIFNpbXBsZSBoYXNoIGZ1bmN0aW9uIHRvIGNvbnZlcnQgc3RyaW5nIHRvIGEgbnVtYmVyXG4gIGZ1bmN0aW9uIGhhc2hTdHJpbmcoc3RyKSB7XG4gICAgbGV0IGhhc2ggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICBoYXNoID0gKGhhc2ggPDwgNSkgLSBoYXNoICsgY2hhcjtcbiAgICAgIGhhc2ggJj0gaGFzaDsgLy8gQ29udmVydCB0byAzMi1iaXQgaW50ZWdlclxuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbiAgfVxuXG4gIC8vIENvbnZlcnQgaGFzaCB0byBhIHBvc2l0aXZlIG51bWJlclxuICBmdW5jdGlvbiB0b1Bvc2l0aXZlTnVtYmVyKG51bSkge1xuICAgIHJldHVybiBudW0gPj4+IDA7XG4gIH1cblxuICAvLyBQYWQgdGhlIG51bWJlciB0byBlbnN1cmUgaXQgaGFzIGV4YWN0bHkgMTIgZGlnaXRzXG4gIGZ1bmN0aW9uIHBhZFRvMTJEaWdpdHMobnVtKSB7XG4gICAgcmV0dXJuIFN0cmluZyhudW0pLnBhZFN0YXJ0KDEyLCAnMCcpLnNsaWNlKC0xMik7XG4gIH1cblxuICBjb25zdCBoYXNoID0gaGFzaFN0cmluZyhpbnB1dFN0cmluZyk7XG4gIGNvbnN0IHBvc2l0aXZlSGFzaCA9IHRvUG9zaXRpdmVOdW1iZXIoaGFzaCk7XG4gIGNvbnN0IHVuaXF1ZUlkID0gcGFkVG8xMkRpZ2l0cyhwb3NpdGl2ZUhhc2gpO1xuXG4gIHJldHVybiB1bmlxdWVJZDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZ2xvYmFsIGdhbWUsIHVpICAqL1xyXG5pbXBvcnQgY29udmVydEZvdW5kcnlUb0xzcyBmcm9tICcuL21vZHVsZS9jb252ZXJ0JztcclxuaW1wb3J0IHNhdmVKc29uRmlsZSBmcm9tICcuL21vZHVsZS9zYXZlVG9GaWxlJztcclxuXHJcbmltcG9ydCB1aWRGcm9tU3RyaW5nIGZyb20gJy4vbW9kdWxlL3VpZEZyb21TdHJpbmcnO1xyXG5pbXBvcnQgZ2VuZXJhdGVVbmlxdWVJZHMgZnJvbSAnLi9tb2R1bGUvZ2VuZXJhdGVVbmlxdWVJZHMnO1xyXG5pbXBvcnQgeyBtb2R1bGVOYW1lIH0gZnJvbSAnLi9fbW9kdWxlJztcclxuXHJcbi8qXHJcbmZ1bmN0aW9uIGNyZWF0ZUFjdG9ySGVhZGVyQnV0dG9uKGNvbmZpZywgYnV0dG9ucykge1xyXG4gIGNvbnN0IGJ1dHRvbkxhYmVsID0gZ2FtZS5pMThuLmxvY2FsaXplKCdFTFNTLkNPTlZFUlQnKTtcclxuICBpZiAoY29uZmlnLm9iamVjdCBpbnN0YW5jZW9mIEFjdG9yKSB7XHJcbiAgICBidXR0b25zLnVuc2hpZnQoe1xyXG4gICAgICBsYWJlbDogYnV0dG9uTGFiZWwsXHJcbiAgICAgIGNsYXNzOiAnZWxzcy1hY3RvcicsXHJcbiAgICAgIGljb246ICdmYS1zb2xpZCBmYS1sYW5ndWFnZScsXHJcbiAgICAgIG9uY2xpY2s6IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmNsZWFyKCk7XHJcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IGF3YWl0IGNvbnZlcnRGb3VuZHJ5VG9Mc3MoY29uZmlnLm9iamVjdCk7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZygnanNvblN0cmluZycsIGpzb25TdHJpbmcpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiovXHJcblxyXG5cclxuSG9va3Mub25jZSgncmVhZHknLCBhc3luYyBmdW5jdGlvbigpIHtcclxuICAvLyBIb29rcy5vbignZ2V0QWN0b3JTaGVldDVlSGVhZGVyQnV0dG9ucycsIGNyZWF0ZUFjdG9ySGVhZGVyQnV0dG9uKTtcclxuICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKG1vZHVsZU5hbWUsICdpbnRlcmFjdGl2ZS1ibG9ja3MnLCB7XHJcbiAgICAnbmFtZSc6ICfQmNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LjQvdGC0LXRgNCw0LrRgtC40LLQvdGL0LUg0LHQu9C+0LrQuCcsXHJcbiAgICAnaGludCc6ICfQn9GA0Lgg0Y3QutGB0L/QvtGA0YLQtSDQsNGC0LDQutC4INC4INGB0L/QvtGB0L7QsdC90L7RgdGC0LgsINC60L7RgtC+0YDRi9C1INC80L7QttC90L4g0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMLCDQsdGD0LTRg9GCINC+0YTQvtGA0LzQu9C10L3RiyDQuNC90YLQtdGA0LDQutGC0LjQstC90YvQvNC4INCx0LvQvtC60LDQvNC4LCDQsCDQvdC1INC/0YDQvtGB0YLQviDRgtC10LrRgdGC0L7QvCcsXHJcbiAgICAnc2NvcGUnOiAnd29ybGQnLFxyXG4gICAgJ2NvbmZpZyc6IHRydWUsXHJcbiAgICAndHlwZSc6IEJvb2xlYW4sXHJcbiAgICAnZGVmYXVsdCc6IHRydWUsXHJcbiAgfSk7XHJcblxyXG59KTtcclxuXHJcbkhvb2tzLm9uKCdnZXRBY3RvckRpcmVjdG9yeUVudHJ5Q29udGV4dCcsIChfLCBvcHRpb25zKSA9PiB7XHJcbiAgb3B0aW9ucy5wdXNoKHtcclxuICAgIG5hbWU6ICdFTFNTLkNPTlZFUlQnLFxyXG4gICAgaWNvbjogJzxpIGNsYXNzPVwiZmFzIGZhLXByaW50XCI+PC9pPicsXHJcbiAgICBjYWxsYmFjazogYXN5bmMgKFtlbnRyeV0pID0+IHtcclxuICAgICAgY29uc3QgYWN0b3JJZCA9IGVudHJ5LmRhdGFzZXQuZG9jdW1lbnRJZDtcclxuICAgICAgY29uc3QgYWN0b3IgPSBnYW1lLmFjdG9ycz8uZ2V0KGFjdG9ySWQpO1xyXG5cclxuICAgICAgaWYgKGFjdG9yKSB7XHJcbiAgICAgICAgaWYgKHVpLm5vdGlmaWNhdGlvbnMpIHtcclxuICAgICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuaW5mbyhnYW1lLmkxOG4ubG9jYWxpemUoJ0VMU1MuQ09OVkVSVF9TVEFSVCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IGF3YWl0IGNvbnZlcnRGb3VuZHJ5VG9Mc3MoYWN0b3IpO1xyXG4gICAgICAgIHNhdmVKc29uRmlsZShqc29uU3RyaW5nLCBhY3Rvcj8ubmFtZSk7XHJcbiAgICAgICAgaWYgKHVpLm5vdGlmaWNhdGlvbnMpIHtcclxuICAgICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuaW5mbyhnYW1lLmkxOG4ubG9jYWxpemUoJ0VMU1MuQ09OVkVSVF9FTkQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29uZGl0aW9uOiAobGkpID0+IHtcclxuICAgICAgY29uc3QgYWN0b3JJZCA9IGxpLmRhdGEoJ2RvY3VtZW50SWQnKTtcclxuICAgICAgY29uc3QgYWN0b3IgPSBnYW1lLmFjdG9ycz8uZ2V0KGFjdG9ySWQpO1xyXG4gICAgICAvLyBTaG93IHRoZSBvcHRpb24gb25seSBpZiB0aGUgYWN0b3IgaXMgYSBwbGF5ZXIgY2hhcmFjdGVyIChQQylcclxuICAgICAgcmV0dXJuIGFjdG9yICYmIGFjdG9yLmRhdGEudHlwZSA9PT0gJ2NoYXJhY3Rlcic7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59KTtcclxuXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuXHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIHdpbmRvdy5ydW5UbXBUZXN0ID0gKHJ1bnMgPSAxMCkgPT4ge1xyXG4gICAgLy8gRXhhbXBsZSB1c2FnZSBhbmQgcGVyZm9ybWFuY2UgbWVhc3VyZW1lbnQgdXNpbmcgUGVyZm9ybWFuY2UgQVBJXHJcbiAgICBjb25zdCBpbnB1dFN0cmluZyA9ICdleGFtcGxlU3RyaW5nJztcclxuXHJcbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdzdGFydFUnKTtcclxuICAgIGNvbnN0IHVuaXF1ZUlkczogc3RyaW5nW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVuczsgaSsrKSB7XHJcbiAgICAgIHVuaXF1ZUlkcy5wdXNoKHVpZEZyb21TdHJpbmcoYCR7aW5wdXRTdHJpbmd9LSR7aX1gKSk7XHJcbiAgICB9XHJcbiAgICAvLyBjb25zdCB1bmlxdWVJZCA9IHVpZEZyb21TdHJpbmcoaW5wdXRTdHJpbmcpO1xyXG4gICAgcGVyZm9ybWFuY2UubWFyaygnZW5kVScpO1xyXG4gICAgcGVyZm9ybWFuY2UubWVhc3VyZSgndWlkRnJvbVN0cmluZycsICdzdGFydFUnLCAnZW5kVScpO1xyXG5cclxuXHJcbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdzdGFydFInKTtcclxuICAgIGNvbnN0IHJhbmRvbUlkczogc3RyaW5nW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVuczsgaSsrKSB7XHJcbiAgICAgIHJhbmRvbUlkcy5wdXNoKGdlbmVyYXRlVW5pcXVlSWRzKClbMF0pO1xyXG4gICAgfVxyXG4gICAgLy8gY29uc3QgcmFuZG9tSWQgPSBnZW5lcmF0ZVVuaXF1ZUlkcygpO1xyXG4gICAgcGVyZm9ybWFuY2UubWFyaygnZW5kUicpO1xyXG4gICAgcGVyZm9ybWFuY2UubWVhc3VyZSgnZ2VuZXJhdGVVbmlxdWVJZHMnLCAnc3RhcnRSJywgJ2VuZFInKTtcclxuXHJcbiAgICBjb25zdCBtZWFzdXJlID0gcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5TmFtZSgndWlkRnJvbVN0cmluZycpWzBdO1xyXG4gICAgY29uc29sZS5kZWJ1ZyhgVW5pcXVlIElEYCwgdW5pcXVlSWRzKTsgLy8gT3V0cHV0cyBhIDEyLWRpZ2l0IHVuaXF1ZSBJRFxyXG4gICAgY29uc29sZS5kZWJ1ZyhgVGltZSB0YWtlbiBmb3IgVW5pcXVlIGlkOiAke21lYXN1cmUuZHVyYXRpb259IG1zYCk7IC8vIE91dHB1dHMgdGhlIHRpbWUgdGFrZW4gaW4gbWlsbGlzZWNvbmRzXHJcblxyXG4gICAgY29uc3QgbWVhc3VyZVIgPSBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKCdnZW5lcmF0ZVVuaXF1ZUlkcycpWzBdO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnUmFuZG9tIElEJywgcmFuZG9tSWRzKTtcclxuICAgIGNvbnNvbGUuZGVidWcoYFRpbWUgdGFrZW4gZm9yIHJhbmRvbSBpZDogJHttZWFzdXJlUi5kdXJhdGlvbn0gbXNgKTsgLy8gT3V0cHV0cyB0aGUgdGltZSB0YWtlbiBpbiBtaWxsaXNlY29uZHNcclxuXHJcblxyXG4vLyBDbGVhciB0aGUgbWFya3MgYW5kIG1lYXN1cmVzIHRvIGF2b2lkIG1lbW9yeSBsZWFrc1xyXG4gICAgcGVyZm9ybWFuY2UuY2xlYXJNYXJrcygpO1xyXG4gICAgcGVyZm9ybWFuY2UuY2xlYXJNZWFzdXJlcygpO1xyXG4gIH07XHJcbiAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XHJcbiAgICBpZiAobW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gJ2FwcGx5Jykge1xyXG4gICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIGluIF90ZW1wbGF0ZUNhY2hlKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfdGVtcGxhdGVDYWNoZSwgdGVtcGxhdGUpKSB7XHJcbiAgICAgICAgICBkZWxldGUgX3RlbXBsYXRlQ2FjaGVbdGVtcGxhdGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=