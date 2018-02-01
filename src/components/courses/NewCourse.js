import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {isEmpty} from 'lodash'
import validator from 'validator'
import shortid from 'shortid'
import {addCourse} from "../../actions/coursesActions"

class NewCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: '',
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
        if (validator.isEmpty(data.course)) {
            errors.course = 'This field is required'
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
            const newCourse = {
                id: shortid.generate(),
                course: this.state.course,
                questions: []
            }
            if (!localStorage.getItem("courses"))
                localStorage.setItem("courses", "[]")
            let courses = JSON.parse(localStorage.getItem("courses" || "[]"))
            courses.push(newCourse)
            localStorage.setItem("courses", JSON.stringify(courses))
            this.props.addCourse(newCourse)
            this.setState({
                course: '',
                errors: {},
                isLoading: false,
                invalid: false
            })
        }
        this.props.onClose()
    }


    render() {
        const {show, onClose} = this.props
        const {course, isLoading, invalid, errors} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>New Course</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Course Name"
                                type="text"
                                name="course"
                                value={course} autoFocus={true}
                                onChange={this.onChange}
                                error={errors.course}
                            />
                            <div className="form-group row">
                                <div className="col-sm-3 col-form-label"></div>

                                <div className="col-sm-9">
                                    <button disabled={isLoading || invalid}
                                            className="btn btn-primary btn-sm form-control"
                                            type="submit">Save
                                    </button>
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

NewCourse.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    addCourse: PropTypes.func.isRequired,
}

export default connect(null, {addCourse})(NewCourse)
