import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!email || !password || !role) return alert("Provide All Fields.");
        store.dispatch(userLogin({ email, password, role }));
    }
    catch (err) {
        console.log(err);
    }
};

export const handleRegister = (e, email, name, password, phone, role) => {
    e.preventDefault();
    try {
        store.dispatch(userRegister({ e, email, password, name, phone, role }));
    }
    catch (err) {
        console.log(err);
    }
};