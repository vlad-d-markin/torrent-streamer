import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './constants';

class SourcePlug extends React.Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        const { name, infoHash, index } = this.props.source;
        return connectDragSource(<div className="source-plug">{name} - {infoHash}</div>);
    }
}

const spec = {
    beginDrag(props) {
        return props.source;
    },

    endDrag(props, monitor) {
        if (monitor.didDrop()) {
            var result = monitor.getDropResult();
            props.onMoved({ source: props.source, fromTrack: props.trackId, toTrack: result.trackId });
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

SourcePlug.propTypes = {
    trackId: PropTypes.string,
    source: PropTypes.object.isRequired,
    onMoved: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.SOURCE, spec, collect)(SourcePlug)
