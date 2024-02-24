# resume_web

## Introduction

`resume_web` is a dynamic web-based resume designed to showcase the professional and personal milestones of individuals looking to secure a position in the information technology industry. Developed using Create React App, this client-side application interacts with the `resume_server` and a MySQL database to present a responsive and interactive resume. It aims to provide a modern alternative to traditional resume formats, offering users an engaging way to learn about an individual's skills, experiences, and hobbies.

## Features

- **Personal Information**: A detailed section for users to understand the resume owner's background.
- **Contact Information**: Easy access to contact methods for potential employers or collaborators.
- **Language Skills**: Showcases the owner's proficiency in various languages.
- **Recommendations**: Displays endorsements and recommendations from peers or superiors.
- **Education**: Lists educational achievements and qualifications.
- **Work Experience**: A timeline view of professional experiences.
- **Hobbies**: Highlights personal interests and hobbies to give a well-rounded view of the individual.

## Technology Stack

- **React**: Utilized for building the user interface in a modular and efficient manner.
- **Create React App**: A toolset for setting up a new single-page React application, ensuring best practices.
- **CSS**: For styling components and ensuring responsive design.
- **JWT**: For secure communication with `resume_server` and protection of sensitive information.

## Environment Variables

To run this project, you need to add the following environment variable to your `.env` file:

- `REACT_APP_SERVER_URL`: The URL of the `resume_server` to connect to for fetching and sending data.

## Installation

To set up and run `resume_web` on your local machine, follow these steps:

1. **Clone the repository**:

   ```
   git clone https://github.com/Resume-and-CV/resume_web.git
   cd resume_web
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

3. **Configure your `.env` file** with the `REACT_APP_SERVER_URL` pointing to your running instance of `resume_server`.

4. **Start the application**:

   ```
   npm start
   ```

   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

## Lessons Learned

Building `resume_web` provided invaluable insights into modern web development practices and the React ecosystem. Implementing responsive design principles and securing the application with JWT were crucial learning points. The project underscored the importance of user experience design and security in web applications.

## Future Plans for resume_web

As resume_web continues to evolve, we are excited to share our roadmap for enhancing the platform to better serve our users and expand its capabilities. Our upcoming features are designed with the user experience and administrative efficiency in mind:

1. Administrative Access for Data Management
   Goal: To provide a secure, intuitive administrative interface that allows designated administrators to update and manage content across the resume_web platform without direct database access or complex technical requirements.
   Implementation: We plan to develop a backend dashboard that supports CRUD (Create, Read, Update, Delete) operations on all resume sections. This will include authentication mechanisms to ensure secure access.

2. Downloadable PDF CV
   Goal: To offer a downloadable PDF version of the resume, allowing users and potential employers to easily obtain a printable or offline copy of the resume.
   Implementation: Integration of a PDF generation library that can convert the online resume into a well-formatted PDF document. This feature will ensure that the layout, fonts, and styles match the web version for consistency.

3. Request Account via Emai
   Goal: To streamline the process for users to request access to resume_web, making it easier to manage and track requests.

4. Technical and Design Considerations
   User Interface Design: The administrative dashboard and PDF download feature will be designed with usability in mind, ensuring that they are intuitive and accessible to users with varying levels of technical expertise.

These planned features represent the next step in making resume_web a more versatile and user-friendly platform. By enabling easier content management for administrators, offering downloadable PDF resumes, and simplifying account requests, we aim to enhance the utility and accessibility of resume_web for all users. Stay tuned for updates on our progress and launch dates for these exciting new features.
