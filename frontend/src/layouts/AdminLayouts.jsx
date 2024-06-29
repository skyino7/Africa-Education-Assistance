import React, { useEffect} from "react";
import { Outlet,  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AdminLayouts = () => {
    const navigate = useNavigate();

    // console.log("State: ", useSelector((state) => state.Auth.user))
    // const { user } = useSelector((state) => state.Auth.user);

    const { user } = useSelector((state) => {
        // console.log(state);
        return state.auth}
    );

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/login");
        }
    }, [user, navigate]);
    return (
        <>
            <Outlet />
        </>
    );

};

export default AdminLayouts;
