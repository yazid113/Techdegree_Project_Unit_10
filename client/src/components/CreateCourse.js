import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from './Form';

export default function CreateCourse({ context }) {

    const [userId, setUserId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setUserId(context.authenticatedUser.id);
    },[context.authenticatedUser.id])


    //Cancel Handler
    const cancel = () => {
        navigate('/');
    }

    //Submit Handler
    const submit = () => {
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };
        
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        context.data.createCourse(course, emailAddress, password)
            .then(() => {
                console.log('Course has been created')
                navigate('/');
            })
            .catch (error => {
                if (error.response.status === 401) {
                    navigate('/forbidden');
                } else if (error.response) {
                    setErrors(error.response.data.errors)
                } else {
                    navigate('/error');
                }
            });
    }

    return(
        <>
            <div className="wrap">
                <h2>Create Course</h2>
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText='Create Course'
                    elements={() => (
                        <div className="main--flex">
                            <div>
                                <label>Course Title
                                <input
                                    id="courseTitle"
                                    name="courseTitle"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder='Course Title'
                                />
                                </label>
                                    <p>By: {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>
                                <label>Course Description
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        placeholder='Course Description'/>
                                </label>
                            </div>
                            <div>
                                <label>Estimated Time
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    value={estimatedTime}
                                    onChange={e => setEstimatedTime(e.target.value)}
                                    placeholder='Estimated Time'/>
                                </label>
                                <label>Materials Needed
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        value={materialsNeeded}
                                        onChange={e => setMaterialsNeeded(e.target.value)}
                                        placeholder='Materials Needed'/>
                                </label>
                            </div>
                        </div>)} />
            </div>
        </>
    )
}