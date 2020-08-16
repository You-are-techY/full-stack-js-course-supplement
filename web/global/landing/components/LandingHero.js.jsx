// import primary libraries
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

// import css modules
import landingStyles from '../landingStyles.css';

// build a temporary component for each "cool thing"
const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={{
     enter: 300,
     exit: 500,
    }}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

//build and export the landing page Hero banner
class Hero extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      secondsElapsed: 0
      , coolThing: "projects"
      , coolThingIndex: 0
      , coolThingsList : [ "school",  "work", "life"]
    };
  }

  tick() {
    var { coolThing, coolThingIndex, coolThingsList, secondsElapsed } = this.state;
    let nextCoolThingIndex;
    if(coolThingIndex == coolThingsList.length - 1) {
      // last one, reset to 0
      nextCoolThingIndex = 0;
    } else {
      // setup the next cool thing
      nextCoolThingIndex = coolThingIndex + 1;
    }
    this.setState({
      secondsElapsed: secondsElapsed + 1
      , coolThing: coolThingsList[coolThingIndex]
      , coolThingIndex: nextCoolThingIndex
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 2200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div styleName="landingStyles.hero" className="hero">
        <div className="yt-container">
          <h1>TechY Todos</h1>
          <p> A sample todo list app by You are techY </p>
          <h3> Keep track of 
            <span>
              <TransitionGroup
                exit={false}
                style={{display: 'inline-block', marginLeft: '8px'}}
              >
                <Fade  key={this.state.coolThing}>
                  <span styleName="cool-thing">  {this.state.coolThing} </span>
                </Fade>
              </TransitionGroup>
            </span>
          </h3>
          <br/>
          <Link className="yt-btn x-large" to="/user/register">Get Started</Link>
        </div>
      </div>
    )
  }
};

export default Hero;
