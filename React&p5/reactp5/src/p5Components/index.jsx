import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sketch from './sketch';

export default class P5Comp extends Component {
    static propTypes = {
        p5Props: PropTypes.object.isRequired,
        onSetAppState: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.canvas = new window.p5(sketch, 'canvas-container');
        this.canvas.props = this.props.p5Props;
        this.canvas.onSetAppState = this.props.onSetAppState;
        this.props.onP5InstCreated(this.canvas);
    }

    shouldComponentUpdate(nextProps) {
        this.canvas.props = nextProps.p5Props;
        return false;
    }

    componentWillUnmount() {
        this.canvas.remove();
    }

    render() {
        return (
            <>
                <div id="canvas-container"></div>
            </>
        );
    }
}