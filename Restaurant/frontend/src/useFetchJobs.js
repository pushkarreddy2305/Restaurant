import { useReducer, useEffect } from 'react'
import axios from 'axios';
const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

// const BASE_URL = 'http://localhost:5000/'

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, rests: [] }
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, rests: action.payload.rests }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, rests: [] }
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage }
    default:
      return state
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { rests: [], loading: true });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source()
    dispatch({ type: ACTIONS.MAKE_REQUEST })

    const {search,state,genre}=params;

    axios.get(`http://localhost:5000/api/products/?page=${page}&limit=10&searchKeyword=${search}&state=${state}&genre=${genre}`).then(res => {
    
    dispatch({ type: ACTIONS.GET_DATA, payload: { rests: res.data.results } }) 
    }).catch(e => {
      
      dispatch({ type: ACTIONS.ERROR, payload: { error: e } }) 
    })
    const cancelToken2 = axios.CancelToken.source()
    axios.get(`http://localhost:5000/api/products/?page=${page}&limit=10&searchKeyword=${search}&state=${state}`).then(res => {
      dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.hasOwnProperty('next') } }) 
    }).catch(e => {
      if (axios.isCancel(e)) return
      dispatch({ type: ACTIONS.ERROR, payload: { error: e } }) 
    })

    return () => {
      cancelToken1.cancel()
      cancelToken2.cancel()
    }
  }, [params, page])
  
  return state
}