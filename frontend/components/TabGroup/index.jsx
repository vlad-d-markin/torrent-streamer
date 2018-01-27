import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types';
import TabLink from './TabLink'


class TabGroup extends React.Component {
    constructor() {
        super()
        this.handleTabSwitch = this.handleTabSwitch.bind(this);
    }

    handleTabSwitch(tabId) {
        this.props.onTabSwicth(tabId);
    }

    render() {
        const links = _.map(this.props.children, (tab, idx) => {
            const isActive = tab.props.id === this.props.tab;
            return <TabLink key={idx} active={isActive} onClick={this.handleTabSwitch} {...tab.props} />
        })
        const tabComponent = _.filter(this.props.children, tab => {
            return tab.props.id === this.props.tab;
        })

        return (
            <div className="tab-group">
                <div className="tabs">
                    <ul>
                        {links}
                    </ul>
                </div>
                <div className="tab-wrapper">
                {tabComponent}
                </div>
            </div>
        )
    }
}

TabGroup.propTypes = {
    tab: PropTypes.string.isRequired,
    onTabSwicth: PropTypes.func.isRequired
}

export default TabGroup
