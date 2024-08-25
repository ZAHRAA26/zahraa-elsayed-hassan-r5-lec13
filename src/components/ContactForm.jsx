import React, { useState } from 'react';
import * as yup from 'yup';
import './ContactForm.css'
// Define your validation schema
const userSchema = yup.object().shape({
    firstName: yup.string().matches(/^[A-Za-z]+$/, 'First name must contain only letters') // Regular expression to allow only letters
        .min(4, 'First name must be at least 4 characters long')
        .required('First name is required'),
    lastName: yup.string().matches(/^[A-Za-z]+$/, 'First name must contain only letters').required('Last name is required'),
    email: yup.string().matches(/@.*\./, 'Email must contain "@" and "."').email('Invalid email address').required('Email is required'),
    queryType: yup.string().oneOf(['General Enquiry', 'Support Request'], 'Query type is required').required('Query type is required'),
    message: yup.string().min(100, 'Message must be at least 100 characters long').max(1000, 'Message cannot exceed 1000 characters').required('Message is required'),
    consent: yup.boolean().oneOf([true], 'You must consent to proceed').required('Consent is required')
});

export default function ContactForm() {
    const [errorObject, setErrorObject] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        queryType: '',
        message: '',
        consent: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = async () => {
        try {
            await userSchema.validate(formData, { abortEarly: false });
            setErrorObject({}); // Clear errors if validation is successful
        } catch (err) {
            const errors = {};
            err.inner.forEach((error) => {
                errors[error.path] = error.message;
            });
            setErrorObject(errors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await validateForm();
    };

    return (
        <form onSubmit={handleSubmit} className='formContainer'>
            <h1>Contact Us</h1>
            <div className='d-row'>
                <div className='d-column'>
                    <label htmlFor='firstName'>First Name <span>*</span></label>
                    <input
                        id='firstName'
                        type='text'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errorObject.firstName && <p className="error">{errorObject.firstName}</p>}
                </div>
                <div className='d-column'>
                    <label htmlFor='lastName'>Last Name <span>*</span></label>
                    <input
                        id='lastName'
                        type='text'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errorObject.lastName && <p className="error">{errorObject.lastName}</p>}
                </div>
            </div>
            <div className='d-column w-100'>
                <label htmlFor='email'>Email Address<span>*</span></label>
                <input
                    id='email'
                    type='text'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
                {errorObject.email && <p className="error">{errorObject.email}</p>}
            </div>
            <div className='d-column'>
                    <label htmlFor='queryType'>Query Type <span>*</span></label>

            <div className='d-row'>

                
                    <div className='border'>
                        <label htmlFor='generalEnquiry'>
                        <input
                            type='radio'
                            value='General Enquiry'
                            checked={formData.queryType === 'General Enquiry'}
                            onChange={handleChange}
                            name='queryType'
                            id='generalEnquiry'
                        />
                        <span>General Enquiry</span>
                    </label>
                    </div>
                     <div className='border'>
                    <label htmlFor='supportRequest'>
                        <input
                            type='radio'
                            value='Support Request'
                            checked={formData.queryType === 'Support Request'}
                            onChange={handleChange}
                            name='queryType'
                            id='supportRequest'
                        />
                        <span>Support Request</span>
                    </label>
                    </div>
                    {errorObject.queryType && <p className="error">{errorObject.queryType}</p>}
                
            </div>
            </div>
            <div className='d-column message'>
                <label>Message<span>*</span></label>
                <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                />
                {errorObject.message && <p className="error">{errorObject.message}</p>}
            </div>
            <div className='d-row checkBoxDiv'>
                <label>
                    <input
                        type="checkbox"
                        name='consent'
                        checked={formData.consent}
                        onChange={handleChange}
                        className='checkBox'
                    />
                    I here by consent to be contacted by the teams
                </label>
                {errorObject.consent && <p className="error">{errorObject.consent}</p>}
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
}
