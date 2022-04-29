import axios from 'axios';
import React, { useEffect } from 'react';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';

const changeColorScreen =  ({ match, location, history }) => {
    const changeColor = async()=>{
    console.log(match);
    const path = "http://localhost:5000/api/products/color";
    const data = {
        path:"C://Users//azizm//OneDrive//Bureau//piano1.png",
        productName:"piano",
        color:"green",
        colorCode:{
            R:255,
            G:0,
            B:0
        }
    }
    const res = await axios.post(path,data,{withCredentials: false});
    console.log(res);
}
	return (
		<>
			<h1>Hi</h1>
            <Button
			onClick={changeColor}
			className='btn-block'
			type='button'
			>
			Change product color
			</Button>
		</>
	);
};

export default changeColorScreen;
