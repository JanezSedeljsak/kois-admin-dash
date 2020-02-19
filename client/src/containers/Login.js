import React from 'react';
const { createContext, useContext, useState } = React;

const ThemeContext = createContext(null);

function Content() {
  const { style, visible, toggleStyle, toggleVisible } = useContext(
    ThemeContext
  );

  return (
    <div>
      <p>
        The theme is <em>{style}</em> and state of visibility is
        <em> {visible.toString()}</em>
      </p>
      <button onClick={toggleStyle}>Change Theme</button>
      <button onClick={toggleVisible}>Change Visibility</button>
    </div>
  );
}

function App() {
  const [style, setStyle] = useState("light");
  const [visible, setVisible] = useState(true);

  function toggleStyle() {
    setStyle(style => (style === "light" ? "dark" : "light"));
  }
  function toggleVisible() {
    setVisible(visible => !visible);
  }

  return (
    <ThemeContext.Provider
      value={{ style, visible, toggleStyle, toggleVisible }}
    >
      <Content />
    </ThemeContext.Provider>
  );
}

export default App;