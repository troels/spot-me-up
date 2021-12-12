import Phaser from "phaser";

import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import MainMenuScene from "./scenes/MainMenuScene"
import GameScene from "./scenes/GameScene";
import SettingsScene from "./scenes/SettingsScene";
import { render } from "react-dom";
import React from "react";
import App from "../ui/components/App"
import { Provider } from "react-redux";
import { store } from "../system/store";

const config = {
  parent: "root",
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      },
    ],
  },
  scene: [MainMenuScene, GameScene, SettingsScene],
};

const game = new Phaser.Game(config);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
