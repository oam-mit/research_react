import { useState } from "react";


const gotoTop=()=>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}

const TopButton =()=>{

   let  [display,setDisplay]=useState(false);
    window.onscroll=()=>{
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
        {
            setDisplay(true);
        }
        else
        {
            setDisplay(false);
        }

    };
    return(
        <button onClick={()=>gotoTop()} id="myBtn" style={{display: display ? 'block' : 'none' }} title="Go to top">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-arrow-up-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fillRule="evenodd" d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"/>
                <path fillRule="evenodd" d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z"/>
            </svg>
      </button>
    );
}


export default TopButton;