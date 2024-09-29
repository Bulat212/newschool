class MAP_CONTROLLER {
  constructor(map_settings, dom_elements_controller) {
    this.settings = map_settings;
    this.dom_controller = dom_elements_controller;
    this.editing_mode = false;
    this.create_mode = false;
    this.initMoving();
    this.initToolsPanel();
  }
  initMoving() {
    this.transformX = this.settings.transformX || 0;
    this.transformY = this.settings.transformY || 0;
    this.moving_mode = false;

    this.mouse = { x: 0, y: 0 };
    this.scale = 1;
    const scaleFactor = 0.1;
    let scale = 1;
    let startPos = { x: 0, y: 0 };
    const offset = {
      x: 0,
      y: 0,
    };
    _ACTIVE_SCREEN.addEventListener("mousedown", (event) => {
      if (event.button === 1 || event.button === 2) {
        this.moving_mode = true;
        startPos = { x: event.clientX, y: event.clientY };
      }
      if (event.button === 0) {
        if (!this.create_mode || this.dom_controller.dragging_mode) return;
        event.preventDefault();
        console.log(event.clientX, offset.x, event.clientY, offset.y, scale);
        let objElement = {
          html: document.getElementById("createBlockTextArea").value,
          position: {
            x: event.clientX - offset.x,
            y: event.clientY - offset.y,
          },
          params: { draggable: true },
        };
        console.log(this.dom_controller);
        this.dom_controller.pushElement(objElement);
      }
    });

    _ACTIVE_SCREEN.addEventListener("mousemove", (event) => {
      if (this.moving_mode) {
        const deltaX = event.clientX - startPos.x;
        const deltaY = event.clientY - startPos.y;

        offset.x += deltaX;
        offset.y += deltaY;

        _DOM_ELEMENTS.style.translate = `${offset.x}px ${offset.y}px`;

        startPos = { x: event.clientX, y: event.clientY };
      }
    });

    _ACTIVE_SCREEN.addEventListener("mouseup", () => {
      if (this.moving_mode) {
        this.moving_mode = false;
      }
    });
    _ACTIVE_SCREEN.addEventListener("wheel", (event) => {
      _DOM_ELEMENTS.style.transition = ".3s";
      const delta = Math.sign(-event.deltaY);

      const scaleOld = scale;
      scale *= Math.exp(delta * scaleFactor);

      const vptRect = _ACTIVE_SCREEN.getBoundingClientRect();
      const cvsW = _DOM_ELEMENTS.offsetWidth * scaleOld;
      const cvsH = _DOM_ELEMENTS.offsetHeight * scaleOld;
      const cvsX = (_ACTIVE_SCREEN.offsetWidth - cvsW) / 2 + offset.x;
      const cvsY = (_ACTIVE_SCREEN.offsetHeight - cvsH) / 2 + offset.y;
      const originX = event.x - vptRect.x - cvsX - cvsW / 2;
      const originY = event.y - vptRect.y - cvsY - cvsH / 2;

      const xOrg = originX / scaleOld;
      const yOrg = originY / scaleOld;

      const xNew = xOrg * scale;
      const yNew = yOrg * scale;

      const xDiff = originX - xNew;
      const yDiff = originY - yNew;

      offset.x += xDiff;
      offset.y += yDiff;

      _DOM_ELEMENTS.style.scale = scale;
      _DOM_ELEMENTS.style.translate = `${offset.x}px ${offset.y}px`;
      setTimeout(() => {
        _DOM_ELEMENTS.style.transition = "0s";
      }, 300);
    });

    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
  initToolsPanel() {
    document.getElementById("editButton").addEventListener("click", () => {
      if (this.editing_mode) {
        document.getElementById("toolspanel").classList.remove("active");
        this.changeEditingMode(false);
        this.create_mode = false;
        checkbox.checked = false;
      } else {
        document.getElementById("toolspanel").classList.add("active");
        this.changeEditingMode(true);
      }
    });
    document.getElementById("toggleCreateBlock").addEventListener("click", () => {
      if (!this.editing_mode) return;
      if (this.create_mode) this.create_mode = false;
      else this.create_mode = true;
    });
  }
  changeEditingMode(bool) {
    this.editing_mode = bool;
    this.dom_controller.changeEditingMode(bool);
  }
}
