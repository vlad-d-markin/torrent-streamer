import React from 'react';
import PropTypes, { func } from 'prop-types';
import $ from 'jquery'
import './style.scss'

class Page extends React.Component {
    constructor() {
        super()
        this.handleResize = this.handleResize.bind(this)
    }

    adaptMargin() {
        const headerHeight = this.$header.outerHeight();
        this.$content.css('top', headerHeight + 'px');
    }

    handleResize() {
        this.adaptMargin();
    }

    componentDidMount() {
        if (!this.props.header) return;
        this.$header = $('#header');
        this.$content = $('#content');
        $(window).resize(this.handleResize);
        this.adaptMargin();
        this.$content.resize(function() {
            console.log('content resize')
        })
    }

    render() {
        const { header, children } = this.props;
        return (
            <React.Fragment>
                {header &&
                <div id="header">
                    <div className="container">
                        {header}
                    </div>
                </div>
                }
                <div id="content">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Page
