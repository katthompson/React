import React from 'react';
import states from './states.json';
import PropTypes from 'prop-types';

class SelectState extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {//console.log(this.props.reff);
    return (
      
      <select 
        id={this.props.id} 
        className={this.props.className}
        name={this.props.name}
        ref={this.props.reff}
        //value={this.props.value}
        onChange={this.props.onChange}
        required
        >
        {states.map(item => <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>)}
      </select>
    );
  }
}

const propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string
};

SelectState.propTypes = propTypes;

export default SelectState;
