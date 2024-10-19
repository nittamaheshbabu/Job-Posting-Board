import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';
import apiClient from '../services/apiClient';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        companyName: '',
        companyEmail: '',
        employeeSize: ''
    });

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/\D/g, '');
        setFormData((prev) => ({ ...prev, phone: numericValue }));
        setErrors((prev) => ({ ...prev, phone: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        for (const key in formData) {
            if (!formData[key]) {
                newErrors[key] = `${key} is required`;
            }
        }

        const phoneRegex = /^\d{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Prevent submission if there are errors
        }

        // Format the phone number for Twilio
        const formattedPhone = `+91${formData.phone}`;

        // Create a new form data object to include the formatted phone
        const dataToSend = { ...formData, phone: formattedPhone };

        try {
            localStorage.setItem('jdp', formData.phone);
            await apiClient.post("/api/signup/company-registration", dataToSend);
            navigate('/otp-verification');
        } catch (error) {
            console.error(error.response.data.message);
            setSubmitError(error.response.data.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className="container">
                <div className="col-5">
                    <p>Lorem Ipsum is simply dummy text of the printing and <br />
                        typesetting industry. Lorem Ipsum has been the industry's<br />
                        standard dummy text ever since the 1500s, when an <br />
                        unknown printer took a galley</p>
                </div>
                <div className="signup-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone no."
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            onBlur={() => {
                                if (formData.phone.length !== 10) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        phone: "Phone number must be exactly 10 digits",
                                    }));
                                }
                            }}
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}

                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                        {errors.companyName && <span className="error">{errors.companyName}</span>}

                        <input
                            type="email"
                            name="companyEmail"
                            placeholder="Company Email"
                            value={formData.companyEmail}
                            onChange={handleChange}
                        />
                        {errors.companyEmail && <span className="error">{errors.companyEmail}</span>}

                        <input
                            type="text"
                            name="employeeSize"
                            placeholder="Employee Size"
                            value={formData.employeeSize}
                            onChange={handleChange}
                        />
                        {errors.employeeSize && <span className="error">{errors.employeeSize}</span>}

                        {submitError && <span className="error">{submitError}</span>} {/* Display submission error */}

                        <button type="submit" className="btn-submit">Proceed</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
