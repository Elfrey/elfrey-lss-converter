/* global game */
import convertFoundryToLss from './module/convert';
import saveJsonFile from './module/saveToFile';

import uidFromString from './module/uidFromString';
import generateUniqueIds from './module/generateUniqueIds';
import { moduleName } from './_module';

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


Hooks.once('ready', async function() {
  Hooks.on('getActorSheet5eHeaderButtons', createActorHeaderButton);
  game.settings.register(moduleName, 'interactive-blocks', {
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
      const actorId = entry.dataset.documentId;
      const actor = game.actors?.get(actorId);
      if (actor) {
        const jsonString = await convertFoundryToLss(actor);
        saveJsonFile(jsonString, actor?.name);
      }
    },
    condition: (li) => {
      const actorId = li.data('documentId');
      const actor = game.actors?.get(actorId);
      // Show the option only if the actor is a player character (PC)
      return actor && actor.data.type === 'character';
    },
  });
});


// --------------------------------
if (process.env.NODE_ENV === 'development') {

  // @ts-ignore
  window.runTmpTest = (runs = 10) => {
    // Example usage and performance measurement using Performance API
    const inputString = 'exampleString';

    performance.mark('startU');
    const uniqueIds: string[] = [];
    for (let i = 0; i < runs; i++) {
      uniqueIds.push(uidFromString(`${inputString}-${i}`));
    }
    // const uniqueId = uidFromString(inputString);
    performance.mark('endU');
    performance.measure('uidFromString', 'startU', 'endU');


    performance.mark('startR');
    const randomIds: string[] = [];
    for (let i = 0; i < runs; i++) {
      randomIds.push(generateUniqueIds()[0]);
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
