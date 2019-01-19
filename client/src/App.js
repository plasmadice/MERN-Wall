import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import Home from "./components/Home";
import PostForm from "./components/PostForm";
import Post from "./components/Post";
import DisplayLinks from "./components/DisplayLinks";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
      posts: []
    };
  }
  componentDidMount() {
    axios.get("/auth/user").then(response => {
      console.log(response.data);
      if (!!response.data.user) {
        console.log("THERE IS A USER");
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });

    this.getPosts();
  }

  getPosts = () => {
    axios.get("/post/getposts").then(res => {
      this.setState({
        posts: res.data.allPosts
      });
    });
  };

  logOut = event => {
    event.preventDefault();
    console.log("logging out");
    axios.post("/auth/logout").then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  };

  logIn = (username, password) => {
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        }
      });
  };

  removePost = postId => {
    this.setState(state => {
      return { posts: state.posts.filter(post => post._id !== postId) };
    });
  };

  render() {
    const { user, loggedIn, posts } = this.state;

    return (
      <div className="App">
        <h1>This is the main App component</h1>
        <Header user={this.state.user} />
        {/* LINKS to our different 'pages' */}
        <DisplayLinks
          logOut={this.logOut.bind(this)}
          loggedIn={this.state.loggedIn}
        />
        {/*  ROUTES */}
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Home user={user} />
              <ul>
                {posts.map(post => {
                  return (
                    <Post
                      user={user}
                      post={post}
                      key={post._id}
                      removePost={this.removePost}
                    />
                  );
                })}
              </ul>
            </>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <LoginForm
              logIn={this.logIn.bind(this)}
              _googleSignin={this._googleSignin}
            />
          )}
        />
        <Route exact path="/signup" component={SignupForm} />
        {/* Create new posts */}
        {loggedIn && <PostForm getPosts={this.getPosts} />}
      </div>
    );
  }
}

export default App;
