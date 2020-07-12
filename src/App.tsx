import { message } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import './App.css';
import DeleteConfirm from "./components/DeleteConfirm";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import TaskShow from "./components/TaskShow";
class App extends Component {
  state = { TaskComponent: false, edit: false, forb: { id: 0 }, delete: false, Forbs: [], username: "עמיר", illegalAction: false }

  setIllegalAction = (illegalAction: boolean) => this.setState({ illegalAction })
  setUser = (username: string) => this.setState({ username, TaskComponent: false, delete: false })
  getAllTasks = async () => {
    this.setState({ delete: false })
    let { data: Forbs } = await axios.get(`${this.url()}all`);
    this.setState({ Forbs })
    return Forbs;
  }
  url = () => process.env.NODE_ENV === "development" ? "http://localhost:5000/" : window.location.href
  info = (msg: String) => {
    message.info(msg);
  };
  success = (msg: String) => {
    message.success(msg);
  };
  error = (msg: String) => {
    message.error(msg);
  };
  deleteConfirm = async (id: number) => {

    //http://localhost:5000
    try {
      let { data: ForbsDelete } = await axios.delete(`${this.url()}${id}/delete`);
      this.info('רשימה נמחקה')
      console.log('ForbsDelete', ForbsDelete)
      this.getAllTasks()
      this.setState({ edit: false })
      this.setState({ delete: false })
    } catch (error) {
      console.error(error)
      this.error('מחיקה לא בוצעה כראוי')
    }
  }
  setTaskEdit = (i: any) => {
    this.setState({ TaskComponent: i })
    this.setState({ edit: true, delete: false })

  }
  setTaskDelete = (i: any) => {

    console.log('i', i)
    this.setState({ edit: false, delete: i })
    this.setState({ forb: this.state.Forbs[i] })
  }
  setTask = (id: any) => {
    this.setState({ TaskComponent: id })
    if (!id) this.setState({ TaskComponent: id, forb: this.state.Forbs[0] })
    this.setState({ edit: false })
    this.setState({ delete: false })
  }
  setForb = (forb: Object) => this.setState({ forb })
  setForbs = (Forbs: Array<any>) => this.setState({ Forbs })

  onChange = (key: any, value: any) => {
    // console.log('key', key)
    // return console.log('value', value)
    let forb: any = { ...this.state.forb }
    forb[key] = value
    this.setState({ forb })
    console.log('forb', forb, this.state.forb)
    // console.log('key', key, 'value', value)
  }

  render() {

    let deleteConfirmModal = <DeleteConfirm
      deleteConfirm={this.deleteConfirm}
      delete={this.state.delete}
      forb={this.state.forb}
      url={this.url()}
      setTaskDelete={this.setTaskDelete} />

    if (!this.state.delete) deleteConfirmModal = <span></span>;

    const mainWindow = this.state.TaskComponent !== false ?
      <TaskShow setTask={this.setTask}
        Forbs={this.state.Forbs}
        username={this.state.username}
        error={this.error}
        url={this.url()}
        success={this.success}
        setForb={this.setForb}
        forb={this.state.forb}
        onChange={this.onChange}
        TaskComponent={this.state.TaskComponent}
        edit={this.state.edit} />
      : <Table
        setIllegalAction={this.setIllegalAction}
        url={this.url()}
        username={this.state.username}
        getAllTasks={this.getAllTasks}
        Forbs={this.state.Forbs}
        setForbs={this.setForbs}
        setTaskDelete={this.setTaskDelete}
        setTask={this.setTask}
        setTaskEdit={this.setTaskEdit} />



    return <div>
      <Navbar username={this.state.username}
        setUser={this.setUser} />
      <div className="container mt-4">
        <h1>Task Assignment Amir Lifshitz</h1>
        {/* {this.state.illegalAction && !this.state.TaskComponent ? <span>ILLEGAL ACTION</span> : null} */}
        {mainWindow}
        {deleteConfirmModal}
      </div>
    </div>

  }

}



export default App;
