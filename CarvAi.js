import React from 'react';
import './CarvAi.css';

export default class CarvAi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        translate3d: {
            x: 0,
            y: 0,
            z: 0,
        },
        container: {
            width: 0,
            height: 0
        }
    }

    this.updateDimensions = this.updateDimensions.bind(this);
    this.updateTranslate = this.updateTranslate.bind(this);
  }

  updateDimensions() {
    const dimensions = this._container.getBoundingClientRect();

    this.setState({
        container: {
            width: dimensions.width,
            height: dimensions.height
        }
    })
  }

  updateTranslate() {
    let {translate3d} = this.state;
    const {scrollY} = window;
    const dimensions = this._container.getBoundingClientRect();

    translate3d.z = (dimensions.top / dimensions.bottom) * 10; //scrollY / dimensions.height;
    translate3d.y = dimensions.height / 3;

    this.setState({
        translate3d: translate3d
    })
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('scroll', this.updateTranslate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    window.addEventListener('scroll', this.updateTranslate);
  }

  render() {
    const {container, translate3d} = this.state;

    return (
        <div className='box' ref={_e => this._container = _e}>
            <img 
                className='background'
                src='https://carv.ai/img/photo/mountains-background.jpg'
                style={{
                    width: `${container.width}px`,
                    height: `${container.height}px`,
                    transform: `translate3d(${translate3d.x}px, -${translate3d.y}px, ${translate3d.z}px)`
                }} />
            <img 
                className='center'
                src='https://carv.ai/img/photo/mountains-center.png'
                style={{
                    width: `${container.width}px`,
                    height: `${container.height}px`,
                    transform: `translate3d(${translate3d.x}px, -${translate3d.y}px, ${translate3d.z * 50}px)`
                }} />
            <img 
                className='foreground'
                src='https://carv.ai/img/photo/mountains-foreground.png'
                style={{
                    width: `${container.width}px`,
                    height: `${container.height}px`,
                    transform: `translate3d(${translate3d.x}px, -${translate3d.y}px, ${translate3d.z * 100}px)`
                }} />
        </div>
    );
  }
}
