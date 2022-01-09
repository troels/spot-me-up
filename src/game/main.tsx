import Phaser from "phaser";

import GameScene from "./scenes/GameScene";
import { render } from "react-dom";
import React from "react";
import App from "../ui/components/App"

const config = {
    parent: "root",
    width: 800,
    height: 600,
    zoom: 1,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    scene: [GameScene],
};

const game = new Phaser.Game(config);

render(
    <App />,
    document.getElementById("root")
);
