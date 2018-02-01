import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"


class Course extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: this.props.course
        }
    }

    render() {
        const link=`/course/${this.props.course.id}`
        return (
            <div className="bd-toc-item">
                <Link to={link} className="bd-toc-link"><h6>{this.props.course.course}</h6></Link>
            </div>
        )
    }
}

Course.propTypes = {
    course: PropTypes.object.isRequired
}


export default Course