import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {isEmpty} from 'lodash'
import validator from 'validator'
import shortid from 'shortid'
import {addCourse} from "../../actions/coursesActions"

class QnA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer:'',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.question)) {
            errors.question = 'This field is required'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            const newQuestion = {
                id: shortid.generate(),
                question: this.state.question,
                answer: this.state.answer,
            }
            let courses = JSON.parse(localStorage.getItem("courses"))
            // courses.push(newCourse)
            // localStorage.setItem("courses", JSON.stringify(courses))
            // this.props.addCourse(newCourse)
           let course= courses.find(course => {
                return course.id ===this.props.course.id
            })
            let questions=course.questions
            questions.push(newQuestion)
            localStorage.setItem("courses", JSON.stringify(courses))
            this.setState({
                question: '',
                answer:'',
                errors: {},
                isLoading: false,
                invalid: false
            })
        }
        this.props.onClose()
    }


    render() {
        const {show, onClose,course,question,answer} = this.props
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>New Question</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="question">Question</label>
                                <input type="text" className="form-control" id="question" value={question} name="question" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="answer">Answer</label>
                                <textarea className="form-control" id="answer" rows={10} value={answer} name="answer" onChange={this.onChange}/>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-sm btn-primary form-control" >Save</button>
                                </div>
                                <div className="col-sm-6">
                                    <button className="btn btn-sm btn-dark form-control">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }
}

QnA.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    course:PropTypes.object.isRequired,

}

export default connect(null, {})(QnA)
