<div id="top"></div>

# Job Posting Board with Email Automation

<details>
<summary>Table of contents</summary>

-   [Overview](#overview)
-   [Technology Stack](#technology-stack)
-   [Getting Started](#getting-started)
-   [Features](#features)
-   [Screenshots](#screenshots)
-   [Link](#link)

</details>

## Overview

Welcome to the Job Posting Board, a MERN-based web application that enables companies to register, verify their accounts via email, and post job listings. The platform also includes an email automation feature that allows companies to send job alerts or updates to candidates. This project incorporates user authentication, OTP verification, and an intuitive UI for posting jobs.

## Technology Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Nodemailer and twilio (for otp & email automation)
- JWT (for authentication)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/nittamaheshbabu/Job-Posting-Board.git
   cd Job-Posting-Board

   ```

2. Go to the backend folder:

   ```bash
    create a .env file

   // Add the following variables 
    PORT=7000
    MONGODB_URL=YOUR_MONGODB_URL
    JWT_SECRET=YOUR_JWT_SECRET_KEY
    NM_USER=YOUR_NODEMAILER_EMAIL
    NM_PASS=YOUR_NODEMAILER_PASS_KEY
    NM_FROM=YOUR_NODEMAILER_EMAIL
    TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
    TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
    TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER
    secret_key=YOUR_SECRET_KEY

   npm install
   ```
3. Install the backend dependencies:
    ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
4. Now Go to frontend folder and install frontend dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Features

- **User Registration with OTP Verification:** Companies can register, receive an OTP via email, and verify their account to gain access to job posting features.
- **Company Login:** Companies can log in using JWT authentication and securely manage their session.
- **Job Posting:** Authenticated companies can create job listings with details like job title, description, experience level, candidate info, and end date.
- **Email Automation:** Send job updates and alerts to multiple candidates via automated emails using Nodemailer and twilio.

## Screenshots

<table>
    <tr>
        <th>Desktop View</th>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;font-weight: bold;">Sign Up Page</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/464316bc-d941-4cc4-8b27-94a132e3960e" width="100%" title="Sign Up Page"/>
        </td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;font-weight: bold;">Otp Verification Page</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/1dbc41c6-8a7d-420d-a954-cefef6534394" width="100%" title="Otp Verification Page"/>
        </td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;font-weight: bold;">Home Page</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/d3e5ef1f-4a9e-49da-9fa3-95e624d8a658" width="100%" title="Home Page"/>
        </td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;font-weight: bold;">Job Posting Page</td>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/user-attachments/assets/42f4ef35-39a6-4f63-9ff8-ae21ca93af56" width="100%" title="Job Posting page"/>
        </td>
    </tr> 
</table>

## Link
[🚀 Live Page](https://job-posting-board-jvlnt0uma-nittamaheshbabus-projects.vercel.app/)

<p align="right"><a href="#top">⬆️ Back to Top</a></p>
