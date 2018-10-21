import React from 'react'
import './imageLoader.css'

class ImageLoader extends React.Component {
  state={
    loadFirst: false
  }

  componentDidMount(){
    const img = new Image()
    img.src = this.props.png
    img.onload = () => {this.setState({loadFirst: true})}
  }
  
  render(){
    const src = 
    this.state.loadFirst ? this.props.png : this.props.svg
    return (
        <video 
          autoPlay
          loop
          muted
          className="video">
          <source src={this.props.mp4} type="video/mp4"/>
          <div 
            className="background"
            style={{background: `center / cover no-repeat url(${src})`}}> 
            { this.props.children }
          </div>
        </video>
    )
  }
}

export default ImageLoader