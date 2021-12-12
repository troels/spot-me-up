import React from "react";
import Settings from "../scenes/Settings";
import MainMenu from "../scenes/MainMenu";
import Game from "../scenes/Game";
import { useAppSelector } from "../../system/hooks";

const App = () => {
  const scene = useAppSelector(state => state.scenes.activeScene);

  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      position: "absolute" as 'absolute',
    }
  }

  return (
    <div style={styles.wrapper}>
      {scene === "main" && <MainMenu />}
      {scene === "settings" && <Settings />}
      {scene === "game" && <Game />}
    </div>
  );
};

export default App;