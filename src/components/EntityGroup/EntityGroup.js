import React, { Component, PropTypes } from 'react';

import {
    Shrink, Grow, Wall, MultiWall, ChamferBox, TubeBend, TubeStraight, Player,
    FinishLine, House, Waterfall, Puffer, PlankBridge, DiamondBox, CurvedWall,
    Placeholder, Pyramid,
} from '../';

export default class EntityGroup extends Component {

    static propTypes = {
        time: PropTypes.number,
        entities: PropTypes.array.isRequired,
        world: PropTypes.object,
        paused: PropTypes.bool,
        playerRadius: PropTypes.number,
        playerBody: PropTypes.object,
        plankEntities: PropTypes.object,
        anchorEntities: PropTypes.object,
        showInvisible: PropTypes.bool,
    }

    render() {

        const {
            entities, time, position, scale, shaders, assets, world, paused,
            playerRadius, playerBody, debug, plankEntities, anchorEntities,
            showInvisible,
        } = this.props;

        return <group
            ref="group"
            position={ position }
            scale={ scale }
        >

            { entities.map( entity => {

                if( entity.type === 'pyramid' ) {

                    return <Pyramid
                        ref={ entity.id }
                        key={ entity.id }
                        assets={ assets }
                        scale={ entity.scale }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId={ entity.materialId }
                    />;

                } else if( entity.type === 'trigger' ) {

                    return <Placeholder
                        ref={ entity.id }
                        key={ entity.id }
                        scale={ entity.scale }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId={
                            showInvisible ?
                                'placeholder' :
                                'transparent'
                        }
                    />;

                } else if( entity.type === 'curvedwall' ) {

                    return <CurvedWall
                        ref={ entity.id }
                        key={ entity.id }
                        assets={ assets }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId={ entity.materialId }
                        topMaterialId={ entity.topMaterialId }
                    />;

                } else if( entity.type === 'diamondbox' ) {

                    return <DiamondBox
                        ref={ entity.id }
                        key={ entity.id }
                        assets={ assets }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId={ entity.materialId }
                    />;

                } else if( entity.type === 'wall' ) {

                    return <Wall
                        shaders={ shaders }
                        ref={ entity.id }
                        key={ entity.id }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId={ entity.materialId }
                    />;

                } else if( entity.type === 'bridge' ) {

                    return <PlankBridge
                        ref={ entity.id }
                        key={ entity.id }
                        entityId={ entity.id }
                        assets={ assets }
                        plankEntities={ plankEntities }
                        anchorEntities={ anchorEntities }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        segments={ entity.segments }
                        paddingPercent={ entity.paddingPercent }
                        materialId={ entity.materialId }
                        ropeMaterialId={ entity.ropeMaterialId }
                        maxForce={ entity.maxForce }
                    />;

                } else if( entity.type === 'puffer' ) {

                    return <Puffer
                        time={ time }
                        ref={ entity.id }
                        key={ entity.id }
                        debug={ debug }
                        impulse={ entity.impulse }
                        maxLength={ entity.maxLength }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        colors={ entity.colors }
                        world={ world }
                        paused={ paused }
                        playerRadius={ playerRadius }
                        materialId={ entity.materialId }
                        playerBody={ playerBody }
                        helperMaterialId={ showInvisible ?
                            'placeholder' :
                            'transparent'
                        }
                        velocity={ entity.velocity }
                        velocity={ entity.velocity }
                        angle={ entity.angle }
                        angleSpread={ entity.angleSpread }
                        opacity={ entity.opacity }
                    />;

                } else if( entity.type === 'waterfall' ) {

                    return <Waterfall
                        time={ time }
                        ref={ entity.id }
                        key={ entity.id }
                        debug={ debug }
                        impulse={ entity.impulse }
                        maxLength={ entity.maxLength }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        world={ world }
                        paused={ paused }
                        playerRadius={ playerRadius }
                        playerBody={ playerBody }
                        materialId={ entity.materialId }
                        helperMaterialId={ showInvisible ?
                            'placeholder' :
                            'transparent'
                        }
                        foamMaterialId={ entity.foamMaterialId }
                        velocity={ entity.velocity }
                        velocity={ entity.velocity }
                        angle={ entity.angle }
                        angleSpread={ entity.angleSpread }
                        opacity={ entity.opacity }
                    />;

                } else if( entity.type === 'chamferbox' ) {

                    return <ChamferBox
                        ref={ entity.id }
                        key={ entity.id }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        assets={ assets }
                        materialId={ entity.materialId }
                    />;

                } else if( entity.type === 'floor' || entity.type === 'multiwall' ) {

                    return <MultiWall
                        ref={ entity.id }
                        key={ entity.id }
                        assets={ assets }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId={ entity.materialId }
                        topMaterialId={ entity.topMaterialId }
                    />;

                } else if( entity.type === 'tube' ) {

                    return <TubeStraight
                        ref={ entity.id }
                        key={ entity.id }
                        assets={ assets }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId="tubeMaterial"
                    />;

                } else if( entity.type === 'tubebend' ) {

                    return <TubeBend
                        ref={ entity.id }
                        key={ entity.id }
                        assets={ assets }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId="tubeBendMaterial"
                    />;

                } else if( entity.type === 'house' ) {

                    return <House
                        ref={ entity.id }
                        key={ entity.id }
                        assets={ assets }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId="sfHouse"
                    />;

                } else if( entity.type === 'finish' ) {

                    return <FinishLine
                        ref={ entity.id }
                        key={ entity.id }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId="finishFlag"
                        floorMaterialId={ entity.materialId || 'ornateWall1' }
                    />;

                } else if( entity.type === 'shrink' ) {

                    return <Shrink
                        time={ time }
                        ref={ entity.id }
                        key={ entity.id }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        wrapMaterialId={ entity.wrapMaterialId }
                        materialId={ entity.materialId }
                        wrapMaterialId={ entity.wrapMaterialId }
                    />;

                } else if( entity.type === 'grow' ) {

                    return <Grow
                        time={ time }
                        ref={ entity.id }
                        key={ entity.id }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        wrapMaterialId={ entity.wrapMaterialId }
                        materialId={ entity.materialId }
                        wrapMaterialId={ entity.wrapMaterialId }
                    />;

                } else if( entity.type === 'player' ) {

                    return <Player
                        ref={ entity.id }
                        key={ entity.id }
                        assets={ assets }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        radius={ 0.5 }
                        materialId="earth"
                    />;

                } else {

                    return <Placeholder
                        ref={ entity.id }
                        key={ entity.id }
                        scale={ entity.scale }
                        position={ entity.position }
                        quaternion={ entity.rotation }
                        scale={ entity.scale }
                        materialId="greenDebugMaterial"
                    />;

                }

            }) }

        </group>;

    }

}
