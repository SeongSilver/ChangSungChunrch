import { z } from 'zod'
import { DONATION_TYPES } from '@/types'

// ── Member ────────────────────────────────────────────────────────────────
export const memberSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(20, '이름은 20자 이하로 입력해주세요'),
  gender: z.enum(['male', 'female'] as const),
  birthDate: z.string(),
  phone: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .regex(/^[0-9\-+\s()]+$/, '올바른 연락처 형식이 아닙니다'),
  email: z
    .string()
    .refine(
      (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      '올바른 이메일 형식이 아닙니다'
    ),
  address: z.string(),
  joinDate: z.string().min(1, '등록일을 입력해주세요'),
  department: z.string(),
  role: z.string(),
  notes: z.string(),
})

export type MemberFormData = z.infer<typeof memberSchema>

// ── Donation ──────────────────────────────────────────────────────────────
export const donationSchema = z.object({
  memberId: z.string().min(1, '헌금자를 선택해주세요'),
  amount: z
    .number({ message: '금액을 입력해주세요' })
    .min(1, '금액은 1원 이상이어야 합니다'),
  type: z.enum(DONATION_TYPES),
  date: z.string().min(1, '날짜를 입력해주세요'),
  notes: z.string(),
})

export type DonationFormData = z.infer<typeof donationSchema>

// ── Notice ────────────────────────────────────────────────────────────────
export const noticeSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(100, '제목은 100자 이하로 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  isPinned: z.boolean(),
})

export type NoticeFormData = z.infer<typeof noticeSchema>
