import React, { Component } from 'react';
import StudentRoot from './components/student/StudentRoot';
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
                    <Route path="/" render={()=><StudentRoot/>}/>
                </Switch>

            </div>
        );

    }
}

export default App;