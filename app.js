"use strict";
const useState = React.useState;
// import Gallery from "./gallery";
// import AutoScrollContainer from "./autoScrollContainer";
// import Viewport from "./viewport";

const App = () => {
  const [scroll, setScroll] = useState({
    delay: 4000,
    speed: 1000,
    speedUp: 1000,
    speedDown: 1000,
    movement: "ease-out"
  });

  const onUpdate = (e) => {
    const key = e.target.name;
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;

    console.log("App.onUpdate", key, ":", val);

    setScroll((prevState) => ({
      ...prevState,
      [key]: val
    }));
  };

  return (
    <Viewport>
      <form>
        <input
          type="number"
          placeholder="delay"
          name="delay"
          value={scroll.delay}
          onChange={onUpdate}
        />
        <input
          type="number"
          placeholder="speed"
          name="speed"
          value={scroll.speed}
          onChange={onUpdate}
        />
        <input
          type="number"
          placeholder="speedUp"
          name="speedUp"
          value={scroll.speedUp}
          onChange={onUpdate}
        />
        <input
          type="number"
          placeholder="speedDown"
          name="speedDown"
          value={scroll.speedDown}
          onChange={onUpdate}
        />
        <input
          type="text"
          placeholder="movement"
          name="movement"
          value={scroll.movement}
          onChange={onUpdate}
        />
      </form>

      <AutoScrollContainer
        scroll={scroll}
        setScroll={setScroll}

        // delay={1000}          // time in milliseconds between scroll animations
        // speed={1000}          // time in milliseconds to be used if speedUp or speedDown isn't specified
        // speedUp={100}         // time in milliseconds it takes to return to the top.
        // speedDown={20000}     // time in milliseconds it will take to get to the bottom of the container.
        // movement={'ease-out'} // 'ease-in'|'ease-out'|'ease-in-out'|<cubic bezier>
      >
        <Gallery />
      </AutoScrollContainer>
    </Viewport>
  );
};

ReactDOM.render(<App />, document.querySelector(".app"));
