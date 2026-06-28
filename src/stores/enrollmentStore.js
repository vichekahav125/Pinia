import { defineStore } from 'pinia'

const STORAGE_KEY = 'pinia_demo_enrollments'

export const useEnrollmentStore = defineStore('enrollment', {
  state: () => ({
    enrollments: [],
  }),

  getters: {
    totalEnrollments: (state) => state.enrollments.length,
  },

  actions: {
    init() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) this.enrollments = parsed
      } catch {}
    },

    enrollStudent(payload = {}) {
      const studentId = payload?.studentId
      const courseId = payload?.courseId
      if (!studentId || !courseId) return

      const already = this.enrollments.some(
        (e) => e.studentId === studentId && e.courseId === courseId
      )
      if (already) return

      this.enrollments.push({
        id: payload?.id ?? (crypto?.randomUUID?.() ?? String(Date.now())),
        studentId,
        courseId,
        enrolledAt: Date.now(),
      })
    },

    removeEnrollment(enrollmentId) {
      this.enrollments = this.enrollments.filter((e) => e.id !== enrollmentId)
    },

    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.enrollments))
      } catch {}
    },
  },
})

