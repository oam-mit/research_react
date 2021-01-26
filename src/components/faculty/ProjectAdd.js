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
        

        let output=this.state.tags.split(',').filter((tag)=>tag!=="").map((tag,index)=>{
            return(
                <span key={index} className="badge badge-secondary mr-1">{tag.trim()}</span>
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
                <label htmlFor="exampleFormControlInput1">Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="What is the project called?"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Describe the project"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags (Separate each one with '<b>,</b>')</label>
                    <input type="text" className="form-control" id="tags" name="tags" value={this.state.tags} onChange={(event)=>this.changeHandler(event)}/>
                    <span id="passwordHelpBlock" className="form-text text-muted">
                    {this.render_tags()}
                    </span>
                    
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" htmlFor="gridCheck">
                            Is your project restricted to your department ?
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="max">Maximum number of students</label>
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