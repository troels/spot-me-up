const createButton = (scene, text) => {
  return scene.rexUI.add.label({
    width: 40,
    height: 40,
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x7b5e57),
    text: scene.add.text(0, 0, text, {
      fontSize: 18,
    }),
    space: {
      left: 10,
      right: 10,
      top: 20,
      bottom: 20,
    },

    align: "center",
  });
};

export default createButton;
