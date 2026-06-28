import { defineStore } from 'pinia'

const STORAGE_KEY = 'pinia_demo_courses'

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [],
  }),

  getters: {
    totalCourses: (state) => state.courses.length,
  },

  actions: {
    init() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) this.courses = parsed
      } catch {}
    },

    addCourse(payload = {}) {
      const title = String(payload?.title ?? '').trim()
      if (!title) return

      this.courses.push({
        id: payload?.id ?? (crypto?.randomUUID?.() ?? String(Date.now())),
        title,
      })
    },

    deleteCourse(courseId) {
      this.courses = this.courses.filter((c) => c.id !== courseId)
    },

    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.courses))
      } catch {}
    },
  },
})

