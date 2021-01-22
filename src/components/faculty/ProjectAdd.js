import React, { Component } from 'react'

class ProjectAdd extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            tags:''
        }
    }

    changeHandler(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render_tags()
    {
        let tags=this.state.tags.split(',');

        let output=tags.filter((tag)=>tag!=="").map((tag)=>{
            return(
                <span class="badge badge-secondary">{tag.trim()}</span>
            );
        })

        if(output.length>0)
        {
            return output;
        }
        else
        {
            return <></>
        }

    }


    render()
    {
        return(
            <>
            <title>Faculty | New Project</title>
        <div className="jumbotron jumbotron-fluid text-white text-center my-3" id="jumbo-color">
            <h3 className="display-1" id="jumbo-text">Add a new Project</h3>
        
        </div>
        <div className="container padding-custom">
            <form className="my-4">
                <div className="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="What is the project called?"/>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Describe the project"></textarea>
                </div>
                <div className="form-group">
                    <label for="tags">Tags (Separate each one with '<b>,</b>')</label>
                    <input type="text" className="form-control" id="tags" name="tags" value={this.state.tags} onChange={(event)=>this.changeHandler(event)}/>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                    {this.render_tags()}
                    </small>
                    
                </div>
                <div className="form-group">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitch1"/>
                        <label class="custom-control-label" for="customSwitch1">Is the project Restricted to your brach ?</label>
                    </div>
                </div>
                <div className="form-group">
                    <label for="max">Maximum number of students</label>
                    <input type="number" className="form-control col-2" id="max" name="max" min={1} />
                    
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
      </div>
  
    </>
        );
    }
}

export default ProjectAdd;