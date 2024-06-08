export const getdetails=(user)=>{
        return (dispatch)=>{
            dispatch({
                type:'getusername',
                payload:user
            });
        };
    };

    