function checkIfStatusIsClosed(dropZone) {
	var index = _.findIndex(dropZone.getState().interactableState.dropZones, function(obj) {
		return obj.name === dropZone.props.dropZone.name
	});

	var isClosed = dropZone.getState().interactableState.dropZones[index].status === 'closed';
	return isClosed;
}

export default {
	checkIfStatusIsClosed
};