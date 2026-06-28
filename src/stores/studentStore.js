import { defineStore } from 'pinia'

const STORAGE_KEY = 'pinia_demo_students'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [],
  }),

  getters: {
    totalStudents: (state) => state.students.length,
  },

  actions: {
    init() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) this.students = parsed
      } catch {}
    },

    addStudent(payload = {}) {
      const name = String(payload?.name ?? '').trim()
      if (!name) return

      const course = String(payload?.course ?? '').trim() || undefined

      this.students.push({
        id: payload?.id ?? (crypto?.randomUUID?.() ?? String(Date.now())),
        name,
        course,
      })
    },

    deleteStudent(studentId) {
      this.students = this.students.filter((s) => s.id !== studentId)
    },

    updateStudent(payload = {}) {
      const { id } = payload
      if (!id) return

      const student = this.students.find((s) => s.id === id)
      if (!student) return

      if (payload?.name !== undefined) {
        const name = String(payload.name).trim()
        if (name) student.name = name
      }

      if (payload?.course !== undefined) {
        const course = String(payload.course).trim()
        student.course = course || undefined
      }
    },

    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.students))
      } catch {}
    },
  },
})

