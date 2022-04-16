import React from 'react';

export default (props) => {
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    
    //Cancel handler 
    function handleCancel(e) {
        e.preventDefault();
        cancel();
    }

    //Submit handler
    function handleSubmit(e) {
        e.preventDefault();
        submit();
    }

    
    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className='pad-bottom'>
                    <button className='button' type='submit'>{submitButtonText}</button>
                    <button className='button button-secondary' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

//Show any vaidation error if array it's not empty
function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div className='validation--errors'>
                <h3 className='validation--erros--label'>Validation Errors</h3>
                <div>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return errorsDisplay;
}