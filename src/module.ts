/* global game */
import convertFoundryToLss from './module/convert';
import saveJsonFile from './module/saveToFile';

Hooks.on('getActorDirectoryEntryContext',  (_, options) => {
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
    }
  });
});

// --------------------------------
if (process.env.NODE_ENV === 'development') {
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
