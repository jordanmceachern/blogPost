import React from 'react'
import './imageLoader.css'

class ImageLoader extends React.Component {
  state={
    loadSecond: false,
    loadFirst: false
  }

  componentDidMount(){
    const img = new Image()
    img.src = this.props.svg
    img.onload = () => {
        setTimeout(() => {
        this.setState({loadFirst: true})
        const img = new Image()
        img.src = this.props.url
        img.onload = () => {
        setTimeout(()=>this.setState({loadSecond: true}),2000)
        }
      },2000)
    }
  }
  render(){
    const src = 
    this.state.loadSecond ? 
    this.props.url : this.state.loadFirst ? 
    this.props.svg : this.props.lightsvg
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