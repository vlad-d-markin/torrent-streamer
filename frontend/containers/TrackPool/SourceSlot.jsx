import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './constants';

class SourceSlot extends React.Component {
    render() {
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(<div className="source-slot">{this.props.children}</div>);
    }
}

const spec = {
    drop(props, monitor) {
        return { trackId: props.trackId };
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

SourceSlot.propTypes = {
    trackId: PropTypes.string.isRequired
}

export default DropTarget(ItemTypes.SOURCE, spec, collect)(SourceSlot)
