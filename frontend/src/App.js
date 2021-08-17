
// import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Nav from './components/Nav';
import Modal from './components/Modal';
import { BrowserRouter, Route } from
  'react-router-dom'


class App extends React.Component {




  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      loggedIn: false,
      user: '',
      status: 0,
      userId: 1,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        userCreating: 1,
      },


      taskList: []
    };
  }

  // checking if the user is logged in to change the state
  checkLoginStatus() {

    axios
      .get('https://cmpbackend.herokuapp.com/api/auth/user/', { withCredentials: true })
      .then(res => {

        if (res.data.name) {
          this.setState({
            loggedIn: true,
            user: res.data.name,
            status: res.data.status,
            userId: res.data.id
          })


        } else if (!res.name) {
          this.setState({
            loggedIn: false,
            user: '',
          })

        }
      })
      .catch(error => {
        console.log(error);
      })

  }




  componentDidMount() {
    this.checkLoginStatus()

    this.refreshList()
  }



  // refreshing the list of tasks
  refreshList = () => {
    axios
      .get('https://cmpbackend.herokuapp.com/api/tasks/')
      .then(res => {
        this.setState({ taskList: res.data })

      })

      .catch(err => console.log(err))
  }



  // will set the viewCompleted based on the argument
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true })
    } else {
      return this.setState({ viewCompleted: false })
    }
  }



  // making a className based on the state of viewCompleted and rendering the two spans
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span onClick={() => this.displayCompleted(true)} className={this.state.viewCompleted ? "active" : ""}>
          Resolved
        </span>
        <span onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}>
          Pending
        </span>

      </div>
    )
  }



  // rendring items in the list(completed,incomleted)
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );

    let roleBased;

    // showing the content based on the status of the user 2 is Admin 1 is Customer
    if (this.state.status === 2) {
      roleBased = (newItems.map(item => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={item.id}
        >
          <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
            title={item.description}>
            {item.title}
          </span>

          <span>
            <button onClick={() => this.editItem(item)} className="btn btn-info mr-2">
              Edit
            </button>
            <button onClick={() => this.handleDelete(item)} className="btn btn-danger mr-2">
              Delete
            </button>
          </span>

        </li>

      )))

    } else {
      // filtering the tickets to only show the tickets related to the logged in user
      let filter = {
        user: this.state.userId
      };
      let tickets = newItems


      let finalTickets;

      finalTickets = tickets.filter(function (item) {
        for (let key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
            return false;
        }
        return true;
      });

      // for the customer we wont give him the delete button
      roleBased = (

        finalTickets.map(item => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={item.id}
          >
            <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
              title={item.description}>
              {item.title}
            </span>

            <span>
              <button onClick={() => this.editItem(item)} className="btn btn-info mr-2">
                Edit
              </button>
            </span>

          </li>

        )))
    }

    return roleBased


  };



  // create toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  // submitting a new ticket or task
  handleSubmit = item => {
    this.toggle()
    item.userCreating = this.state.userId
    // if it exists update it
    if (item.id) {
      axios
        .put(`https://cmpbackend.herokuapp.com/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList())
      return;
    }
    // if not create a new one
    axios
      .post("https://cmpbackend.herokuapp.com/api/tasks/", item)
      .then(res => this.refreshList())
  }

  // deleteing a ticket or task
  handleDelete = item => {
    axios
      .delete(`https://cmpbackend.herokuapp.com/api/tasks/${item.id}/`)
      .then(res => this.refreshList())
  }

  // creating a new ticket or task
  createItem = () => {
    const item = { title: "", modal: !this.state.modal, user: this.state.userId }

    this.setState({ activeItem: item, modal: !this.state.modal, })

  }

  // editing a ticket
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  // a call back function that is passed for the Login and the Nav to change the state of the user name
  onChange = (newName) => {

    this.setState({ user: newName });
  }

  // a call back function that is passed for the Login to change the state of the role
  onAnotherChange = (newStatus) => {

    this.setState({ status: newStatus });
  }

  // a call back function that is passed for the Login to change the state of the id which from it we will change what appears on the screen for each type of user
  onCreateChange = (newStatus) => {

    this.setState({ userId: newStatus });
  }


  render() {
    const userName = this.state.user


    // show content based if the user is logged in or not
    let menu;
    if (this.state.user === '') {
      menu = (<Route path="/" exact component={() => <Home name={userName} />} />)
    } else {

      // show content based if the user is admin or not
      let roleBased;


      if (this.state.status === 1) {
        roleBased = (<button onClick={this.createItem} className="btn btn-primary">
          Add Ticket
        </button>)
      } else if (this.state.status === 2) {
        roleBased = (<h3>Dashboard</h3>)
      }

      menu = (
        <div className="content p-3 mb-2 bg-dark">


          <div className="row">
            <div className="col-md-6 col-sma-10 mx-auto  p-0">
              <div className="card p-3">
                <div>
                  {roleBased}
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush">
                  {this.renderItems()}

                </ul>

              </div>

            </div>

          </div>

          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
              status={this.state.status}
            />
          ) : null}

        </div>
      )

    }



    // redirect to home page if the user is logged in and tries to go to /login again
    let loginView;


    if (this.state.user === '') {
      loginView = (<Route path="/login" component={() => <Login name={userName} onNameChange={this.onChange} onIdChange={this.onCreateChange} onRoleChange={this.onAnotherChange} />} />)
    } else {

      loginView = (<Route path="/" exact component={() => <Home name={userName} />} />
      )

    }

    // redirect to home page if the user is logged in and tries to go to /register again
    let registerView;


    if (this.state.user === '') {
      registerView = (<Route path="/register" component={Register} />)
    } else {

      registerView = (<Route path="/" exact component={() => <Home name={userName} />} />
      )

    }









    return (
      <div className="App">
        <div  className="d-flex flex-column min-vh-100">
          


        <BrowserRouter>
          <Nav name={userName} onNameChange={this.onChange}></Nav>



          <main >
            {menu}

            <div className="form-signin">

              {loginView}

              {registerView}

            </div >





          </main>
        </BrowserRouter>
        <footer className="footer mt-auto py-3 bg-dark text-white">
          &copy; 2021 Copyrights

        </footer>

        </div>
      </div>

    )
  }
}

export default App;


