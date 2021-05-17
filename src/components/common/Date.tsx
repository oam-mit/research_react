
type PropType={
    date:string,
    locale:string,
    month:"long",
    year:"numeric",
    day:"numeric"
}

const DateComponent =({date,locale,month,year,day}:PropType)=>{
    let date_return=new Date(date);

    return(
       <span>{date_return.toLocaleDateString(locale,{month:month,year:year,day:day})}</span> 
    )
}

export default DateComponent;