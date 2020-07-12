import React, { Component } from 'react';
import deleteB from "./delete.png";
import editB from "./edit.png";
import watchB from "./watch.png";
class Table extends Component {

    cannotEdit = username => username !== this.props.username && this.props.username !== "מנהל"
    onShow = i => this.props.setTask(i)
    onEdit = i => this.props.setTaskEdit(i)
    onDelete = i => this.props.setTaskDelete(i)
    async componentDidMount() {
        await this.props.getAllTasks();

        // this.setState(Forbs)
        // let { data: ForbsFirst } = await axios.get("http://localhost:5000/1");
        // console.log('ForbsFirst', ForbsFirst)
        // let { data: ForbsUpdate } = await axios.put("http://localhost:5000/1/update");
        // console.log('ForbsUpdate', ForbsUpdate)
        // let { data: ForbsDelete } = await axios.delete("http://localhost:5000/1/delete");
        // console.log('ForbsDelete', ForbsDelete)
        // let { data: ForbsCreate } = await axios.post("http://localhost:5000/1/create");
        // console.log('ForbsCreate', ForbsCreate)


    }


    render() {

        // console.log('this.state.Forbs', this.state.Forbs)
        const rows =
            this.props.Forbs.map((forb, index) => {
                forb.class = "center-image"
                if (this.cannotEdit(forb.username)) forb.class += " c-not-allowed"
                return (
                    <tr key={forb.id} className="tr-right" >
                        <td><span>{forb.username}</span></td>
                        <td><span>{forb.tel}</span></td>
                        <td><span>{forb.date}</span></td>
                        <td><span>{forb.email}</span></td>
                        <td>

                            <div className="row" style={{ 'fontSize': '10px' }}  >
                                <div className="column col-avatar  ">
                                    <img src={watchB} alt="Snow" onClick={!index ? null : () => this.onShow(forb.id)} className="center-image" />
                                    <p className="text-center">צפייה</p>
                                </div>
                                <div className="column col-avatar">
                                    <img src={editB} alt="עריכה" onClick={() => !index || this.cannotEdit(forb.username) ? null : this.onEdit(forb.id)} className={forb.class} />
                                    <p className="text-center">עריכה</p>
                                </div>
                                <div className="column col-avatar">
                                    <img src={deleteB} onClick={() => !index || this.cannotEdit(forb.username) ? null : this.onDelete(forb.id)} className={forb.class} alt="מחיקה" />
                                    <p className="text-center">מחיקה</p>
                                </div>
                            </div>
                        </td>
                    </tr >)
            });



        return (
            <div className="card" >
                <div className="card-header">
                    <div className="float-right">
                        <span className="right-table-title">רשימת הלקוחות שלך</span>
                    </div>
                    <a onClick={() => this.onEdit(0)} className="btn btn-success float-left">משימה חדשה</a>

                </div>
                <div className="card-body">


                    <table className="table table-hover" dir="rtl">

                        <thead className="thead-dark" >
                            <tr>
                                <th><div className="float-right">שם משתמש</div></th>
                                <th><div className="float-right">טלפון</div></th>
                                <th><div className="float-right">תאריך</div></th>
                                <th><div className="float-right">מייל</div></th>
                                <th><div className="float-right">פעולות</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}
export default Table;