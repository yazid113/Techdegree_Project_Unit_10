import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Courses({ context }) {
 const navigate = useNavigate();
 const [courses, setCourses] = useState([]);
 
// Use effect and useState hook
// Fetch data using axio
// seCourse to the fetch data
useEffect(() => {
     context.data.api('/courses')
         .then(response => {
              setCourses(response.data);
         })
         .catch(error => {
              console.log(error);
              navigate('/error')
            })
 }, [context.data, navigate]);

// Use map to display courses list
// Add the create course button
return (
<>
    <div className='wrap main--grid'>
        {courses.map( (course) => (
        <Link key={`${course.id}`} className='course--module course--link' to={`/courses/${course.id}`}>
            <h2 className='course--label'>Course</h2>
            <h3 className='course--title'>{course.title}</h3>
        </Link>
        ))}
        <Link className='course--module course--add--module' to='/courses/create'>
            <span className='course--add--title'>
            <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 13"
            className="add">
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
                New Course
            </span>
        </Link>
    </div>
</>
)
}

export default Courses;