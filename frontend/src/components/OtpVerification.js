import React, { useEffect, useState } from 'react';
import './OtpVerification.css';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { useAuthContext } from '../context/AuthContext';

const OtpVerification = () => {
    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const [emailOtpVerified, setEmailOtpVerified] = useState(false);
    const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMobile, setErrorMobile] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {login} = useAuthContext();

    const handleEmailOtpVerification = async () => {
        if (emailOtp.length !== 6) {
            setErrorEmail('Email OTP must be exactly 6 digits');
            return;
        }

        try {
            setIsLoading(true);
            const phone = "+91" + localStorage.getItem('jdp');
            const response = await apiClient.post('http://localhost:7000/api/signup/company-verification', {
                emailOtp,
                mobileOtp: undefined,
                phone
            });
            if (response.data.message === 'Email OTP verified successfully') {
                setEmailOtpVerified(true);
                setErrorEmail('');
            } else {
                setErrorEmail('Invalid Email OTP');
            }
        } catch (error) {
            setErrorEmail('Failed to verify Email OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMobileOtpVerification = async () => {
        if (mobileOtp.length !== 6) {
            setErrorMobile('Mobile OTP must be exactly 6 digits');
            return;
        }
        try {
            setIsLoading(true);
            const phone = "+91" + localStorage.getItem('jdp');
            const response = await apiClient.post('http://localhost:7000/api/signup/company-verification', {
                emailOtp: undefined,
                mobileOtp,
                phone
            });
            console.log(response);
            if (response.data.message === 'Mobile OTP verified successfully') {
                setMobileOtpVerified(true);
                setErrorMobile('');
                localStorage.removeItem('jdp');
                const { token} = response.data;
                login(token);
                navigate('/home');
            } else {
                setErrorMobile('Invalid Mobile OTP');
            }
        } catch (error) {
            setErrorMobile('Failed to verify Mobile OTP'); 
        } finally {
            setIsLoading(false);
        }
    };

    const handleNumericInput = (e, setOtp) => {
        const { value } = e.target;
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
        }
    };

    return (
        <div className="container">
            <div className="col-5">
                <p>Lorem Ipsum is simply dummy text of the printing and <br />
                    typesetting industry. Lorem Ipsum has been the industry's<br />
                    standard dummy text ever since the 1500s, when an <br />
                    unknown printer took a galley</p>
            </div>
            <div className="otp-container">
                <h2>Sign Up</h2>

                <form>
                    <div className="otp-field">
                        <div className="input-wrapper">
                            <input
                                type="tel"
                                placeholder="Email OTP"
                                value={emailOtp}
                                onChange={(e) => handleNumericInput(e, setEmailOtp)}
                                disabled={emailOtpVerified || isLoading}
                            />
                            {emailOtpVerified && <FaCheckCircle className="success-icon" />}
                        </div>
                        <button
                            type="button"
                            className="btn-verify"
                            onClick={handleEmailOtpVerification}
                            disabled={emailOtpVerified || isLoading}
                        >
                            {emailOtpVerified ? <FaCheckCircle className="success-icon" /> : 'Verify'}
                        </button>
                    </div>
                    {errorEmail && <span className="error">{errorEmail}</span>}

                    <div className="otp-field">
                        <div className="input-wrapper">
                            <input
                                type="tel"
                                placeholder="Mobile OTP"
                                value={mobileOtp}
                                onChange={(e) => handleNumericInput(e, setMobileOtp)}
                                disabled={mobileOtpVerified || isLoading}
                            />
                            {mobileOtpVerified && <FaCheckCircle className="success-icon" />}
                        </div>
                        <button
                            type="button"
                            className="btn-verify"
                            onClick={handleMobileOtpVerification}
                            disabled={mobileOtpVerified || isLoading}
                        >
                            {mobileOtpVerified ? <FaCheckCircle className="success-icon" /> : 'Verify'}
                        </button>
                    </div>
                    {errorMobile && <span className="error">{errorMobile}</span>}
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
