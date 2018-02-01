import React from 'react'
import Courses from "../courses/Courses"

class Revisia extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Courses/>
                    </div>
                    <div className="col-md-9">
                        <h1>Revisia Exam na CAT</h1>
                    </div>
                </div>
            </div>)
    }
}

export default Revisia