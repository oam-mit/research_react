import React, { Component } from 'react';
import StudentRoot from './components/student/StudentRoot';
import FacultyRoot from './components/faculty/FacultyRoot';
import { Route, Switch } from 'react-router';

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state={

        };
    }
    render()
    {
        return(
            <div>
                
                <Switch>
                    <Route path="/student" render={()=><StudentRoot/>}/>
                    <Route path="/faculty" render={()=><FacultyRoot/>}></Route>
                </Switch>

            </div>
        );

    }
}

export default App;