import Phaser from "phaser";
import { store } from "../../system/store";
import createButton from "../components/ui/createButton";

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super("settings");
  }

  preload() {
    this.load.setBaseURL("http://labs.phaser.io");
    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  create() {
  
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const title = this.add
      .text(centerX, 50, "Game Settings", {
        fontSize: "50px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    backButton(this, 60, 50);
    addSlider(
      this,
      50,
      200,
      "Master Volume",
      store.getState().settings.masterVolume,
      (value: number) => {
        store.dispatch({
          type: "settings/setMasterVolume",
          payload: value,
        });
      }
    );
    addSlider(
      this,
      50,
      300,
      "Music Volume",
      store.getState().settings.musicVolume,
      (value: number) => {
        store.dispatch({
          type: "settings/setMusicVolume",
          payload: value,
        });
      }
    );
    addSlider(
      this,
      50,
      400,
      "Effects Volume",
      store.getState().settings.effectsVolume,
      (value: number) => {
        store.dispatch({
          type: "settings/setEffectsVolume",
          payload: value,
        });
      }
    );
    addCheckbox(
      this,
      50,
      500,
      "Mute all sound",
      store.getState().settings.isMuted ? true : false,
      (value: boolean) => {
        store.dispatch({
          type: "settings/setMuted",
          payload: !store.getState().settings.isMuted,
        });
      }
    );
  }
}

const backButton = (scene: any, x: number, y: number) => {
  const expand = true;
  const back = scene.rexUI.add
    .buttons({
      x: x,
      y: y,
      width: 100,
      orientation: "y",

      buttons: [createButton(scene, "Back")],

      space: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 20,
        item: 20,
      },
      expand: expand,
    })
    .layout();

  back
    .on("button.click", (button: any, index: any) => {
      store.dispatch({
        type: "scenes/setActiveScene",
        payload: "main",
      });
      scene.scene.switch("main");
    })
    .on("button.over", (button) => {
      button.getElement("background").setStrokeStyle(2, 0xffffff);
    })
    .on("button.out", (button) => {
      button.getElement("background").setStrokeStyle();
    });
};

const addSlider = (
  scene: any,
  x: number,
  y: number,
  label: string,
  initialValue: number,
  updateValue: Function
) => {
  scene.rexUI.add
    .slider({
      anchor: {
        left: `left+${x}`,
      },
      y: y,
      width: 300,
      height: 30,
      orientation: "x",

      track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x8e382e),
      indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x4e342e),
      thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x4e342e),

      input: "click", // 'drag'|'click'
      easeValue: { duration: 250 },
      value: initialValue || 0,

      valuechangeCallback: function (value: any) {
        updateValue(value);
      },
    })
    .layout();

  scene.rexUI.add.label({
    text: scene.add.text(400, y - 10, label, {
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

const addCheckbox = (
  scene: any,
  x: number,
  y: number,
  label: string,
  value: boolean,
  updateValue: Function
) => {
  const checkbox = scene.rexUI.add
    .buttons({
      x: x,
      y: y,
      width: 300,
      orientation: "y",

      anchor: {
        left: `left+${x}`,
      },
      value,
      buttons: [createButton(scene, value ? "True" : "False")],

      type: "checkboxes",

      space: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 20,
        item: 20,
      },
      expand: true,

      setValueCallback: (button, value) => {
        button
          .getElement("background")
          .setFillStyle(value ? 0x225e57 : 0x995e57);
        button.getElement("text").setText(value ? "True" : "False");
      },
    })
    .layout();

  const valueLabel = scene.rexUI.add.label({
    text: scene.add.text(400, y - 10, `${label}`, {
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

  checkbox.buttons.forEach((button) => {
    button.getElement("background").setFillStyle(value ? 0x225e57 : 0x995e57);
    button.getElement("text").setText(value ? "True" : "False");
  });

  checkbox
    .on("button.click", (button: any, index: any) => {
      updateValue();
    })
    .on("button.over", (button) => {
      button.getElement("background").setStrokeStyle(2, 0xffffff);
    })
    .on("button.out", (button) => {
      button.getElement("background").setStrokeStyle();
    });
};
