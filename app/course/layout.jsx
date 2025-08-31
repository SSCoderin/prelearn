import React from "react";
import DashHeader from "../dashboard/_component/DashHeader";

const CourseView = ({ children }) => {
  return <div>
    <DashHeader/>
    <div className="mx-10 md:mx-36 lg:mx-40 mt-10">
        {children}
    </div>
    
    </div>;
};

export default CourseView;
