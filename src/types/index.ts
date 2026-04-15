// ── Member ────────────────────────────────────────────────────────────────
export type Gender = 'male' | 'female'

export interface Member {
  id: string
  name: string
  gender: Gender
  birthDate: string   // YYYY-MM-DD
  phone: string
  email: string
  address: string
  joinDate: string    // YYYY-MM-DD
  department: string
  role: string
  notes: string
  createdAt: string
  updatedAt: string
}

// ── Donation ──────────────────────────────────────────────────────────────
export const DONATION_TYPES = [
  '십일조',
  '감사헌금',
  '건축헌금',
  '특별헌금',
  '기타',
] as const

export type DonationType = (typeof DONATION_TYPES)[number]

export interface Donation {
  id: string
  memberId: string      // '' if anonymous
  memberName: string    // cached at save time
  amount: number
  type: DonationType
  date: string          // YYYY-MM-DD
  notes: string
  createdAt: string
  updatedAt: string
}

// ── Notice ────────────────────────────────────────────────────────────────
export interface Notice {
  id: string
  title: string
  content: string
  isPinned: boolean
  createdAt: string
  updatedAt: string
}
