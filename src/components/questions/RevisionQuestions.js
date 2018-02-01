import React from 'react'
import QnA from "./QnA"
import Courses from "../courses/Courses"
import {Link} from "react-router-dom"

class RevisionQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: JSON.parse(localStorage.getItem("courses")),
            showNewQuestionModal: false,
            id: ''
        }

        this.showNewQuestionModal = this.showNewQuestionModal.bind(this)
        this.closeNewQuestionModal = this.closeNewQuestionModal.bind(this)
        // this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        const course_id = window.location.pathname.split('/')[2]
        console.log(course_id, this.state.courses)
        this.setState({
            course: this.state.courses.find(course => {
                return course.id === course_id
            })
        })
    }

    showNewQuestionModal(e) {
        e.preventDefault()
        this.setState({showNewQuestionModal: true})
    }

    closeNewQuestionModal(e) {
        this.setState({showNewQuestionModal: false})
    }


    render() {
        const { showNewQuestionModal} = this.state
const course=JSON.parse(localStorage.getItem("courses")).find(course => {
    return course.id ===window.location.pathname.split('/')[2]
})
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Courses/>
                    </div>
                    <div className="col-md-9">
                        <button className="btn btn-sm btn-success" onClick={this.showNewQuestionModal}>New Question
                        </button>
                        <Link to="/" className="btn btn-sm btn-warning">Home</Link>
                        <h2>{course.course}</h2>
                        <ol>
                            {course.questions.reverse().map((question,i)=>{
                                return (<li key={i}><strong>{question.question}</strong><br/><p>{question.answer}</p></li>)
                            })}
                        </ol>

                        <QnA show={showNewQuestionModal} onClose={this.closeNewQuestionModal} course={JSON.parse(localStorage.getItem("courses")).find(course => {
                            return course.id ===window.location.pathname.split('/')[2]
                        })}/>
                    </div>
                </div>
            </div>)
    }
}

export default RevisionQuestions