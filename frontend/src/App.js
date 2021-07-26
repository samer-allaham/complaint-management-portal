
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

// import React, { useEffect,useState  } from 'react'


// const tasks = [
//   {
//     id: 1,
//     title: "test1",
//     description: "some lorem epssum :)",
//     completed: false

//   },
//   {
//     id: 2,
//     title: "test2",
//     description: "some lorem epssum :)",
//     completed: true
//   },

//   {
//     id: 3,
//     title: "test3",
//     description: "some lorem epssum :)",
//     completed: false

//   }

// ]


class App extends React.Component {




  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      status:0,
      userId:1,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        userCreating:1,
      },
      

      taskList: []
    };
  }

  checkLoginStatus() {

    axios
      .get('https://cmpbackend.herokuapp.com/api/auth/user/', { withCredentials: true })
      .then(res => {
        console.log(res);
        if (res.data.name) {
          this.setState({
            loggedIn: true,
            user: res.data.name,
            status:res.data.status,
            userId:res.data.id
          })
          console.log(this.state);
          // console.log(res.data.status);
          console.log(this.state.status);

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



  refreshList = () => {
    axios
      .get('https://cmpbackend.herokuapp.com/api/tasks/')
      .then(res => {this.setState({ taskList: res.data })
    console.log(res);})

      .catch(err => console.log(err))
  }



  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true })
    } else {
      return this.setState({ viewCompleted: false })
    }
  }



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

    console.log('liiiiiist',this.state.taskList);
    console.log('liiiiiist',newItems);

    let roleBased;

    if (this.state.status===2) {
      roleBased=(newItems.map(item => (
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
      
    }else{
      let filter = {
        user: this.state.userId
      };
      let tickets = newItems
      console.log('new items',tickets);
      
      let finalTickets;
      
      finalTickets= tickets.filter(function(item) {
        for (let key in filter) {
          console.log(key,filter);
          if (item[key] === undefined || item[key] != filter[key])
            return false;
        }
        return true;
      });

      console.log('finaaaaaaaal',finalTickets);
      roleBased=(
        
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
            {/* <button onClick={() => this.handleDelete(item)} className="btn btn-danger mr-2">
              Delete
            </button> */}
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

  handleSubmit = item => {
    this.toggle()
    item.userCreating=this.state.userId
    console.log("inside handle submitt",item);
    if (item.id) {
      axios
        .put(`https://cmpbackend.herokuapp.com/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList())
      return;
    }
    axios
      .post("https://cmpbackend.herokuapp.com/api/tasks/", item)
      .then(res => this.refreshList())
  }

  handleDelete = item => {
    axios
      .delete(`https://cmpbackend.herokuapp.com/api/tasks/${item.id}/`)
      .then(res => this.refreshList())
  }

  createItem = () => {
    const item = { title: "", modal: !this.state.modal ,user:this.state.userId}

    this.setState({ activeItem: item, modal: !this.state.modal, })
    
    console.log('inside create',item);
  }

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  onChange = (newName) => {

    this.setState({ user: newName });
  }

  onAnotherChange = (newStatus) => {

    this.setState({ status: newStatus });
  }
  onCreateChange = (newStatus) => {

    this.setState({ userId: newStatus });
    console.log('iddddddddddddddd',this.state.userId);
  }


  render() {
    const test = this.state.user
    console.log('tessssst', test);


    let menu;
    if (this.state.user === '') {
      menu = (<Route path="/" exact component={() => <Home name={test} />} />)
    } else {

      let roleBased;

      if (this.state.status===1) {
        roleBased=(<button onClick={this.createItem} className="btn btn-primary">
        Add Ticket
      </button>)
      }else if(this.state.status===2){
        roleBased=( <h3>Dashboard</h3>)
      }

      menu = (
        <main className="content p-3 mb-2 bg-dark">
          <h1 className="text-white text-uppercase text-center my-4">
            Complaint Manegment system

          </h1>

          <div className="row">
            <div className="col-md-6 col-sma-10 mx-auto  p-0">
              <div className="card p-3">
                <div>
                  {/* <button onClick={this.createItem} className="btn btn-primary">
                    Add Ticket
                  </button> */}
                  {roleBased}
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush">
                  {this.renderItems()}

                </ul>

              </div>

            </div>

          </div>
          <footer className="my-5 mb-3 bg-light text-dark text-center">
            &copy; 2021 Copyrights

          </footer>

          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
              status={this.state.status}
            />
          ) : null}

        </main>
      )

    }



    let loginView;


    if (this.state.user === '') {
      loginView = (<Route path="/login" component={() => <Login name={test} onNameChange={this.onChange} onIdChange={this.onCreateChange} onRoleChange={this.onAnotherChange} />} />)
    } else {

      loginView = (<Route path="/" exact component={() => <Home name={test} />} />
      )

    }

    let registerView;


    if (this.state.user === '') {
      registerView = (  <Route path="/register" component={Register} />)
    } else {

      registerView = (<Route path="/" exact component={() => <Home name={test} />} />
      )

    }









    return (
      <div className="App">
        <BrowserRouter>
          <Nav name={test} onNameChange={this.onChange}></Nav>



          <main className="form-signin">

            {/* <Route path="/" exact component={Home}/> */}
            {/* <Route path="/" exact component={() => <Home name={test} />} /> */}
            {menu}

            {/* <Route path="/login" component={Login} onNameChange={this.onChange}/> */}

            {/* <Route path="/login" component={() => <Login name={test} onNameChange={this.onChange} />} /> */}
            {loginView}

            {registerView}


            {/* <Route path="/register" component={Register} /> */}



          </main>
        </BrowserRouter>
      </div>

    )
  }
}

export default App;





// <main className="content p-3 mb-2 bg-dark">
//       <h1 className="text-white text-uppercase text-center my-4">
//         Complaint Manegment system

//       </h1>

//       <div className="row">
//         <div className="col-md-6 col-sma-10 mx-auto  p-0">
//           <div className="card p-3">
//             <div>
//               <button onClick={this.createItem} className="btn btn-primary">
//                 Add Ticket
//               </button>
//             </div>
//             {this.renderTabList()}
//             <ul className="list-group list-group-flush">
//               {this.renderItems()}

//             </ul>

//           </div>

//         </div>

//       </div>
//       <footer className="my-5 mb-3 bg-light text-dark text-center">
//         &copy; 2021 Copyrights

//       </footer>

//       {this.state.modal ? (
//           <Modal
//             activeItem={this.state.activeItem}
//             toggle={this.toggle}
//             onSave={this.handleSubmit}
//           />
//         ) : null}

//     </main>
