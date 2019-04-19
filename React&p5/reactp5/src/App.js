import React, { Component } from 'react';
import P5Comp from './p5Components/index';
import Circle from './Circle';

class App extends Component {
    constructor() {
        super();
        this.state = {
            test: 'Hello, World',
            p5Inst: null,
            circles: []
        }
    }

    onSetAppState = (newState, cb) => this.setState(newState, cb)

    onP5InstCreated = (p5Inst) => this.setState({p5Inst: p5Inst})

    onMousePressed = (e) => {
        let c = new Circle(this.state.p5Inst, e.mouseX, e.mouseY, 25);
        this.setState({ 
            circles: this.state.circles.concat([c])
        });
    };

    render() {

        return (
            <div className="App">
                <P5Comp
                    onP5InstCreated={this.onP5InstCreated}
                    p5Props={{ 
                        test: this.state.test,
                        circles: this.state.circles,
                        onMousePressed: this.onMousePressed
                    }}
                    onSetAppState={this.onSetAppState}
                />
            </div>
        );
    }
}

export default App;
