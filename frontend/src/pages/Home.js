import React, { useEffect,useState  } from 'react'

const Home = (props) => {
    // const[name,setName]=useState('');
    
    console.log(props.name);

    // useEffect(effect=>{
    //     (
    //         async()=>{
    //           const res= await fetch('http://127.0.0.1:8000/api/user/',{
                  
    //                 credentials:'include',
    //                 headers:{'Content-Type':'application/json'},
    //             }) 
    //             const result=await res.json()

    //             console.log(result);

    //             setName(result.name)
    //         }

    //     )()
     
    // })
    return (
        // <div onLoad={useEffect}>
        <div >
            
            
         
           
             {props.name ? '': `you are not logged in`}


        </div>
    );
}


// <main className="content p-3 mb-2 bg-dark">
//       <h1 className="text-white text-uppercase text-center my-4">
//         Complaint Manegment system

//       </h1>

//       <div className="row">
//         <div className="col-md-6 col-sma-10 mx-auto  p-0">
//           <div className="card p-3">
//             <div>
//               <button onClick={this.createItem} className="btn btn-primary">
//                 Add Ticket
//               </button>
//             </div>
//             {this.renderTabList()}
//             <ul className="list-group list-group-flush">
//               {this.renderItems()}

//             </ul>

//           </div>

//         </div>

//       </div>
//       <footer className="my-5 mb-3 bg-light text-dark text-center">
//         &copy; 2021 Copyrights

//       </footer>

//       {this.state.modal ? (
//           <Modal
//             activeItem={this.state.activeItem}
//             toggle={this.toggle}
//             onSave={this.handleSubmit}
//           />
//         ) : null}

//     </main>



export default Home