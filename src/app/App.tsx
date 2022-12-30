import React, {useEffect} from 'react'
import './App.css'
import Header from './header/Header'
import Content from './content/Content'
import {CircularProgress, LinearProgress} from '@mui/material'
import {ErrorSnackbar} from '../common/components/ErrorSnackBar/ErrorSnackBar'
import {useAppDispatch, useAppSelector} from './store'
import {initializedTC} from './app-reducer'
import MobileInform from "../common/components/MobileInform/MobileInform";

function App() {
    // debugger
    const status = useAppSelector((store) => store.app.status)
    const dispatch = useAppDispatch()
    const initialized = useAppSelector((store) => store.app.initialized)

    useEffect(() => {
        dispatch(initializedTC())
    }, [dispatch])

    if (!initialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div className="App">
            <Header/>
            <div className="progressBar">
                {status === 'loading' && <LinearProgress/>}
                {status === 'failed' && <LinearProgress color="error" variant="determinate" value={0}/>}
                {status === 'succeeded' && <LinearProgress color="success" variant="determinate" value={0}/>}
            </div>
            {window.innerWidth > 1200
                ? <Content/>
                : <MobileInform/>
            }
            <ErrorSnackbar/>
        </div>
    )
}

export default App
