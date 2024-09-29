class DOM_ELEMENTS_CONTROLLER {
  constructor(elements, connections) {
    this.elements = elements;
    this.connections = connections;
    this.dragging_mode = false;
    this.editing_mode = false;
    this.initDrag();
    this.create();
  }
  createElement(el) {
    let tempDiv = document.createElement("div");

    tempDiv.innerHTML = el.html;
    let newElement = tempDiv;
    newElement.style.position = "absolute";
    newElement.style.left = el.position.x + "px";
    newElement.style.top = el.position.y + "px";
    newElement.classList.add("element");
    newElement.id = `element_${el.id}`;
    _DOM_ELEMENTS.appendChild(newElement);
    el.width = newElement.offsetWidth;
    el.height = newElement.offsetHeight;
  }
  create() {
    this.elements.forEach((el) => {
      this.createElement(el);
    });

    this.connections.forEach((con) => {
      let from = this.elements.find((el) => el.id === con.from);
      let to = this.elements.find((el) => el.id === con.to);
      this.drawConnection(from, to, con.params);
    });
  }
  update() {
    this.elements.forEach((el) => {
      this.elements = this.elements.map((el) => {
        let element = searchElementsById(el.id);
        el.position.x = Number(element.style.left.replace("px", ""));
        el.position.y = Number(element.style.top.replace("px", ""));
        return el;
      });
    });
    this.drawDeleteButtons();
    this.drawLineButtons();
    const lines = document.querySelectorAll(".line");
    lines.forEach((line) => line.remove());
    this.connections.forEach((con) => {
      let from = this.elements.find((el) => el.id === con.from);
      let to = this.elements.find((el) => el.id === con.to);
      this.drawConnection(from, to, con.params);
    });
  }
  drawConnection(from, to, params) {
    const x1 = from.position.x + from.width / 2;
    const y1 = from.position.y + from.height / 2;
    const x2 = to.position.x + to.width / 2;
    const y2 = to.position.y + to.height / 2;
    const gap = 50;
    let adjustedX1, adjustedY1, adjustedX2, adjustedY2;

    if (params.conectionSide) {
      // SOON
      return;
    }

    if (Math.abs(y2 - y1) > Math.abs(x2 - x1)) {
      if (y2 > y1) {
        adjustedY1 = from.position.y + from.height;
        adjustedY2 = to.position.y + to.height / 2;
        if (x2 > x1) adjustedX2 = to.position.x;
        else adjustedX2 = to.position.x + to.width;
      } else {
        adjustedY1 = from.position.y;
        adjustedY2 = to.position.y + to.height / 2;
        if (x2 > x1) adjustedX2 = to.position.x;
        else adjustedX2 = to.position.x + to.width;
      }
      adjustedX1 = x1;
    } else {
      if (x2 > x1) {
        adjustedX1 = from.position.x + from.width;
        adjustedX2 = to.position.x + to.width / 2;
        if (y2 > y1) adjustedY2 = to.position.y;
        else adjustedY2 = to.position.y + to.height;
      } else {
        adjustedX1 = from.position.x;
        adjustedX2 = to.position.x + to.width / 2;
        if (y2 > y1) adjustedY2 = to.position.y;
        else adjustedY2 = to.position.y + to.height;
      }
      adjustedY1 = y1;
    }
    let midX, midY;
    if (params.brokenLine) {
      if (Math.abs(y2 - y1) > Math.abs(x2 - x1)) {
        midX = adjustedX1;
        this.drawLine(adjustedX1, adjustedY1, adjustedX1, adjustedY2);
        if (adjustedY2 > adjustedY1) {
          this.drawLine(adjustedX1, adjustedY2, adjustedX2, adjustedY2);
        } else {
          this.drawLine(adjustedX1, adjustedY2, adjustedX2, adjustedY2);
        }
      } else {
        midY = adjustedY1;
        this.drawLine(adjustedX1, adjustedY1, adjustedX2, adjustedY1);
        if (adjustedX2 > adjustedX1) {
          this.drawLine(adjustedX2, adjustedY1, adjustedX2, adjustedY2);
        } else {
          this.drawLine(adjustedX2, adjustedY1, adjustedX2, adjustedY2);
        }
      }
    } else {
      this.drawLine(adjustedX1, adjustedY1, adjustedX2, adjustedY2, params);
    }
  }
  drawLine(x1, y1, x2, y2, params = {}) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const line = document.createElement("div");
    line.classList.add("line");
    if (params.arrow) line.classList.add("line_arrow");
    _DOM_ELEMENTS.appendChild(line);
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
  }
  drawDeleteButtons() {
    _DOM_ELEMENTS.querySelectorAll(".delete_button").forEach((element) => {
      element.remove();
    });
    if (!this.editing_mode) return;
    this.elements.forEach((el) => {
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "✖"; 
      deleteButton.className = "delete_button"; 
      deleteButton.style.position = "absolute"; 
      deleteButton.style.left = `${el.position.x + el.width - 2}px`; 
      deleteButton.style.top = `${el.position.y - 8}px`;
      _DOM_ELEMENTS.appendChild(deleteButton);
      deleteButton.addEventListener("click", () => {
        this.deleteElement(el.id);
      });
    });
  }
  drawLineButtons(){
    _DOM_ELEMENTS.querySelectorAll(".create_line_button").forEach((element) => {
      element.remove();
    });
    if (!this.editing_mode) return;
    this.elements.forEach((el) => {
      const createLineButton = document.createElement("button");
      createLineButton.innerHTML = "Л"; 
      createLineButton.className = "create_line_button"; 
      createLineButton.style.left = `${el.position.x + el.width - 2}px`; 
      createLineButton.style.top = `${el.position.y  + el.height - 8}px`;
      _DOM_ELEMENTS.appendChild(createLineButton);
      createLineButton.addEventListener("click", () => {
        console.log("add line")
      });
    });
  }
  initDrag() {
    let offsetX, offsetY;
    let activeTarget;
    const onMouseDown = (event) => {
      activeTarget = event.target.closest(".element");
      if (!activeTarget) return;

      offsetX =
        event.clientX - Number(activeTarget.style.left.replace("px", ""));
      offsetY =
        event.clientY - Number(activeTarget.style.top.replace("px", ""));
      this.dragging_mode = true;
      activeTarget.style.cursor = "grabbing";
    };

    const onMouseMove = (event) => {
      if (!this.dragging_mode || !activeTarget) return;
      const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;
      activeTarget.style.left = `${newX}px`;
      activeTarget.style.top = `${newY}px`;
      this.update();
    };

    const onMouseUp = (event) => {
      this.dragging_mode = false;
      if (activeTarget) activeTarget.style.cursor = "grab";
    };

    _ACTIVE_SCREEN.addEventListener("mousedown", onMouseDown);
    _ACTIVE_SCREEN.addEventListener("mousemove", onMouseMove);
    _ACTIVE_SCREEN.addEventListener("mouseup", onMouseUp);
    _ACTIVE_SCREEN.addEventListener("mouseleave", onMouseUp);
  }
  pushElement(objElement) {
    const now = new Date();
    objElement.id = now.getTime();
    this.elements.push(objElement);
    this.createElement(objElement);
  }
  deleteElement(id) {
    console.log(this.elements);
    this.elements = this.elements.filter((el) => el.id !== id);
    searchElementsById(id).remove();
    this.connections = this.connections.filter(
      (connection) => connection.from !== id && connection.to !== id
    );
    this.update();
    console.log(this.elements);
  }
  changeEditingMode(bool) {
    this.editing_mode = bool;
    this.drawDeleteButtons();
    this.drawLineButtons();
  }
}
