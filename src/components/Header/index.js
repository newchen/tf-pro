import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';

const defaultRenderCollapsedButton = (collapsed) => (
  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
);

export default class extends Component {
  triggerResizeEvent = () => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  };

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  renderCollapsedButton = () => {
    const {
      collapsed,
      collapsedButtonRender = defaultRenderCollapsedButton,
    } = this.props;

    if (collapsedButtonRender !== false) {
      return (
        <span className="tf-header-left" onClick={this.toggle}>
          {collapsedButtonRender(collapsed)}
        </span>
      );
    }

    return null;
  };

  render() {
    const {
      middleContentRender,
      rightContentRender,
      bottomContentRender,
      className: propClassName,
      style,
      ...rest
    } = this.props;

    const className = classNames(propClassName, 'tf-layout-header'); // ant-pro-global-header

    return (
      <>
        <div className={className} style={style}>
          {this.renderCollapsedButton()}
          {
            middleContentRender
              ? middleContentRender(rest)
              : <div style={{ flex: 1 }} />
          }
          {rightContentRender && rightContentRender(rest)}
        </div>

        { bottomContentRender && bottomContentRender(rest) }
      </>
    );
  }
}
