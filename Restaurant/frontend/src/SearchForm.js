import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function SearchForm({ params, onParamChange }) {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Search</Form.Label>
          <Form.Control onChange={onParamChange} value={params.search} name="search" type="text" />
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>State</Form.Label>
      <Form.Control as="select" defaultValue="All" onChange={onParamChange} name="state" value={params.state}>
        <option>All</option>
        <option>Texas</option>
        <option>Oklahoma</option>
      </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Genre</Form.Label>
      <Form.Control as="select" defaultValue="All"  onChange={onParamChange} name="genre" value={params.genre}>
        <option>All</option>
        <option>Comedy</option>
        <option>Horror</option>
      </Form.Control>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}