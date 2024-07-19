import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, user, redirect = "/" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

const ProtectRouteCandidate= ({ children, user, redirect = "/" }) => {
  if (!user) return <Navigate to={redirect} />;
  if(user.role!=="Candidate" ) return <Navigate to={redirect}/>
  return children ? children : <Outlet />;
};

const ProtectRouteRecruiter = ({ children, user, redirect = "/" }) => {
  if (!user) return <Navigate to={redirect} />;
  if(user.role!=="Recruiter") return <Navigate to={redirect}/>
  return children ? children : <Outlet />;
};

export {ProtectRouteCandidate,ProtectRouteRecruiter}
export default ProtectRoute;
