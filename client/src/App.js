import React from 'react';
import { 
  Routes, 
  Route, 
  BrowserRouter } from 'react-router-dom';
import withContext from './Context';

//Import main Header
import Header from './components/Header';

//Import User components
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

//Import Course components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

//Import PrivateRoute for auth route
import PrivateRoute from './PrivateRoute';

import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

//Add Header Context
const HeaderWithContext = withContext(Header);

//Adding User Context
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

//Add Course Context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

//Add PrivateRoute Context
const PrivateRouteWithContext = withContext(PrivateRoute);

function App() {
  return (
    <div id='root'>
      <BrowserRouter>
        <HeaderWithContext />
        <main>
          <Routes>
            <Route path='/'>
              <Route index element={<CoursesWithContext />} />
              <Route path='signin' element={<UserSignInWithContext />} />
              <Route path='signup' element={<UserSignUpWithContext />} />
              <Route path='signout' element={<UserSignOutWithContext />} />
              <Route path='courses'>
                <Route index element={<CoursesWithContext />} />
                <Route path=':id'>
                  <Route index element={<CourseDetailWithContext />} />
                  <Route path='update' element={
                    <PrivateRouteWithContext redirectTo={'/signin'}>
                      <UpdateCourseWithContext />
                    </PrivateRouteWithContext>}/>
                  <Route path='delete' element={<CourseDetail />} />
                </Route>
              <Route path='create' element={
                <PrivateRouteWithContext redirectTo={'/signin'}>
                  <CreateCourseWithContext />
                </PrivateRouteWithContext>}/>
            </Route>
            <Route path='error' element={<UnhandledError />} />
            <Route path='forbidden' element={<Forbidden />} />
            <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;