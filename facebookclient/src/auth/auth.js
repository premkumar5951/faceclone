import { fetchFailed, fetchStarted, fetchSuccessful } from '../reducers/actions'

const auth = async (dispatch, SetAuth, setUser,history) => {
    dispatch(fetchStarted())
    try {
        const res = await fetch('/auth', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if (res.status === 200) {
            dispatch(SetAuth(true))
            setUser(data)
            dispatch(fetchSuccessful())
        } else {
            dispatch(fetchFailed())
            dispatch(SetAuth(false))
            setUser([])
            history('/login')
        }
    } catch (e) {
        dispatch(fetchFailed())
        dispatch(SetAuth(false))
        setUser([])
        history('/login')
    }
}
export const authnoredirect = async (dispatch, SetAuth, setUser) => {
    dispatch(fetchStarted())
    try {
        const res = await fetch('/auth', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if (res.status === 200) {
            dispatch(SetAuth(true))
            setUser(data)
            dispatch(fetchSuccessful())
        } else {
            dispatch(fetchFailed())
            dispatch(SetAuth(false))
            setUser([])
        }
    } catch (e) {
        dispatch(fetchFailed())
        dispatch(SetAuth(false))
        setUser([])
    }
}

export const logout=async(dispatch, SetAuth, setUser,history)=>{
    dispatch(fetchStarted())
    try{
const res=await fetch('/users/auth/logout',{
    method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
})
    const data=await res.json()
    if (res.status==200){
        dispatch(SetAuth(false))
        setUser([])
        dispatch(fetchSuccessful())
        history('/login')
    }
    }catch(e)
    {
console.log(e)
    }

}



export default auth