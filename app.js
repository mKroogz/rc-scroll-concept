'use strict';

class App extends React.Component {
    
    static defaultProps = {}

    constructor(props) {
        super(props);
        
        this.state = {
            delay: 4000,
            speed: 1000,
            speedUp: 1000,
            speedDown: 1000,
            movement: 'ease-out',
        };
    }

    componentDidMount() {
        console.log('App.componentDidMount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('App.componentDidUpdate', prevProps, prevState);
    }
    componentWillUnmount() {
        console.log('AutoScrollContainer.componentWillUnmount');
    }

    render() {
        console.log('App.render', state);

        const props = this.props;
        const state = this.state;

        console.log(state);
        
        return (
            <Viewport>
                <form>
                    <input 
                        type="number" 
                        placeholder="delay"
                        name="delay"
                        value={state.delay}
                        onChange={this.onUpdate}
                    />
                    <input 
                        type="number" 
                        placeholder="speed" 
                        name="speed"
                        value={state.speed}
                        onChange={this.onUpdate}
                    />
                    <input 
                        type="number" 
                        placeholder="speedUp" 
                        name="speedUp"
                        value={state.speedUp}
                        onChange={this.onUpdate}
                    />
                    <input 
                        type="number" 
                        placeholder="speedDown" 
                        name="speedDown"
                        value={state.speedDown}
                        onChange={this.onUpdate}
                    />
                    <input 
                        type="text" 
                        placeholder="movement" 
                        name="movement"
                        value={state.movement}
                        onChange={this.onUpdate}
                    />
                </form>
                
                <AutoScrollContainer 
                    delay={state.delay}
                    speed={state.speed}
                    speedUp={state.speedUp}
                    speedDown={state.speedDown}
                    movement={state.movement}

                    // delay={1000}          // time in milliseconds between scroll animations
                    // speed={1000}          // time in milliseconds to be used if speedUp or speedDown isn't specified
                    // speedUp={100}         // time in milliseconds it takes to return to the top.
                    // speedDown={20000}     // time in milliseconds it will take to get to the bottom of the container.
                    // movement={'ease-out'} // 'ease-in'|'ease-out'|'ease-in-out'|<cubic bezier>
                >
                    <Gallery/>
                </AutoScrollContainer>

            </Viewport>
        )
    }

    onUpdate = (e) => {
        const key = e.target.name;
        const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;

        console.log('App.onUpdate', key, ':', val);

        this.setState({
            [key]: val
        })
    }
}

class Viewport extends React.Component {

    static defaultProps = {
        style: {
            backgroundColor: '#333',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: '100vh',
            maxHeight: '100vh',
            width: '100vw',
            maxWidth: '100vw',
            padding: '4vmax'
        }
    }
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('Viewport.componentDidMount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Viewport.componentDidUpdate', prevProps, prevState);
    }
    componentWillUnmount() {
        console.log('Viewport.componentWillUnmount');
    }

    render() {
        const props = this.props;
        
        return (
            <div className="viewport" style={props.style}>
                {props.children}
            </div>
        );
    }
}

class AutoScrollContainer extends React.Component {
    
    static defaultProps = {
        delay: 4000,
        speedUp: 1000,
        speedDown: 1000,
        speed: 1000,
        movement: 'linear',

        containerStyle: {
            position: 'relative',
            overflow: 'hidden',
            maxHeight: '100%',
            maxWidth: '100%',
            width: '100%',
            height: '100%',
        },

        contentStyle: {
            position: `absolute`,
            height: `min-content`,
            transitionProperty: `all`,
        }
    }

    constructor(props) {
        console.log('AutoScrollContainer.constructor');
        super(props);
        
        // setup default state
        //
        this.state = {
            delay: props.delay,
            speedDown: props.speedDown || props.speed,
            speedUp: props.speedUp || props.speed,
            speed: props.speed,
            movement: props.movement,
            contentTop: 0,
            contentLeft: 0,
            intervalId: 0,
        };
        
        // create refs to the dom elements so we can keep track of 
        // them as react re-renders the dom.
        //
        this.container = React.createRef();
        this.content = React.createRef();
    }

    componentDidMount() {
        console.log('AutoScrollContainer.componentDidMount');

        // content ref
        //
        const container = this.container.current;
        const content = this.content.current;

        // the transition events are used to determine when the scrolling animation 
        // has ended so we don't need to deal with complicated timing math
        //
        content.addEventListener('transitioncancel', this.scrollStart.bind(this));
        content.addEventListener('transitionend', this.scrollStart.bind(this));
        
        this.scrollStart();
    }    
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('AutoScrollContainer.componentDidUpdate', prevProps, prevState);
    }
    componentWillUnmount() {
        console.log('AutoScrollContainer.componentWillUnmount');
    }

    render() {
        console.log('AutoScrollContainer.render');

        const props = this.props;
        const state = this.state;

        const containerStyle = Object.assign({}, props.containerStyle);
        const contentStyle = Object.assign({}, props.contentStyle, {
            top: `-${state.contentTop}px`,
            left: `-${state.contentLeft}px`,
            // transitionDelay          : `${state.delay}ms`,
            transitionDuration: `${state.speed}ms`,
            transitionTimingFunction: `${state.movement}`,
        });

        return (
            <div className="auto-scroll-container" ref={this.container} style={containerStyle}>

                <div className="auto-scroll-container-content" ref={this.content} style={contentStyle}>

                    {props.children}

                </div>

            </div>
        );
    }

    scrollStart = () => {
        // console.log('AutoScrollContainer.scrollStart', this.state.direction);
        const container = this.container.current;
        const content = this.content.current;
        var direction = (this.state.direction == 'down' ? 'up' : 'down');
        var top = (direction == 'up' ? 0 : (content.clientHeight - container.clientHeight));
        console.log(direction);
        // next = this.toggleScroll(direction, top);
        setTimeout(() => this.toggleScroll(direction, top), this.state.delay);
    }

    toggleScroll = (direction, top) => {
        // console.log('AutoScrollContainer.scrollToBottom');

        this.setState((state) => {
            return {
                delay: this.props.delay,
                speedDown: this.props.speedDown || this.props.speed,
                speedUp: this.props.speedUp || this.props.speed,
                speed: this.props.speed,
                direction: direction,
                speed: state.speedDown,
                contentTop: top,
                contentLeft: 0
            };
        });
    }
}

ReactDOM.render(<App />, document.querySelector('.app'));