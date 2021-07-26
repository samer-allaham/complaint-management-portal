import React, { useEffect,useState  } from 'react'

const Home = (props) => {

    return (

        <div className="home">         
             {props.name ? '': `you are not logged in, Please login to continue`}
        </div>
    );
}





export default Home