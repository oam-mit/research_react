# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Important Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://127.0.0.1:3000](http://127.0.0.1:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.\

Please note that the requests are proxied to **_127.0.0.1:8000_**. Hence you will need to run the Django Server first.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Important

### Project Structure

```
src/
├── App.test.js
├── App.tsx
├── assets
│   ├── edit_prof.css
│   ├── extra_styles.css
│   ├── home.css
│   ├── iste_logo.png
│   ├── navbar.css
│   └── profile.css
├── backend
│   ├── common
│   │   ├── NoProjectToShow.tsx
│   │   ├── ProjectType.tsx
│   │   └── UserTypes.tsx
│   ├── faculty
│   │   ├── AcceptedApplicationsProvider.tsx
│   │   ├── ApplicationsProvider.tsx
│   │   ├── HomeProvider.tsx
│   │   ├── ProjectAddProvider.tsx
│   │   └── types
│   │       └── ApplicantType.tsx
│   └── student
│       ├── ApplicationProvider.tsx
│       ├── DepartmentProvider.tsx
│       ├── HomeProvider.tsx
│       └── ProjectProvider.tsx
├── components
│   ├── common
│   │   ├── 404.tsx
│   │   ├── Date.tsx
│   │   ├── ProjectStatus.tsx
│   │   ├── Spinner.tsx
│   │   └── Tags.tsx
│   ├── faculty
│   │   ├── AccecptedApplicants.tsx
│   │   ├── Applications.tsx
│   │   ├── FacultyRoot.tsx
│   │   ├── Home.tsx
│   │   ├── Navbar.tsx
│   │   ├── Profile.js
│   │   └── ProjectAdd.tsx
│   └── student
│       ├── Applications.tsx
│       ├── Department.tsx
│       ├── Footer.tsx
│       ├── Home.tsx
│       ├── Navbar.tsx
│       ├── Profile.js
│       ├── Project
│       │   ├── ProjectRoot.tsx
│       │   ├── Project.tsx
│       │   └── SideNav.tsx
│       ├── StudentRoot.tsx
│       └── TopButton.tsx
├── index.tsx
├── providers
│   └── UserProvider.tsx
├── react-app-env.d.ts
├── reportWebVitals.js
├── services
│   └── AlertService.tsx
├── setupTests.js
├── temporary
│   ├── applications.js
│   ├── departments.js
│   ├── faculty.js
│   ├── home_projects.js
│   ├── projects.js
│   └── user_details.js
└── widgets
    ├── faculty
    │   ├── AcceptedApplicationCard.tsx
    │   ├── ApplicationsCard.tsx
    │   └── HomeCard.tsx
    └── student
        ├── ApplicationCard.tsx
        ├── DepartmentCard.tsx
        └── HomeCard.tsx

17 directories, 61 files
```

### Coding Standards followed

1. The API Logic and the Front-end logic is kept separately in different files. The `backend` folder contains all the API Logic and context API is used for the same.
2. The code is formatted using the VS Code Extension **Prettier**. This extension **must** be strictly used while coding to ensure uniformity and proper React guidlines are followed.
3. The Types declared are named **PropTypes** for props, **ContextType** for Context and **StateType** for state. The naming conventions must be strictly followed. In general, while declaring any type, ensure that the name ends with **Type**
