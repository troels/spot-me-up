import React from "react";

const App = () => {
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
        </div>
    );
};

export default App;
