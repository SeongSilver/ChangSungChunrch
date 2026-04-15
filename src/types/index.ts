export type Gender = 'male' | 'female'

export type Department =
  | '유아부'
  | '아동부'
  | '중등부'
  | '고등부'
  | '청년부'
  | '장년부'
  | '노년부'
  | '기타'

export type MemberRole = '목사' | '전도사' | '장로' | '권사' | '집사' | '성도'

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
