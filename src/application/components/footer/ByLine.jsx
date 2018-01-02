/***
 * Copyright (c) 2016 - 2018 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';

import PropTypes from 'prop-types';

class ByLine extends React.Component {
  static get propTypes () {
    return {
      author: PropTypes.object.isRequired
    };
  }

  render () {
    const byLine = this.props.author.byLine.replace(
      ` ${this.props.author.name}`, ''
    );

    return (
      <div className="grid-row-spaced footer-line by-line">
        <span className="by-line-items">
          <span>
            {byLine}
          </span>
          <span>
            <a href={this.props.author.url} target="_blank">
              {this.props.author.name}
            </a>
          </span>
          <span>
            &copy;
          </span>
          <span>
            {(new Date()).getFullYear()}
          </span>
        </span>
      </div>
    );
  }
}

export default ByLine;
