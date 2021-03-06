import React, { Component, PropTypes } from 'react';
import THREE from 'three';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
    commonResources, gameResources, PausedScreenResources,
    StaticEntitiesResources, TitleScreenResources,
} from '../../resources';

@connect(
    state => {

        const { letters, shaders } = state;
        const lettersArray = Object.values( letters[ 'Sniglet Regular' ] );
        const shadersArray = Object.values( shaders ).map( shader => shader.resource );
        return { lettersArray, shadersArray };

    }
)
export default class GameResources extends Component {

    render() {

        const {
            lettersArray, shadersArray,
        } = this.props;

        return <resources>
            { lettersArray }
            { shadersArray }
            { commonResources }
            { gameResources }
            { PausedScreenResources }
            { StaticEntitiesResources }
            { TitleScreenResources }
        </resources>;

    }

}
