const DOM_ELEMENTS = [
  {
    id: 1,
    html: `11111`,
    position: { x: 100, y: 100 },
    params: { draggable: true },
  },

  {
    id: 2,
    html: `2222`,
    position: { x: 300, y: 200 },
    params: { draggable: true },
  },

  {
    id: 3,
    html: `3333`,
    position: { x: 350, y: 200 },
    params: { draggable: true },
  },

  {
    id: 4,
    html: `<select id="mySelect">
    <option value="option1">Опция 1</option>
    <option value="option2">Опция 2</option>
    <option value="option3">Опция 3</option>
    <option value="option4">Опция 4</option>
</select>`,
    position: { x: 400, y: 200 },
    params: { draggable: true },
  },
];
// 1 - up
// 2 - right
// 3 - bottom
// 4 - left
// conectionSide:{from:1,to:3}
const DOM_CONNECTION = [
  { from: 1, to: 2, params: { arrow: true, brokenLine: true, } },
  { from: 2, to: 3, params: { arrow: true, brokenLine: true } },
  { from: 3, to: 4, params: { arrow: true, brokenLine: true } },
];
