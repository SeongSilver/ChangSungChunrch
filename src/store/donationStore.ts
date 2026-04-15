import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Donation } from '@/types'

const SEED_DONATIONS: Donation[] = [
  {
    id: 'donation-1',
    memberId: 'seed-1',
    memberName: '김민준',
    amount: 500000,
    type: '십일조',
    date: '2026-04-07',
    notes: '',
    createdAt: '2026-04-07T00:00:00.000Z',
    updatedAt: '2026-04-07T00:00:00.000Z',
  },
  {
    id: 'donation-2',
    memberId: 'seed-2',
    memberName: '이서연',
    amount: 200000,
    type: '감사헌금',
    date: '2026-04-07',
    notes: '부활절 감사',
    createdAt: '2026-04-07T00:00:00.000Z',
    updatedAt: '2026-04-07T00:00:00.000Z',
  },
  {
    id: 'donation-3',
    memberId: 'seed-3',
    memberName: '박지호',
    amount: 100000,
    type: '십일조',
    date: '2026-04-07',
    notes: '',
    createdAt: '2026-04-07T00:00:00.000Z',
    updatedAt: '2026-04-07T00:00:00.000Z',
  },
  {
    id: 'donation-4',
    memberId: 'seed-5',
    memberName: '정성호',
    amount: 300000,
    type: '십일조',
    date: '2026-04-13',
    notes: '',
    createdAt: '2026-04-13T00:00:00.000Z',
    updatedAt: '2026-04-13T00:00:00.000Z',
  },
  {
    id: 'donation-5',
    memberId: '',
    memberName: '익명',
    amount: 100000,
    type: '특별헌금',
    date: '2026-04-13',
    notes: '',
    createdAt: '2026-04-13T00:00:00.000Z',
    updatedAt: '2026-04-13T00:00:00.000Z',
  },
  {
    id: 'donation-6',
    memberId: 'seed-1',
    memberName: '김민준',
    amount: 1000000,
    type: '건축헌금',
    date: '2026-03-15',
    notes: '건축헌금',
    createdAt: '2026-03-15T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z',
  },
  {
    id: 'donation-7',
    memberId: 'seed-4',
    memberName: '최유진',
    amount: 50000,
    type: '감사헌금',
    date: '2026-03-24',
    notes: '',
    createdAt: '2026-03-24T00:00:00.000Z',
    updatedAt: '2026-03-24T00:00:00.000Z',
  },
  {
    id: 'donation-8',
    memberId: 'seed-6',
    memberName: '한소희',
    amount: 50000,
    type: '감사헌금',
    date: '2026-04-13',
    notes: '',
    createdAt: '2026-04-13T00:00:00.000Z',
    updatedAt: '2026-04-13T00:00:00.000Z',
  },
]

interface DonationStore {
  donations: Donation[]
  addDonation: (data: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>) => Donation
  updateDonation: (
    id: string,
    data: Partial<Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>>
  ) => void
  deleteDonation: (id: string) => void
  getDonation: (id: string) => Donation | undefined
}

export const useDonationStore = create<DonationStore>()(
  persist(
    (set, get) => ({
      donations: SEED_DONATIONS,
      addDonation: (data) => {
        const donation: Donation = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ donations: [...state.donations, donation] }))
        return donation
      },
      updateDonation: (id, data) =>
        set((state) => ({
          donations: state.donations.map((d) =>
            d.id === id
              ? { ...d, ...data, updatedAt: new Date().toISOString() }
              : d
          ),
        })),
      deleteDonation: (id) =>
        set((state) => ({
          donations: state.donations.filter((d) => d.id !== id),
        })),
      getDonation: (id) => get().donations.find((d) => d.id === id),
    }),
    { name: 'church-donations' }
  )
)
