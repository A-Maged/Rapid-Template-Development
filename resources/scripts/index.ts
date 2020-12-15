import modal from './modules/modal';

const registeredModules: any = { modal };
const moduleAttr = 'data-js';
const moduleInitialized = 'data-initialized';

document.querySelectorAll(`:scope [${moduleAttr}]`).forEach((element) => {
  initializeModules(element);
});

function initializeModules(elem: any) {
  const module = elem.getAttribute(moduleAttr);

  if (module === undefined) {
    throw `Module not defined (use ${moduleAttr}="")`;
  } else if (module in registeredModules) {
    if (elem.getAttribute(moduleInitialized) === 'true') return;

    new registeredModules[module](elem);

    elem.setAttribute(moduleInitialized, true);
  } else {
    throw `Module ${module} not found`;
  }
}
