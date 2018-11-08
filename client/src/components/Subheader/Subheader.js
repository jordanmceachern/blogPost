import React, { Component } from 'react'
import './Subheader.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Subheader extends Component {
    state = {
        aboutMeP: true,
        blogPostP: false,
        searchP: false,
        input: ""
    }
    
    toggleClass = stateKey => () => {
        this.setState({[stateKey]: !this.state[stateKey]})
    }

    changeHandler = event => {
        this.setState({input: event.target.value})
    }

    searchHandler = event => {
        event.preventDefault()
        this.props.loadposts(this.state.input)
    }

    render(){
        let AboutMe = ""
        if(this.state.aboutMeP===true){
            AboutMe = <div id="aboutMe">
                <div id="selfie">
                </div>
                <p>
                    My name is Jordan and I'm a developer. I first discovered my passion for coding during the second 
                    year of my degree in mechanical engineering, when I took a course called "CS 1003: Intro to 
                    Computer Programming". It didn't take long for me to start having fun, so much so that 
                    I spent the entirety of my March break completing extracurricular work. This bonus assignment 
                    was so challenging that only a small percentage of students successfully completed building 
                    the specified program, myself being one of them. This sparked a pattern for the rest of my 
                    degree, where I was always one of the funny ones who'd get excited over projects that 
                    required some code. Even during my post-grad work experience in engineering, I'd have the most
                    fun whenever I got the chance to write some macros with excel.
                </p>
                <p>
                    After a few years working in the engineering design industry, I expressed feelings of 
                    unfulfillment to a dear friend of mine who suggested I give web-development a try. Within 
                    a week of doing tutorials on freecodecamp.org, I made the investment in a new laptop that I 
                    then used to take several courses on udemy.com for over a year. During and after this 
                    period, I built many smaller apps to practice and get a firm understanding of what I'd 
                    learned. In September of 2018, I really wanted to have the experience of developing a full 
                    stack app to get a taste of the whole picture, which was how the origin of BlogPost came to be. 
                </p>
                <p>
                    I absolutely love this work, if I can even call it that. As proof, I took this background picture 
                    that you're currently viewing of my laptop, while sitting on the beach and coding during my vacation.... 
                    Sure, it can be frustrating to debug stubborn issues at times, but I consider that to be a part of 
                    the growing pains that with persistence, inevitably leads to the joy of solving the problem. As I 
                    practice and grow as a developer, I like the way my personality is taking shape as a result. I can't 
                    wait to see what else the future has in store for me while continuing on this journey. Coupled with 
                    my exercise habits and musical hobbies, I look forward to enjoying the positive effects that these 
                    cathartic feelings of fulfillment will bring to my life and the individuals I get to share it with.
                </p>
            </div>
        }
        const aboutMeKey = "aboutMeP"


        let BlogPost = ""
        if(this.state.blogPostP===true){
            BlogPost = <div id="blogPost">
                <p>
                    BlogPost was designed and developed to be a blog that serves as an outlet for anyone
                    to share their thoughts and feelings with others. Please feel free to express yourself 
                    and have a friendly conversation about anything you like. As the creator, I encourage 
                    you to be respectful and treat others as you would like to be treated. Anything that 
                    could be perceived as a malicious or cyber-bullying post or comment will be removed 
                    and deleted. I hope we can find and create a beautiful source of community together.
                </p>
                <p>
                    For any curious fellow web developers, I built this application primarily by using 
                    oauth, passport, redux, axios, react js, node js, express js, and mongoose/mongodb.
                </p>
            </div>
        }
        const blogPostKey = "blogPostP"


        let Search = ""
        if(this.state.searchP===true){
            Search = <div id="search">
                <form onSubmit={this.searchHandler}>
                    <input
                    autoFocus
                    type="text" 
                    placeholder="(CASE SENSITIVE)"
                    onChange={this.changeHandler}
                    value={this.state.input}/>
                    <input type="submit" value="find"/>
                </form> 
            </div>
        }
        const searchKey = "searchP"
        
        return(
            <div id="subheader">
                <p id="aboutMeP" onClick={this.toggleClass(aboutMeKey)}>About Me</p>
                {AboutMe}
                <p id="blogPostP" onClick={this.toggleClass(blogPostKey)}>What is BlogPost?</p>
                {BlogPost}
                <p id="searchP" onClick={this.toggleClass(searchKey)}>Search Content</p>
                {Search}
            </div>
        )
    }
}

export default connect(null, actions)(Subheader)