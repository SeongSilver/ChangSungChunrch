import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Notice } from '@/types'

const SEED_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: '4월 정기 제직회 공지',
    content:
      '4월 정기 제직회를 아래와 같이 안내드립니다.\n\n일시: 2026년 4월 19일(주일) 오후 1시\n장소: 본당 2층 회의실\n\n제직 여러분의 많은 참석 부탁드립니다.',
    isPinned: true,
    createdAt: '2026-04-10T00:00:00.000Z',
    updatedAt: '2026-04-10T00:00:00.000Z',
  },
  {
    id: 'notice-2',
    title: '부활절 연합예배 안내',
    content:
      '부활절을 맞이하여 연합예배를 드립니다.\n\n일시: 2026년 4월 5일(주일) 오전 11시\n장소: 본당\n\n특별찬양과 성찬식이 함께 진행됩니다. 온 성도님의 참석을 바랍니다.',
    isPinned: false,
    createdAt: '2026-04-01T00:00:00.000Z',
    updatedAt: '2026-04-01T00:00:00.000Z',
  },
  {
    id: 'notice-3',
    title: '주일학교 교사 봉사자 모집',
    content:
      '주일학교 교사 봉사자를 모집합니다.\n\n대상: 청년부 이상 성도\n봉사 시간: 주일 오전 9시 ~ 11시\n\n관심 있으신 분은 담당 전도사님께 연락 주세요.',
    isPinned: false,
    createdAt: '2026-03-28T00:00:00.000Z',
    updatedAt: '2026-03-28T00:00:00.000Z',
  },
]

interface NoticeStore {
  notices: Notice[]
  addNotice: (data: Omit<Notice, 'id' | 'createdAt' | 'updatedAt'>) => Notice
  updateNotice: (
    id: string,
    data: Partial<Omit<Notice, 'id' | 'createdAt' | 'updatedAt'>>
  ) => void
  deleteNotice: (id: string) => void
  getNotice: (id: string) => Notice | undefined
}

export const useNoticeStore = create<NoticeStore>()(
  persist(
    (set, get) => ({
      notices: SEED_NOTICES,
      addNotice: (data) => {
        const notice: Notice = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          notices: [notice, ...state.notices],
        }))
        return notice
      },
      updateNotice: (id, data) =>
        set((state) => ({
          notices: state.notices.map((n) =>
            n.id === id
              ? { ...n, ...data, updatedAt: new Date().toISOString() }
              : n
          ),
        })),
      deleteNotice: (id) =>
        set((state) => ({
          notices: state.notices.filter((n) => n.id !== id),
        })),
      getNotice: (id) => get().notices.find((n) => n.id === id),
    }),
    { name: 'church-notices' }
  )
)
