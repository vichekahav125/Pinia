# TODO

## Bonus: Student Management System (Pinia)

- [x] Create `src/stores/studentStore.js` with state `students`, actions `addStudent/deleteStudent/updateStudent`, getter `totalStudents` and LocalStorage persistence helpers.
- [x] Create `src/stores/courseStore.js` with state `courses`, actions `addCourse/deleteCourse`, getter `totalCourses` and LocalStorage persistence helpers.
- [x] Create `src/stores/enrollmentStore.js` with state `enrollments`, actions `enrollStudent/removeEnrollment`, getter `totalEnrollments` and LocalStorage persistence helpers.
- [x] Update `src/views/DemoView.vue` to display UI panels for students/courses/enrollments and wire to actions/getters.
- [ ] Run the app and manually verify:
  - Add/edit/delete student works
  - Add/delete course works
  - Enroll/remove enrollment works
  - Counts update via getters
  - Refresh preserves bonus data (LocalStorage)

