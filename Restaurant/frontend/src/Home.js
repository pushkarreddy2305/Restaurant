import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import Rest from './Rest';
import { Container } from 'react-bootstrap'
// import Job from './Job'
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
function Home() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { rests, loading, error, hasNextPage } = useFetchJobs(params, page)
  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Restaurant</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      
       {rests.length>0?
         <Rest rests={rests} />
      :"No results found"}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  )
}
       

export default Home
