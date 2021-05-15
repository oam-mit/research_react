import React, { Component } from 'react'
import Swal from 'sweetalert2';
import UserProvider from '../../providers/UserProvider';
import Tags from '../common/Tags';



class ProjectAdd extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            submit_data:{
                title:"",
                description:"",
                tags:"",
                is_department_specific:false,
                max_students:1,
                start_date:"",
                end_date:""
            },
            page:1,
            submitted:false
        }

        this.submit_handler=this.submit_handler.bind(this);
    }
    

    changeHandler(event)
    {

            this.setState((prev)=>{
                return(
                    {
                        submit_data:{
                            ...prev.submit_data,
                            [event.target.name]:event.target.value
                        }
                    }
                );
            })
    }

    render_difference_between_dates()
    {
        let start_date=new Date(this.state.submit_data.start_date);
        let end_date=new Date(this.state.submit_data.end_date);
        let diff =(end_date.getTime() - start_date.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        return Math.abs(Math.round(diff));
    }

    togglePage(event,page)
    {
        event.preventDefault();
        this.setState({page:page});

    }

    render_form()
    {
        if(this.state.page===1)
        {

            return(
                <>
                <legend>Basic Information</legend>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input defaultValue={this.state.submit_data.title} onChange={(event)=>this.changeHandler(event)} name="title" type="text" className="form-control" id="exampleFormControlInput1" placeholder="What is the project called?"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                    <textarea defaultValue={this.state.submit_data.description} onChange={(event)=>this.changeHandler(event)} name="description" className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Describe the project"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags (Separate each one with '<b>,</b>')</label>
                    <input defaultValue={this.state.submit_data.tags} type="text" className="form-control" id="tags" name="tags" value={this.state.tags} onChange={(event)=>this.changeHandler(event)}/>
                    <span id="passwordHelpBlock" className="form-text text-muted">
                        <Tags tag_string={this.state.submit_data.tags} bootstrap_color={'secondary'}/>
                    </span>
                    
                </div>
                <div className="center-btn text-center">
                    <button disabled={this.state.submit_data.title.length===0 || this.state.submit_data.description.length===0 || this.state.submit_data.tags.length===0} onClick={(event)=>{
                       this.togglePage(event,2)
                    }} className="btn btn-mystyle">Next</button>
                </div>
                </>
            );

        }
        else if(this.state.page===2)
        {
            return(
            <>
                <legend>Management Information</legend>
                <div className="form-group">
                    <div className="form-check">
                        <input defaultChecked={this.state.submit_data.is_department_specific} name="is_department_specific" onChange={(event)=>this.setState((prev)=>{
                            return(
                                {
                                    submit_data:{
                                        ...prev.submit_data,
                                        is_department_specific:event.target.checked
                                    }
                                }
                            );
                        })} className="form-check-input" type="checkbox" id="department_specific" />
                        <label className="form-check-label" htmlFor="department_specific">Is your project restricted to your department?</label>
                    </div>
                </div>
                <div className="form-group ">
                    <label htmlFor="max">Maximum number of students</label>
                    <input onChange={(event)=>this.changeHandler(event)} type="number" className="form-control col-2" id="max" name="max_students" min={1} value={this.state.submit_data.max_students} />
                    
                </div>
                <div className="form-row">
                    <div className="col-6">
                            <label htmlFor="start_date">Start Date</label>
                            <input defaultValue={this.state.submit_data.start_date} type="date" onChange={(event)=>this.changeHandler(event)} name="start_date" className="form-control"/>
                    </div>
                    {this.state.submit_data.start_date.length>0 ? 
                        <div className="col">
                            <label htmlFor="end_date">End Date</label>
                            <input defaultValue={this.state.submit_data.end_date} type="date" onChange={(event)=>this.changeHandler(event)} min={this.state.submit_data.start_date} name="end_date" className="form-control"/>
                        </div>
                        :
                        <>
                        </>
                    }
                </div>

                <div className="center-btn text-center align-items-center mt-3">
                    <div className="btn-group" role="group" aria-label="Basic example"  >
                        <button className="btn mr-1" onClick={(event)=>this.togglePage(event,1)} style={{backgroundColor:'#1d1e4e',color:'white'}}>Previous</button>
                        <button className="btn" disabled={this.state.max_students===0 || this.state.submit_data.start_date.length===0 || this.state.submit_data.end_date.length===0}  onClick={(event)=>this.togglePage(event,3)} style={{backgroundColor:'#1d1e4e',color:'white'}}>Next</button>
                        
                    </div>
                </div>
            </>
            );

        }

        else
        {
            return(
                <>
                <legend>Review details</legend>
                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="title" value={this.state.submit_data.title}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <textarea readOnly rows={10} className="form-control-plaintext" id="descripion" value={this.state.submit_data.description}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="tags" className="col-sm-2 col-form-label">Tags</label>
                    <div className="col-sm-10">
                       <Tags tag_string={this.state.submit_data.tags} bootstrap_color={'secondary'}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="is_department_specific" className="col-sm-2 col-form-label">Is your project restricted to your department?</label>
                    <div className="col-sm-10">
                        {this.state.submit_data.is_department_specific ?  <Tags tag_string={'Yes'} bootstrap_color={'success'}/> :  <Tags tag_string={'No'} bootstrap_color={'success'}/>}
                      
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="max_students" className="col-sm-2 col-form-label">Maximum number of students</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="max_students" value={this.state.submit_data.max_students}/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="start_date">Start Date</label>
                        <input readOnly type="date" className="form-control-plaintext" id="start_date" value={this.state.submit_data.start_date}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPassword4">End Date</label>
                        <input readOnly type="date" className="form-control-plaintext" id="end_date" value={this.state.submit_data.end_date}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="">Duration</label>
                        <input readOnly type="text" className="form-control-plaintext" id="duration" value={`${this.render_difference_between_dates()} months`}/>
                    </div>
                </div>

                <div className="center-btn text-center align-items-center mt-3">
                    <div className="btn-group" role="group" aria-label="Basic example"  >
                        <button className="btn mr-1" onClick={(event)=>this.togglePage(event,2)} style={{backgroundColor:'#1d1e4e',color:'white'}}>Previous</button>
                        <button className="btn" disabled={
                        this.state.max_students===0 || this.state.submit_data.start_date.length===0 || this.state.submit_data.end_date.length===0 || this.state.submit_data.title.length===0 || this.state.submit_data.description.length===0 || this.state.submit_data.tags.length===0 || this.state.submitted 
                        } 
                        type="submit" style={{backgroundColor:'#1d1e4e',color:'white'}}>Submit</button>
                        
                    </div>

                </div>
                
                </>
            );
        }


    }

    submit_handler(event)
    {
        event.preventDefault();

        Swal.fire({
            title:'Confirmation',
            text:'Please click on OK to confirm',
            confirmButtonText:'OK',
            cancelButtonText:'Exit',
            showCancelButton:true,
            icon:'info',


        })
        .then(result=>{
            if(result.value)
            {

                this.setState({submitted:true},()=>{

                    // let form_data=new FormData();
        
                    // for (let data in this.state.submit_data)
                    // {
                    //     form_data.append(data,JSON.stringify(this.state.submit_data[data]))
                    // }
            
            
            
                    fetch('/faculty/api/submit_project/',{
                        'method':'POST',
                        'body':JSON.stringify(this.state.submit_data),
                        'headers':{
                            'X-CSRFToken':this.context.getCookie('csrftoken'),
                            'Content-Type':'application/json'
                        }
                    })
                    .then((resp)=>resp.json())
                    .then((data)=>{
                        if(data.status==='successful')
                        {
                            Swal.fire({
                                title:'Success',
                                text:'Successfully Submitted',
                                icon:'success'
            
            
                            })
                            .then((res)=>{
                                this.props.history.push('/faculty/home');
                            })
                        }
                        else
                        {
                            Swal.fire({
                                title:'Error',
                                text:data.error,
                                icon:'error'
                            })
                        }
                    })
                    .catch(err=>console.log(err))
            
        
                })

            }
        })

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
        <div className="progress" style={{height:'5px'}}>
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width:`${JSON.stringify((100*this.state.page/3))}%`}} role="progressbar" aria-valuenow={JSON.stringify((100*this.state.page/3))}  aria-valuemin="0" aria-valuemax="100"></div>
        </div>
            <form onSubmit={this.submit_handler} className="my-4">
                {this.render_form()}
            </form>
      </div>
  
    </>
        );
    }
}

ProjectAdd.contextType=UserProvider

export default ProjectAdd;