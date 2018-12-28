import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './photo.css';
import 'font-awesome/css/font-awesome.css';

class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false
    }

    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }    
          
  mouseEnter() {
    this.setState({ showDescription: true })
  }
 
  mouseLeave() {
    console.log('dsf');
    this.setState({ showDescription: false })
  }

  getDescription() {
    const photo = this.props.photo;
    return(
      <div>
        {photo.user.full_name}
        <br />
        {photo.caption !== null ? photo.caption.text : ''}
      </div>
    )
  }
  render() {
    const photo = this.props.photo;
    
    return (
      <div key={photo.id} className='photo' onMouseLeave={this.mouseLeave} onMouseEnter ={this.mouseEnter}>
        <img src={photo.images[this.props.resolution].url} alt=''/>
        <div className={this.state.showDescription ? 'description show' : 'description'}>
          <h4>{this.props.photo.user.username}</h4>
          {this.getDescription()}
        </div>
      </div>
    );
  }
}

Photo.propTypes = {
  photo: PropTypes.object,
};

export default Photo;
