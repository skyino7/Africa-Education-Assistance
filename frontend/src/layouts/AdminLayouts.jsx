import React, { useEffect} from "react";
import { Outlet,  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayouts = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user && user.role !== "admin") {
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
