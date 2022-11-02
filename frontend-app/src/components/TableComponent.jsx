import React from "react";

export default class TableComponent extends React.Component {
    render() {
        let anyDelete = this.props.data.filter(d => d.delete).length > 0;
        return (
        <table className="table">
            <thead className="thead-dark">
            <tr>
                {this.props.keys.map(k =>
                    <th scope="col" key={k}>{k.toUpperCase()}</th>
                )}
                {this.props.actions && this.props.actions.length || anyDelete ?
                    <th scope="col" key="Actions">Actions</th>
                 : null
                }
            </tr>
            </thead>
            <tbody>
            {
                this.props.data.map((d, index) =>
                    (<tr key={index}>
                        {this.props.keys.map(k =>
                            <td key={d[k]}>{d[k]}</td>
                        )}

                        {(this.props.actions || anyDelete) ?
                        <td key={`actons-${index}`}>
                            {this.props.actions.length ? this.props.actions.map((action, actionIndex) =>
                                <button key={`${this.props.actions[actionIndex]}-${index}`} type="button" className="btn btn-info mr-5" onClick={() => {this.props.actionsHandler[actionIndex](d.id);}} >
                                    {action}
                                </button>
                            ) : null}
                            {anyDelete && d.delete ?
                                <button key={`delete-${index}`} type="button" className="btn btn-danger" onClick={() => {this.props.deleteObject(d.id);}}>
                                    Delete
                                </button> : null
                            }
                        </td> : null}


                    </tr>)
                )
            }
            </tbody>
        </table>
        )
    }
}