export const getdetails=(user)=>{
        return (dispatch)=>{
            dispatch({
                type:'getuser',
                payload:user
            });
        };
    };

    