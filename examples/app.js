import React, { Component } from 'react';
// import { extend as _extend } from 'lodash';

// SASS
import './scss/app';

// Data
import data from './data';

// TJ TreeView
import TreeView from 'react-tj-treeview';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData            : data,
      searchText          : undefined,
      highlightOnSearch   : true,
      collapseBeforeSearch: true
    };

    this.handleClick       = this.handleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleLiveSearch  = this.handleLiveSearch.bind(this);
  }

  render() {
    return (
      <div>
        <section className="cp">
          <h1 className="cp-title">Tree Component</h1>
          <div className="cp-wrap">
            <TreeView
              data={this.state.treeData}
              highlightOnSearch={this.state.highlightOnSearch}
              collapseBeforeSearch={this.state.collapseBeforeSearch}
              searchText={this.state.searchText}
              onClick={this.handleClick}
              onContextMenu={this.handleContextMenu}
            />
          </div>

          <div className="cp-actions">
            <div className="act">
              <h2 className="act-title">- onClick Event</h2>
              <div className="act-wrap">
                <span>textContent:</span>
                <span ref={(el) => this.clickTextEl = el} />
              </div>
            </div>

            <div className="act">
              <h2 className="act-title">- onContextMenu Event</h2>
              <div className="act-wrap">
                <span>textContent:</span>
                <span ref={(el) => this.contextTextEl = el} />
              </div>
            </div>

            <div className="act">
              <h2 className="act-title">- Search nodes (Live search)</h2>
              <ul className="act-wrap">
                <label>Name:</label>
                <input type="text" onKeyUp={this.handleLiveSearch} />
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /**
   * Return node element when click node
   * @param {object} evt
   */
  handleClick(evt) {
    const node = evt.target;

    this.clickTextEl.textContent = node.textContent;

    evt.stopPropagation();
  }

  /**
   * Return node element when right click node
   * @param {object} evt
   */
  handleContextMenu(evt) {
    evt.preventDefault();

    const node = evt.target;

    this.contextTextEl.textContent = node.textContent;
  }

  /**
   * Live search
   * @param {onject} evt
   */
  handleLiveSearch(evt) {
    evt.preventDefault();

    const
      inputEl = evt.target.parentElement.querySelector('input'),
      text    = inputEl.value;

    this.setState({
      searchText: text
    });

    evt.stopPropagation();
  }
};
