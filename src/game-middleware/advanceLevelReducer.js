import { lerpVectors } from '../helpers/Utils';
import { easeOutQuint, } from 'easing-utils';

const levelTransitionDuration = 500;

export default function advanceLevelReducer(
    keysDown:Object,
    actions:Object,
    gameData:Object,
    oldState:Object,
    currentState:Object,
    next:Function
) {

    const {
        currentTransitionStartTime, startTransitionPosition,
        currentTransitionTarget, advanceToNextChapter,
        transitionCameraPositionStart, currentTransitionCameraTarget,
        isAdvancing, sideEffectQueue, transitionPercent: lastTransitionPercent,
        advanceAction,
    } = oldState;

    const { advanceChapter, } = actions;

    const { time, } = currentState;

    if( isAdvancing ) {

        if( lastTransitionPercent === 1 ) {

            return {
                ...currentState,
                playerContact: {},
                sideEffectQueue: [
                    ...sideEffectQueue,
                    advanceAction,
                ],
                isAdvancing: false,
                transitionPercent: null,
                advanceAction: null,
            };

        }

        const newState = {};
        const transitionPercent = Math.min(
            ( time - currentTransitionStartTime ) / levelTransitionDuration,
            1
        );

        newState.transitionPercent = transitionPercent;
        newState.currentTransitionPosition = startTransitionPosition
            .clone()
            .lerp( currentTransitionTarget, transitionPercent );

        newState.cameraPosition = lerpVectors(
            transitionCameraPositionStart,
            currentTransitionCameraTarget,
            transitionPercent,
            easeOutQuint
        );

        return {
            ...currentState,
            ...newState
        };

    }

    return next( currentState );

}
