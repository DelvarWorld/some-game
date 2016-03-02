import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import { reducer as form } from 'redux-form';
import {
    assetsReducer, shadersReducer, loadAssetsReducer, fontsReducer
} from './assets';
import { game, gameChapterReducer, gameBookReducer } from './game';
import {
    loadLevelsReducer, levelsReducer, entitiesReducer,
    editorSelectedLevelReducer, booksReducer, chaptersReducer,
    editorSelectedBookReducer, editorSelectedChapterReducer
} from './editor';

export default combineReducers({
    routing: routeReducer,
    reduxAsyncConnect,
    auth,
    form,

    // editor
    levelsLoaded: loadLevelsReducer,
    books: booksReducer,
    chapters: chaptersReducer,
    levels: levelsReducer,
    assets: assetsReducer,
    fonts: fontsReducer,
    assetsLoaded: loadAssetsReducer,
    shaders: shadersReducer,
    entities: entitiesReducer,

    currentEditorLevel: editorSelectedLevelReducer,
    currentEditorBook: editorSelectedBookReducer,
    currentEditorChapter: editorSelectedChapterReducer,

    // game
    gameChapterData: gameChapterReducer,
    currentGameBook: gameBookReducer,
    game,
});
