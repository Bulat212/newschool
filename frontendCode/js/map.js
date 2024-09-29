const _DOM_ELEMENTS = document.getElementById("domelements");
const _ACTIVE_SCREEN = document.getElementById("draggablescreen");


let MAP_SETTINGS = {};
let DOM_CONTROLLER = new DOM_ELEMENTS_CONTROLLER(DOM_ELEMENTS, DOM_CONNECTION);
let map_controller = new MAP_CONTROLLER(MAP_SETTINGS, DOM_CONTROLLER);

