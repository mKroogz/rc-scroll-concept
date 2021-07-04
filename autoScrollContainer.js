"use strict";
const useState = React.useState;
const useEffect = React.useEffect;

const AutoScrollContainer = props => {
    const [containerStyle, setContainerStyle] = useState({
        position: "relative",
        overflow: "hidden",
        maxHeight: "100%",
        maxWidth: "100%",
        width: "100%",
        height: "100%"
    });
    const [contentStyle, setContentStyle] = useState({
        position: `absolute`,
        height: `min-content`,
        transitionProperty: `all`,
    });
    const [page, setPage] = useState({
        contentTop: 0,
        contentLeft: 0,
        intervalId: 0
    });
    const [direction, setDirection] = useState('down');
    const container = React.useRef();
    const content = React.useRef();
    
    const loadLinearMovement = () => {
        props.setScroll((prevState) => ({
            ...prevState,
            movement: 'linear'
        }));
    }

    const scrollStart = () => {
        // console.log('AutoScrollContainer.scrollStart', this.state.direction);
        var top = direction == "up" ? 0 : content.current.clientHeight - container.current.clientHeight;
        console.log(direction);
        // next = this.toggleScroll(direction, top);
        setTimeout(() => toggleScroll(direction, top), props.scroll.delay);
      };
    
    const toggleScroll = (direction, top) => {
        console.log('toggle')

        var down = direction === 'down' ? true : false;
        setDirection(down ? 'up' : 'down',);
        props.setScroll((prevState) => ({
            ...prevState,
            speed: down ? props.scroll.speedDown : props.scroll.speedUp
        }));
        setPage((prevState) => ({
            ...prevState,
            contentTop: top,
            contentLeft: 0
        }));
        
    }

  useEffect(() => {
      loadLinearMovement();
  }, []);

  useEffect(() => {
    setContentStyle((prevState) => ({
        ...prevState,
        top: `-${page.contentTop}px`,
        left: `-${page.contentLeft}px`,
        // transitionDelay: `${props.scroll.delay}ms`,
        transitionDuration: `${props.scroll.speed}ms`,
        transitionTimingFunction: `${props.scroll.movement}`
    }));

    // content.current.addEventListener("transitioncancel", scrollStart);
    // content.current.addEventListener("transitionend", scrollStart);

    scrollStart();
  }, [direction]);

    return (
      <div
        className="auto-scroll-container"
        ref={container}
        style={containerStyle}
      >
        <div
          className="auto-scroll-container-content"
          ref={content}
          style={contentStyle}
        >
          {props.children}
        </div>
      </div>
    );
};
// export default AutoScrollContainer;