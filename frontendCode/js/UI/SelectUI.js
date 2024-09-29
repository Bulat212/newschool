class SelectUI {
  constructor(selector) {
    this.selector = selector;
    this.selects = document.querySelectorAll("." + selector);
    this.callbacks = [];
    if (this.selects) {
      this.init();
      this.bindOutsideClick();
    }
  }
  init() {
    this.selects.forEach((select) => {
      select.addEventListener("click", (event) =>
        this.handleSelectClick(event)
      );
    });
  }
  handleSelectClick(event) {
    const currentTarget = event.currentTarget;
    console.log(this.selector + "--active");
    if (currentTarget.classList.contains(`${this.selector}--active`))
      currentTarget.classList.remove(`${this.selector}--active`);
    else currentTarget.classList.add(`${this.selector}--active`);

    if (event.target.classList.contains("option-info")) return;
    if (event.target.dataset.value === undefined) return;
    const selectedValue = event.target.dataset.value;
    const selectedText = event.target.innerText;

    currentTarget.querySelector(".selected").innerText = selectedText;

    this.notify(selectedValue, selectedText);
  }

  notify(value, text) {
    this.callbacks.forEach((callback) => callback(value, text));
  }

  subscribe(callback) {
    this.callbacks.push(callback);
  }

  bindOutsideClick() {
    document.addEventListener("click", (event) => {
      const isClickInside = Array.from(this.selects).some((select) =>
        select.contains(event.target)
      );
      if (!isClickInside) {
        this.selects.forEach((select) => {
          select.classList.remove(`${this.selector}--active`); // Закрываем все селекторы
        });
      }
    });
  }
}
// ПОДКЛЮЧЕНИЕ SELECT
const selectUI = new SelectUI("select-ui");
