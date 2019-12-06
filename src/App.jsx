import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.scss';

const API = "https://jsonplaceholder.typicode.com/posts";

export default class App extends Component {
  state = {
    users: [],
    currentPageId: 0,
    itemsPerPage: 10,
    error: ''
  };

  onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const { username, password } = e.currentTarget;

    if (username && username.value.length && password && password.value.length) {
      axios.get(API).then(
        resp => {
          console.log("data===>", resp.data);
          this.setState({ users: resp.data, error: '' });
        },
        error => {
          this.setState({ error: error.message });
        }       
      );
    } else {
      this.setState({ error: 'Please enter valid username/password.'});
    }
  }

  onPrev = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ currentPageId: this.state.currentPageId - 1 });
  }

  onNext = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ currentPageId: this.state.currentPageId + 1 });
  }

  render() {
    const { users, error, currentPageId, itemsPerPage } = this.state;

    if (!users.length) {
      return (
        <form onSubmit={this.onSubmit}>
          <h1>Please enter the username and password</h1>
          <div><input type="text" placeholder="Enter Username" name = "username" /></div>
          <div><input type="password" placeholder=" Enter password" name = "password" /></div>
          <div><input type="submit" value="Search"/></div>
          <div className="error">{error}</div>          
        </form>
      );
    }

    const prevProps = {
      style: { float: 'left' },
      onClick: this.onPrev
    };

    if (currentPageId < 1) prevProps.disabled = 'disabled';

    const nextProps = {
      style: { float: 'right' },
      onClick: this.onNext
    };

    const itemStartIndex = (currentPageId * itemsPerPage);    

    if ((itemStartIndex + itemsPerPage) >= users.length) nextProps.disabled = 'disabled';

    return (
      <div>
        <p>User list</p>
        <table border="1">
          <thead><td>Id</td><td>UserId</td><td>Title</td><td>Body</td></thead>
          <tbody>
            {users.slice(itemStartIndex, itemStartIndex + itemsPerPage).map(user => <tr key={user.id}><td>{user.id}</td><td>{user.userId}</td><td>{user.title}</td><td>{user.body}</td></tr>)}
          </tbody>
        </table>
        <div className="actions">
          <button {...prevProps}>Previous</button>  
          <button {...nextProps}>Next</button>  
        </div>
      </div>
    );
  }
}
