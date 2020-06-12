import { ADDUSERDATA, DELETEUSERDATA } from '../actions/Login.actions';

const LoginState = {
    member : null,
    token : null
};

const Login = (state = LoginState, action) => {
    switch(action.type){
        case ADDUSERDATA:
            return Object.assign({}, state, {
                member : action.member,
                token : action.token
            });
        case DELETEUSERDATA:
            return Object.assign({}, state, {
                member : null,
                token : null
            });
        default:
            return state;
    }
};

export default Login;