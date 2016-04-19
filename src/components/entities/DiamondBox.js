import React, { Component } from 'react';
import THREE from 'three';
import { Mesh } from '../';

const defaultRotation = new THREE.Quaternion( 0, 0, 0, 1 );

export default class DiamondBox extends Component {

    render() {

        const { position, rotation, scale, materialId, assets } = this.props;

        return <group
            position={ position }
            quaternion={ rotation || defaultRotation }
            scale={ scale }
        >
            <Mesh
                ref="child"
                assets={ assets }
                meshName="diamondBox"
                materialId={ materialId }
            />
        </group>;

    }

}

