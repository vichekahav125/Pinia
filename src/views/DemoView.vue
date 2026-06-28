<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useThemeStore } from '../stores/themeStore'

import CounterPanel from '../components/CounterPanel.vue'
import UserPanel from '../components/UserPanel.vue'
import TodoPanel from '../components/TodoPanel.vue'
import CartPanel from '../components/CartPanel.vue'
import ThemePanel from '../components/ThemePanel.vue'

import { useStudentStore } from '../stores/studentStore'
import { useCourseStore } from '../stores/courseStore'
import { useEnrollmentStore } from '../stores/enrollmentStore'

const theme = useThemeStore()

const isDark = computed(() => theme.isDark)

onMounted(() => {
    theme.init()
})

// apply theme to body for a simple demo
const applyTheme = () => {
    document.body.style.background = isDark.value ? '#0b1220' : '#ffffff'
    document.body.style.color = isDark.value ? '#e5e7eb' : '#111827'
}

applyTheme()
watch(isDark, applyTheme)

const studentStore = useStudentStore()
const courseStore = useCourseStore()
const enrollmentStore = useEnrollmentStore()

onMounted(() => {
    studentStore.init()
    courseStore.init()
    enrollmentStore.init()
})

// Persist bonus state changes
watch(
    () => studentStore.students,
    () => studentStore.persist(),
    { deep: true }
)
watch(
    () => courseStore.courses,
    () => courseStore.persist(),
    { deep: true }
)
watch(
    () => enrollmentStore.enrollments,
    () => enrollmentStore.persist(),
    { deep: true }
)

// Student UI state
const newStudentName = ref('')
const newStudentCourse = ref('')
const editingStudentId = ref(null)
const editStudentName = ref('')
const editStudentCourse = ref('')

const startEditStudent = (s) => {
    editingStudentId.value = s.id
    editStudentName.value = s.name
    editStudentCourse.value = s.course ?? ''
}

const cancelEditStudent = () => {
    editingStudentId.value = null
    editStudentName.value = ''
    editStudentCourse.value = ''
}

const saveEditStudent = () => {
    studentStore.updateStudent({
        id: editingStudentId.value,
        name: editStudentName.value,
        course: editStudentCourse.value,
    })
    cancelEditStudent()
}

// Course UI state
const newCourseTitle = ref('')

// Enrollment UI state
const selectedStudentId = ref(null)
const selectedCourseId = ref(null)

const enroll = () => {
    enrollmentStore.enrollStudent({
        studentId: selectedStudentId.value,
        courseId: selectedCourseId.value,
    })
}

const studentById = (id) => studentStore.students.find((s) => s.id === id)
const courseById = (id) => courseStore.courses.find((c) => c.id === id)

</script>

<template>
    <div class="wrap" :class="{ dark: isDark }">
        <header class="header">
            <div>
                <h1>Pinia</h1>
                <p>Stores: counter, user, todo, cart, theme, student management (bonus).</p>
            </div>
            <ThemePanel />
        </header>

        <main class="grid">
            <CounterPanel />
            <UserPanel />
            <TodoPanel />
            <CartPanel />

            <section class="panel">
                <h2>Student Store</h2>
                <div class="muted">Total Students: <strong>{{ studentStore.totalStudents }}</strong></div>

                <div class="formRow">
                    <input v-model="newStudentName" placeholder="Student name" />
                    <input v-model="newStudentCourse" placeholder="Preferred course (optional)" />
                    <button
                        @click="studentStore.addStudent({ name: newStudentName, course: newStudentCourse })">Add</button>
                </div>

                <div v-if="studentStore.students.length === 0" class="empty">No students yet.</div>

                <ul class="list" v-else>
                    <li v-for="s in studentStore.students" :key="s.id" class="item">
                        <div>
                            <div class="title">{{ s.name }}</div>
                            <div class="sub muted">Course: {{ s.course ?? '-' }}</div>
                        </div>
                        <div class="actionsRight">
                            <button class="small" @click="startEditStudent(s)"
                                :disabled="editingStudentId !== null">Edit</button>
                            <button class="small danger" @click="studentStore.deleteStudent(s.id)"
                                :disabled="editingStudentId !== null">Delete</button>
                        </div>
                    </li>
                </ul>

                <div v-if="editingStudentId" class="editBox">
                    <h3>Edit Student</h3>
                    <div class="formRow">
                        <input v-model="editStudentName" placeholder="Student name" />
                        <input v-model="editStudentCourse" placeholder="Preferred course" />
                        <button @click="saveEditStudent">Save</button>
                        <button class="ghost" @click="cancelEditStudent">Cancel</button>
                    </div>
                </div>
            </section>

            <section class="panel">
                <h2>Course Store</h2>
                <div class="muted">Total Courses: <strong>{{ courseStore.totalCourses }}</strong></div>

                <div class="formRow">
                    <input v-model="newCourseTitle" placeholder="Course title" />
                    <button @click="courseStore.addCourse({ title: newCourseTitle })">Add</button>
                </div>

                <ul class="list" v-if="courseStore.courses.length > 0">
                    <li v-for="c in courseStore.courses" :key="c.id" class="item">
                        <div>
                            <div class="title">{{ c.title }}</div>
                        </div>
                        <div class="actionsRight">
                            <button class="small danger" @click="courseStore.deleteCourse(c.id)">Delete</button>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty">No courses yet.</div>
            </section>

            <section class="panel">
                <h2>Enrollment Store</h2>
                <div class="muted">Total Enrollments: <strong>{{ enrollmentStore.totalEnrollments }}</strong></div>

                <div class="formRow">
                    <select v-model="selectedStudentId" :disabled="studentStore.students.length === 0">
                        <option :value="null">Select student</option>
                        <option v-for="s in studentStore.students" :key="s.id" :value="s.id">{{ s.name }}</option>
                    </select>
                    <select v-model="selectedCourseId" :disabled="courseStore.courses.length === 0">
                        <option :value="null">Select course</option>
                        <option v-for="c in courseStore.courses" :key="c.id" :value="c.id">{{ c.title }}</option>
                    </select>
                    <button @click="enroll" :disabled="!selectedStudentId || !selectedCourseId">Enroll</button>
                </div>

                <ul class="list" v-if="enrollmentStore.enrollments.length > 0">
                    <li v-for="e in enrollmentStore.enrollments" :key="e.id" class="item">
                        <div>
                            <div class="title">{{ studentById(e.studentId)?.name ?? 'Unknown student' }} → {{
                                courseById(e.courseId)?.title ?? 'Unknown course' }}</div>
                            <div class="sub muted">Enrolled: {{ new Date(e.enrolledAt).toLocaleString() }}</div>
                        </div>
                        <div class="actionsRight">
                            <button class="small danger" @click="enrollmentStore.removeEnrollment(e.id)">Remove</button>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty">No enrollments yet.</div>
            </section>
        </main>
    </div>
</template>

<style scoped>
.wrap {
    padding: 24px;
    min-height: 100vh;
}

.header {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 18px;
}

.header h1 {
    margin: 0;
    font-size: 28px;
}

.header p {
    margin: 6px 0 0;
    color: #6b7280;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}

@media (max-width: 900px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

.dark :deep(.muted),
.dark :deep(p) {
    color: #9ca3af;
}
</style>
