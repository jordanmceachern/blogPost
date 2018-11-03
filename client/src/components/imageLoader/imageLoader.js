import React from 'react'
import './imageLoader.css'

class ImageLoader extends React.Component {
  state={
    loadFirst: false
  }

  componentDidMount(){
    const img = new Image()
    img.src = this.props.jpg
    img.onload = () => {this.setState({loadFirst: true})}
  }
  
  render(){
    const src = 
    this.state.loadFirst ? this.props.jpg : this.props.svg
    return (
          <div 
            className="background"
            style={{background: `center / cover no-repeat url(${src})`}}> 
            { this.props.children }
          </div>
    )
  }
}

export default ImageLoader