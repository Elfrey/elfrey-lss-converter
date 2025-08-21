/* global game, ui  */
import convertFoundryToLss from './module/convert';
import saveJsonFile from './module/saveToFile';

import { moduleName } from './_module';

Hooks.once('ready', async function() {
  game.settings.register(moduleName, 'interactive-blocks', {
    'name': 'Использовать интерактивные блоки',
    'hint': 'При экспорте атаки и способности, которые можно использовать, будут оформлены интерактивными блоками, а не просто текстом',
    'scope': 'world',
    'config': true,
    'type': Boolean,
    'default': true,
  });
});


Hooks.on('getActorContextOptions', (_html, options) => {
  options.push({
    name: 'ELSS.CONVERT',
    icon: '<i class="fa-solid fa-print"></i>',
    callback: async (el) => {
      const actorId = el?.dataset?.documentId || el?.dataset?.entryId;
      const actor = game.actors?.get(actorId ?? '');

      if (actor) {
        ui.notifications?.info(game.i18n.localize('ELSS.CONVERT_START'));
        const jsonString = await convertFoundryToLss(actor);
        saveJsonFile(jsonString, actor?.name);
        ui.notifications?.info(game.i18n.localize('ELSS.CONVERT_END'));
      }
    },
    condition: (li) => {
      const el = (li instanceof HTMLElement) ? li : (li && li[0]);
      const actorId = el?.dataset?.documentId || el?.dataset?.entryId;
      const actor = game.actors?.get(actorId ?? '');
      // Show only for PCs
      // @ts-ignore
      return !!actor && actor.type === 'character';
    },
  });
});

// --------------------------------
if (process.env.NODE_ENV === 'development') {
  const createActorHeaderButton = (config, buttons) => {
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
  };

  Hooks.on('ready', () => {
    // Core-agnostic header buttons hook (preferred in v10+)
    Hooks.on('getActorSheetHeaderButtons', createActorHeaderButton);

    // Keep system-specific hook for broader compatibility if present
    Hooks.on?.('getActorSheet5eHeaderButtons', createActorHeaderButton);
  });
}

// eslint-disable-next-line no-constant-condition
if (process.env.NODE_ENV === 'development' && 0) {
  // @ts-ignore
  if (module.hot) {
    module.hot.accept();
    if (module.hot.status() === 'apply') {
      for (const template in _templateCache) {
        if (Object.prototype.hasOwnProperty.call(_templateCache, template)) {
          delete _templateCache[template];
        }
      }
    }
  }
}
