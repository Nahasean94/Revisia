import React from 'react'
import NewCourse from "./NewCourse"
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addCourse, clearCourses,} from "../../actions/coursesActions"
import Course from "./Course"

class Courses extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewCourseModal: false,

        }
        this.showNewCourseModal = this.showNewCourseModal.bind(this)
        this.closeNewCourseModal = this.closeNewCourseModal.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    showNewCourseModal(e) {
        e.preventDefault()
        this.setState({showNewCourseModal: true})
    }
    onChange(e) {
        const  courses  = JSON.parse(localStorage.getItem("courses"||"[]"))
        let arr_results = []
        this.props.clearCourses()
        for (let i = 0; i < courses.length; i++) {
            let exp =  new RegExp(e.target.value, 'i')
            if (courses[i].course.match(exp)) {
                arr_results.push(courses[i])
                this.props.addCourse(courses[i])
            }
        }
    }
    closeNewCourseModal() {
        this.setState({showNewCourseModal: false})
        // this.componentDidMount()
    }

    componentDidMount() {
        this.props.clearCourses()
        if(localStorage.getItem("courses"||"[]")){

        JSON.parse(localStorage.getItem("courses"||"[]")).map(course => {
            this.props.addCourse(course)
        })
        }

    }

    render() {
        const {showNewCourseModal} = this.state
        const {courses}=this.props
        return (<div>
            <button className="btn btn-sm btn-primary" onClick={this.showNewCourseModal}>New course</button>
            <br/>
            <br/>
            <form>
                <div className="input-group">
                    <input type="text" className="form-control"
                           placeholder="Search Course"
                           aria-label="Search Course" aria-describedby="basic-addon1"
                           onChange={this.onChange}/>
                    <span className="input-group-addon" id="basic-addon1"><i
                        className="fa fa-search"></i></span>
                </div>
            </form>
            <br/>
            <nav className="collapse bd-links" id="bd-docs-nav">
                {courses.length>0?
                   courses.map((course,i) => {
                        return <Course course={course} key={i}/>
                    }):'No courses found'}

            </nav>
            <NewCourse show={showNewCourseModal} onClose={this.closeNewCourseModal}/>

        </div>)
    }
}

Courses.propTypes = {
    addCourse: PropTypes.func.isReqired,
    clearCourses: PropTypes.func.isReqired
}

function mapStateToProps(state) {
    return {
        courses: state.coursesReducers
    }
}

export default connect(mapStateToProps, {addCourse,clearCourses})(Courses)