import { create } from 'zustand'
import axios from 'axios'
import { User, Train, Alert, Conflict } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  login: (id: string, password: string) => Promise<boolean>
  logout: () => void
}

interface UIState {
  darkMode: boolean
  toggleDarkMode: () => void
  selectedTrain: Train | null
  selectTrain: (train: Train | null) => void
  selectedSection: string | null
  selectSection: (section: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (id: string, _password: string) => {
    // Temporary bypass: Always succeed with mock user for development
    // TODO: Implement actual backend validation
    const mockUser: User = {
      id: '1',
      email: id, // Use ID as email for now
      name: 'Admin User',
      avatarUrl: 'https://i.pravatar.cc/150?img=3'
    }
    const mockToken = 'mock-token-' + Date.now()

    // Update store with mock user and token
    set({ user: mockUser, token: mockToken })
    return true
  },
  logout: () => set({ user: null, token: null }),
}))

export const useUIStore = create<UIState>((set) => ({
  darkMode: false, // Default to light mode
  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.darkMode
      // Apply 'dark' class to document element for Tailwind dark mode
      if (newDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { darkMode: newDarkMode }
    })
  },
  selectedTrain: null,
  selectTrain: (train) => set({ selectedTrain: train }),
  selectedSection: null,
  selectSection: (section) => set({ selectedSection: section }),
}))
