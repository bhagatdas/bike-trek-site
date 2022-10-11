import React from "react";
import { Route } from "react-router-dom";
import CategoryCreate from "./category/CategoryCreate";

const AdminDashboard = () => {
  return (
    <div>
    Welcome to Dashboard
    <Route path="/add-category" component={CategoryCreate} />
    </div>
  );
};

export default AdminDashboard;
