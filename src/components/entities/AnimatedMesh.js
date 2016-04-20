import React, { Component, PropTypes } from 'react';
import THREE from 'three';

const defaultRotation = new THREE.Quaternion( 0, 0, 0, 1 );

export default class AnimatedMesh extends Component {

    static propTypes = {
        position: PropTypes.object,
        rotation: PropTypes.object,
        scale: PropTypes.object,
        assets: PropTypes.object.isRequired,
        texture: PropTypes.object.isRequired,
        imageValue: PropTypes.string,
        meshName: PropTypes.string.isRequired,
        animations: PropTypes.object.isRequired,
        animationPercent: PropTypes.number,
    };

    constructor() {

        super();

        //this._onUpdate = this._onUpdate.bind( this );
        this.updateAnimations = this.updateAnimations.bind( this );

    }

    componentDidMount() {

        const {
            assets, texture, imageValue, meshName, animations
        } = this.props;
        const meshData = assets[ meshName ];
        const { geometry } = meshData;
        const { meshGroup } = this.refs;

        const skinnedMesh = new THREE.SkinnedMesh(
            geometry,
            texture
        );

        if( imageValue ) {
            texture.uniforms.image.value = imageValue;
        }

        // See https://github.com/mrdoob/three.js/issues/8673
        texture.side = THREE.DoubleSide;

        skinnedMesh.material.skinning = true;
        this.skinnedMesh = skinnedMesh;

        const mixer = new THREE.AnimationMixer( skinnedMesh );

        // Create the animations
        for( let i = 0; i < geometry.animations.length; ++i ) {

            mixer.clipAction( geometry.animations[ i ] ).play();

        }

        meshGroup.add( skinnedMesh );
        this.mixer = mixer;

        this.updateAnimations( animations );

    }

    updateAnimations( animations ) {

        const { mixer, } = this;

        if( mixer && animations ) {

            for( const key in animations ) {

                const data = animations[ key ];
                const { weight, percent, } = data;
                //let { percent, weight } = data;
                const action = mixer.clipAction( key );

                if( action ) {

                    //if( key === 'Idle' ) {
                        //weight = 0;
                        //percent = 0;
                    //} else if( key === 'Jump' ) {
                        //weight = 1;
                        //percent = 1;
                    //} else if( key === 'Walk' ) {
                        //weight = 0;
                        //percent = 0;
                    //}

                    action.setEffectiveWeight( weight );
                    //action.weight = weight;
                    //action._effectiveWeight = weight;

                    const { duration } = action._clip;
                    action._loopCount = -1;
                    action.startTime = 0;
                    action.time = Math.min(
                        duration * 0.99999,
                        duration * percent
                    );
                    //action._update( action.time * 3.3, 0 );

                    //0.791667
                    //action.time = 0.891667 * 1000;
                    //action.time = Date.now() * 0.00000001;

                } else {
                    console.warn( `No action "${key}" found in mesh ${this.props.meshName}` );
                }

            }

            //mixer.update( Date.now() * 0.0001 );
            mixer.update( 0 );

        }

    }

    componentWillReceiveProps( nextProps ) {

        const{ animations } = nextProps;

        if( animations !== this.props.animations  ) {

            this.updateAnimations( animations );

        }

    }

    componentWillUnmount() {

        this.refs.meshGroup.remove( this.skinnedMesh );

    }

    //_onUpdate( delta, ealpsedTime ) {

        //const { mixer } = this;
        //const { animationPercent } = this.props;

        //if( mixer ) {

            //for( let i = 0; i < mixer._actions.length; i++ ) {

                //const action = mixer._actions[ i ];
                //const { duration } = action._clip;
                //action._loopCount = -1;
                //action.time = 0;
                //action.startTime = 0;
                //mixer.update(
                    //Math.min(
                        //duration * 0.999,
                        //duration * ( animationPercent || 0 )
                    //)
                //);

            //}

        //}

    //}

    render() {

        const { position, rotation, scale, assets, meshName, } = this.props;

        if( !assets[ meshName ] ) {
            return <group />;
        }

        return <group
            position={ position }
            rotation={ rotation }
            ref="meshGroup"
            scale={ scale }
        />;

    }

}