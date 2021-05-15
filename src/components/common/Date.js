
const DateComponent =({date,locale,month,year,day})=>{
    let date_return=new Date(date);

    return(
       <span>{date_return.toLocaleDateString(locale,{month:month,year:year,day:day})}</span> 
    )
}

export default DateComponent;