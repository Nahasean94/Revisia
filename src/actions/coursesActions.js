import {ADD_COURSE, CLEAR_COURSES, DELETE_COURSE, UPDATE_COURSE} from "../actions/types"


// export  function getCourses() {
//     return  localStorage.getItem("courses")
// }

export function addCourse(course) {
    return {
        type: ADD_COURSE,
        payload: course
    }
}

export function clearCourses() {
    return {
        type: CLEAR_COURSES,
        payload: []
    }
}

export function updateCourse(course) {
    return {
        type: UPDATE_COURSE,
        payload: course
    }
}

export function updateCourseList(course) {
    return {
        type: UPDATE_COURSE,
        payload: course
    }
}

export function removeCourse(course) {
    return {
        type: DELETE_COURSE,
        payload: course
    }
}