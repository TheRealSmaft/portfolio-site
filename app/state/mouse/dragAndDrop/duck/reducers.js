import types from './types';

const dragAndDropReducer = (state = {
	zones: {},
	draggables: {},
	currentDraggable: null,
	currentDropZone: null,
	canDrop: false
}, action) => {
	switch(action.type) {
		case types.CREATE_DRAGGABLE: {
			var name = action.payload.id
			state = {
				...state,
				draggables: {
					...state.draggables,
					[name]: action.payload
				}
			}
			break;
		}
		case types.CREATE_DROP_ZONE: {
			var name = action.payload.id
			state = {
				...state,
				zones: {
					...state.zones,
					[name]: action.payload
				}
			}
			break;
		}
		case types.SELECT_DRAGGABLE: {
			state = {
				...state,
				currentDraggable: action.payload
			}

			var zoneCheck = null;

			if(state.currentDraggable != null) {
				zoneCheck = state.draggables[state.currentDraggable].zone;
			}
			else
			{
				state = {
					...state,
					currentDropZone: null,
					canDrop: false
				}
			}

			if(!state.canDrop && zoneCheck != null && zoneCheck === state.currentDropZone) {
				state = {
					...state,
					canDrop: true
				}
			}
			else
			{
				state = {
					...state,
					canDrop: false
				}
			}

			break;
		}
		case types.SELECT_DROP_ZONE: {
			state = {
				...state,
				currentDropZone: action.payload
			}

			var zoneCheck = null;

			if(state.currentDraggable != null) {
				zoneCheck = state.draggables[state.currentDraggable].zone;
			}
			else
			{
				state = {
					...state,
					canDrop: false
				}
			}

			if(!state.canDrop && zoneCheck != null && zoneCheck === state.currentDropZone) {
				state = {
					...state,
					canDrop: true
				}
			}
			else
			{
				state = {
					...state,
					canDrop: false
				}
			}

			break;
		}
		case types.DROP_SUCCESSFUL: {
			var name = action.payload;

			state = {
				...state,
				draggables: {
					...state.draggables,
					[name]: {
						...[name],
						droppedInZone: true,
						canDrag: state.draggables[name].canBeRemovedFromZone ? true : false
					}
				}
			}

			break;
		}
	}
	return state;
}

export default dragAndDropReducer;