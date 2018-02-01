import React from 'react'
import Courses from "./courses/Courses"
import QnA from "./questions/QnA"
import Revise from "./questions/Revisia"


class HomePage extends React.Component {
    render() {
        return (<div className="container-fluid">
            <div className="row">
                <Revise/>
            </div>
        </div>)
    }
}

export default HomePage