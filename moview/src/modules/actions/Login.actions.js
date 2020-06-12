export const ADDUSERDATA = 'ADDUSERDATA';
export const DELETEUSERDATA = 'DELETEUSERDATA';

export function adduserdata(member, token){
    return{
        type : ADDUSERDATA,
        member : member,
        token : token
    };
}

export function deleteuserdata(){
    return{
        type : DELETEUSERDATA
    }
}