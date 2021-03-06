import React, { Component } from 'react'
import './home.css'
import { Typography, Input, Button, TextField } from '@material-ui/core';
import Post from '../Post/Post'
import { connect } from 'react-redux'
import { createPost, fetchPosts } from '../../redux/actions'
import { NavLink } from 'react-router-dom'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  changeInput = (event) => {
    this.setState(() => ({
      [event.target.name]: event.target.value
    }))
  }
  handlerSubmit = event => {
    event.preventDefault();
    const { title, description } = this.state;
    const newPost = {
      title, description
    }
    this.props.createPost(newPost)
    this.setState({
      title: '',
      description: '',
    })
    
  }
  componentWillReceiveProps(next){
    if(next.postsList !== this.props.postsList){
      this.props.fetchPosts();
    }
  }


  render() {
    const postsList = this.props.postsList.slice(0, 20);
    const res = postsList.length ? (postsList.map(post => {
      return (
        <NavLink className="no-style" key={post.id} to={{ 
          pathname:`/posts/${post.id}`,
          id: post.id,
        }}>
          <Post post={post} key={post.id}></Post>
        </NavLink>
      )
    })) : <Typography style={{ gridColumn: '2/3', textAlign: 'center' }} color='secondary'>Нет постов</Typography>
    return (
      <div>


        <form className='add-form' onSubmit={this.handlerSubmit}>
          <Typography variant='h5'>Create a new post</Typography>
          <Input color='primary'
            placeholder='Title'
            required={true}
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.changeInput}
          ></Input>
          <TextField
            color='primary'
            name='description'
            label="Description"
            required={true}
            helperText="Add description to your post"
            variant="filled"
            value={this.state.description}
            onChange={this.changeInput}
          />
          <Button type='submit' style={{ width: '25%' }} variant="contained" color="primary">Create</Button>
        </form>

        <Typography id='posts-count'>The number: {postsList.length}</Typography>
        <div className='all-posts'>
          {res}
        </div>
      </div>


    )
  }

}
const mapStateToProps = state => {
  return {
    postsList: state.posts.posts
  }
}
const mapDispatchToProps = {
  createPost, fetchPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
