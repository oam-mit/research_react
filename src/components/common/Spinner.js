import PuffLoader from 'react-spinners/PuffLoader';
import { css } from "@emotion/core";





const Spinner=({size,position})=>{
    const override = css`
        position: ${position};
            height: 100px;
            width: 100px;
            top: 50%;
            left: 50%;
            margin-left: -50px;
            background-size: 100%;
`;
    return(
        <PuffLoader css={override} color='#009ffd' size={size}/>
    );
}

export default Spinner;