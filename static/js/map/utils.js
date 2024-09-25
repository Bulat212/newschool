
function searchElementsById(id) {
    return document.getElementById(`element_${id}`);
  }
  
  function getTranslateWithoutEffects(dom_element) {
    const style = window.getComputedStyle(dom_element);
    const transform = style.transform;
    let translate = { x: 0, y: 0 };
    if (transform && transform !== "none") {
      const values = transform.match(/[-+]?\d*\.?\d+/g);
      if (values) {
        translate.x = parseFloat(values[4]);
        translate.y = parseFloat(values[5]);
      }
    }
    return translate;
  }
  
  