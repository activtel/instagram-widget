import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'font-awesome/css/font-awesome.css';
import './instagramWidget.css';
import Photo from './photo';

class InstagramWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    }
  }

  componentDidMount() {
    let url = this.getUrl(this.props.endpoint, this.props.id)
    this.fetchPhotos(url);
  }

  fetchPhotos(url) {
    axios
      .get(url)
      .then((result) => {
        this.setState({
          photos: result.data.data
        })
      })
  }

  getUrl(endpoint, id) {
    const baseUrl = `https://api.instagram.com/v1/`;
    let segment = '';

    switch(endpoint) {
      case 'users':
        segment = `users/${id}/media/recent/`;
        break;
      case 'media':
        segment = `media/${id}`;
        break;
      case 'tags':
        segment = `tags/${id}/media/recent`;
        break;
      case 'locations':
        segment = `locations/${id}/media/recent`;
        break;
      default:
        segment = `users/self/media/recent/`;
        break;
    }

    return `${baseUrl}${segment}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`;
  }

  getPhotos() {
    return this.state.photos
      .slice(this.props.skip, this.props.take)
      .map((photo, key) => <Photo photo={photo} resolution={this.props.resolution} key={photo.id}/>);
  }

  render() {
    return (
      <div className="widget">
        <header className="header">
          <h1 className="title"><i className="fa fa-instagram" aria-hidden="true"></i> {this.props.header}</h1>
        </header>
        <div className="body">
          {this.getPhotos()}
        </div>
      </div>
    );
  }
}

InstagramWidget.propTypes = {
  header: PropTypes.string, // заголовок виджета
  endpoint: PropTypes.oneOf(['users', 'media', 'tags', 'locations']), // тип получаемых данных
  id: PropTypes.string, // идентификатор получаемых данных
  skip: PropTypes.number, // номер фото, с которого начинается отображение
  take: PropTypes.number, // количество фото
  resolution: PropTypes.oneOf(['thumbnail', 'low_resolution', 'standard_resolution']) // размер изображения
};

InstagramWidget.defaultProps = {
  header: 'Instagram Widget',
  endpoint: 'users',
  id: 'self',
  skip: 0,
  take: 10,
  resolution: 'low_resolution'
};

export default InstagramWidget;
