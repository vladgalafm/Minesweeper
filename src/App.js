import React, { Component } from 'react';
import { Menu } from "./components/Menu/Menu";
import { RotateBlocker } from "./components/RotateBlocker/RotateBlocker";
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedBlock: '',
    };
    this.resizeAppBlock = this.resizeAppBlock.bind(this);
  }

  componentDidMount() {
    console.debug('App mount');
    window.addEventListener('resize', this.resizeAppBlock);
  }

  componentWillUnmount() {
    console.debug('App unmount');
    window.removeEventListener('resize', this.resizeAppBlock);
  }

  resizeAppBlock() {
    this.appRef.style.height = `${window.innerHeight}px`;
    console.debug('Window height: ', window.innerHeight);
  }

  render() {
    const {displayedBlock} = this.state;

    return (
        <main
            className="app"
            ref={(appRef) => this.appRef = appRef}
        >
          <div className="app__container">
            { displayedBlock === 'menu' ? <Menu /> : <Menu />}
          </div>
          <RotateBlocker />
        </main>
    );
  }
}
