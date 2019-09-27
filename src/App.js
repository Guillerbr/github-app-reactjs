import React, { Component } from 'react';
import Navbar from './Navbar';

import axios from 'axios';
import Profile from './Profile';
import Repo from './Repo';



class App extends Component {
  constructor() {
    super();
    this.state = {
      github: {
        url: "https://api.github.com/users",
        client_id: "c4b0891f235a6ebe4eee",
        client_secret: "aefb2e743322e58c2210efaf688fe3e2f98ea486",
        count: 16,
        sort: "created: asc"
      },
      user: [],
      repos: []
    };
  }

  //function
  getUser = (e) => {
    const user = e.target.value;

    const { url, client_id, client_secret, count, sort } = this.state.github;
    axios
      .get(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
      )
      .then(({ data }) => this.setState({ user: data }));
    axios
      .get(
        `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&cliente_secret=${client_secret}`
      )
      .then(({ data }) => this.setState({ repos: data }));

  };


//function 
  renderProfile = () => {

    const { user, repos } = this.state;
    return (
      <div className="row">
        <div className="col-md-4">
          <Profile user={user} />
        </div>
        <div className="col-md-8">
          {repos.map(repo => (
            <Repo key={repo.name} repo={repo} />
          ))}
        </div>

      </div>
    );
  }


//action
  render() {
    return (
      <div className="App">

        <Navbar />

        <div className="container">
          <div className="card card-body">
            <h1>Pesquisar Usuários</h1>
            <p className="lead">Digite um nome ou repositório</p>
            <input onChange={this.getUser} id="search" type="text" className="form-control" required />


          </div>

          {this.state.user.length !== 0 ? this.renderProfile() : null}
        </div>

      </div>
    );
  }
}


export default App;