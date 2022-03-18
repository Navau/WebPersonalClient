import React, { useState, useEffect } from "react";

import { notification } from "antd";

import CoursesList from "../../components/Admin/Courses/CoursesList";

import { getCoursesApi } from "../../api/course";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(false);

  // console.log("COURSES: ", courses);

  useEffect(() => {
    getCoursesApi()
      .then((response) => {
        setCourses(response.coursesStored);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      })
      .finally(() => {
        setReloadCourses(false);
      });
  }, [reloadCourses]);

  return (
    <div className="courses">
      <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
    </div>
  );
}
