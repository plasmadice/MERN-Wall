import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import Home from "./components/Home";
import PostForm from "./components/PostForm";
import Post from "./components/Post";
// import Database from "./components/Database";
// import Basic from "./components/Basic";

// const App = () => (
//   // <Router>
//   //   <div className="container">
//   //     <Link to="/">
//   //       <h1>Main Page</h1>
//   //     </Link>
//   //     <h2>Welcome, Guest</h2>
//   //     {/* <Link to="/database">Database</Link> */}
//   //     <Link to="/login">Login</Link>
//   //     {/* <Route exact path="/database" component={Database} /> */}
//   //     <Route exact path="/login" component={Basic} />
//   //   </div>
//   // </Router>
// );

const DisplayLinks = props => {
  if (props.loggedIn) {
    return (
      <nav className="navbar">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link" onClick={props._logout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              sign up
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
      posts: []
    };
    this._logout = this._logout.bind(this);
    this._login = this._login.bind(this);
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
      // TODO: remove this
      console.log(this.state);
    });
  };

  _logout(event) {
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
  }

  _login(username, password) {
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
  }

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
        <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
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
              _login={this._login}
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
