import React from 'react';
import { Table } from 'react-bootstrap'

function Rest({rests}) {
  
    return (
        <div>
         <Table striped bordered hover variant="dark" responsive="sm">
  <thead>
    <tr>
     
      <th>Name</th>
      <th>City</th>
      <th>State</th>
      <th>PhoneNumber</th>
      <th>Genre</th>
    </tr>
  </thead>
  <tbody>
      {rests.map((rest)=>(
        <tr key={rest._id}>
      <td>{rest.name}</td>
      <td>{rest.city}</td>
      <td>{rest.state}</td>
      <td>{rest.phone_number}</td>
      <td>{rest.genre}</td>
      
    </tr>
      ))}
    
    
  </tbody>
</Table>
        </div>
    )
}

export default Rest
