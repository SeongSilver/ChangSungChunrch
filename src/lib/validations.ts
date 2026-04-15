import { z } from 'zod'

export const memberSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(20, '이름은 20자 이하로 입력해주세요'),
  gender: z.enum(['male', 'female']),
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
