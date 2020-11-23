import { createStore } from 'redux'
import { rootReducer } from './root-reducer'
import { loadState, saveState } from './local-storage'
import { throttle } from 'lodash'

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe( throttle(() => saveState({ ...store.getState() }), 1000) )

export default store