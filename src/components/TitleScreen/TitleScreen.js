import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import { browserHistory } from 'react-router';
import KeyCodes from '../../helpers/KeyCodes';
import { without } from '../../helpers/Utils';
import styles from '../../containers/Game/Game.scss';
import classNames from 'classnames/bind';
import { Text } from '../';

const cx = classNames.bind( styles );
const gameWidth = 400;
const gameHeight = 400;
const cameraAspect = gameWidth / gameHeight;
const cameraFov = 75;
const cameraPosition = new THREE.Vector3( 0, 8, 0 );
const lookAt = new THREE.Vector3( 0, 0, 0 );

export default class TitleScreen extends Component {
    
    static propTypes = {
        books: React.PropTypes.array.isRequired,
        fonts: React.PropTypes.object.isRequired,
        letters: React.PropTypes.object.isRequired,
        onSelect: React.PropTypes.func.isRequired,
    }

    constructor( props, context ) {

        super( props, context );

        this.keysDown = {};
        this.state = {
            hoveredBook: null,
        };

        this.onMouseDown = this.onMouseDown.bind( this );
        this.onMouseEnter = this.onMouseEnter.bind( this );
        this.onMouseLeave = this.onMouseLeave.bind( this );

    }


    onMouseDown( book, event ) {

        const {
            hoveredBook
        } = this.state;

        if( hoveredBook ) {

            this.props.onSelect( hoveredBook );

        }

    }

    onMouseEnter( book, event ) {

        this.props.onClickRegionEnter();
        this.setState({ hoveredBook: book });

    }

    onMouseLeave( book, event ) {

        this.props.onClickRegionLeave();
        if( this.state.hoveredBook === book ) {

            this.setState({ hoveredBook: null });

        }

    }

    render() {

        const { books, fonts, letters } = this.props;
        const { hoveredBook } = this.state;

        return <object3D>

            <perspectiveCamera
                name="mainCamera"
                fov={ cameraFov }
                aspect={ cameraAspect }
                near={ 0.1 }
                far={ 1000 }
                position={ cameraPosition }
                lookAt={ lookAt }
                ref="camera"
            />

            <Text
                position={ new THREE.Vector3( -4.5, 0, 0 ) }
                scale={ new THREE.Vector3( 1, 1, 0.5 ).multiplyScalar( 1.8 ) }
                fonts={ fonts }
                letters={ letters }
                fontName="Sniglet Regular"
                text="Today"
                materialId="universeInALetter"
            />
            <Text
                position={ new THREE.Vector3( -2.6, 0, 0 ) }
                scale={ new THREE.Vector3( 1, 1, 1 ).multiplyScalar( 0.8 ) }
                fonts={ fonts }
                letters={ letters }
                fontName="Sniglet Regular"
                text="I'm A Galaxy"
                materialId="universeInALetter"
            />

            { books.map( ( book, index ) =>
                <Text
                    onMouseEnter={ this.onMouseEnter.bind( null, book ) }
                    onMouseLeave={ this.onMouseLeave.bind( null, book ) }
                    onMouseDown={ this.onMouseDown.bind( null, book ) }
                    ref={ `book${ book.id }` }
                    position={ new THREE.Vector3( index * 1.4, 0, 0 ) }
                    key={ book.id }
                    text={ book.name }
                    fonts={ fonts }
                    letters={ letters }
                    fontName="Sniglet Regular"
                    materialId={
                        book === hoveredBook ?
                            'universeInAMenuHover' : 'universeInAMenu'
                    }
                />
            )}
        </object3D>;

    }

}
