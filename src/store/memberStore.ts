import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Member } from '@/types'

const SEED_MEMBERS: Member[] = [
  {
    id: 'seed-1',
    name: '김민준',
    gender: 'male',
    birthDate: '1975-05-20',
    phone: '010-1234-5678',
    email: 'minjun@email.com',
    address: '서울시 강남구 역삼동',
    joinDate: '2018-03-01',
    department: '장년부',
    role: '장로',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-2',
    name: '이서연',
    gender: 'female',
    birthDate: '1982-08-15',
    phone: '010-2345-6789',
    email: '',
    address: '서울시 서초구 서초동',
    joinDate: '2019-06-15',
    department: '장년부',
    role: '권사',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-3',
    name: '박지호',
    gender: 'male',
    birthDate: '1995-11-30',
    phone: '010-3456-7890',
    email: 'jiho.park@email.com',
    address: '서울시 마포구 합정동',
    joinDate: '2021-01-10',
    department: '청년부',
    role: '성도',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-4',
    name: '최유진',
    gender: 'female',
    birthDate: '1998-03-25',
    phone: '010-4567-8901',
    email: 'yujin@email.com',
    address: '서울시 송파구 잠실동',
    joinDate: '2022-09-01',
    department: '청년부',
    role: '성도',
    notes: '새신자',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-5',
    name: '정성호',
    gender: 'male',
    birthDate: '1968-12-10',
    phone: '010-5678-9012',
    email: '',
    address: '경기도 성남시 분당구',
    joinDate: '2015-04-20',
    department: '장년부',
    role: '집사',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-6',
    name: '한소희',
    gender: 'female',
    birthDate: '2001-07-08',
    phone: '010-6789-0123',
    email: 'sohee@email.com',
    address: '서울시 용산구 이태원동',
    joinDate: '2023-02-12',
    department: '청년부',
    role: '성도',
    notes: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

interface MemberStore {
  members: Member[]
  addMember: (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => Member
  updateMember: (
    id: string,
    data: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>
  ) => void
  deleteMember: (id: string) => void
  getMember: (id: string) => Member | undefined
}

export const useMemberStore = create<MemberStore>()(
  persist(
    (set, get) => ({
      members: SEED_MEMBERS,
      addMember: (data) => {
        const member: Member = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ members: [...state.members, member] }))
        return member
      },
      updateMember: (id, data) =>
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id
              ? { ...m, ...data, updatedAt: new Date().toISOString() }
              : m
          ),
        })),
      deleteMember: (id) =>
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        })),
      getMember: (id) => get().members.find((m) => m.id === id),
    }),
    { name: 'church-members' }
  )
)
