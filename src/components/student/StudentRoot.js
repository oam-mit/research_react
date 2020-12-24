import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/extra_styles.css';

class StudentRoot extends Component
{
    constructor(props)
    {
        super(props);
        this.state={

        };

    }

    render() {
      return (
          <>
            <Navbar/>
            <Switch>
                <Route exact path="/" render={(props)=><Home {...props}/>}/>
                <Route exact path="/profile" render={(props)=><Profile {...props}/>}/>

            </Switch>
            <Footer/>
          </>
      )
    };
}


export default StudentRoot;