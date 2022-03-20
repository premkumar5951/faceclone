import React, { useEffect } from 'react'
import './loading.css'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  
  return (
    <><div className="load">
        <div className="loadbox">
        <h1><CircularProgress/></h1>
            <h3 className="mx-2">Loading...</h3>
        </div>
    </div></>
    
  )
}
