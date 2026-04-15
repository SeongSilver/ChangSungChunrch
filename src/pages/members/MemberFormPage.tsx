import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useMemberStore } from '@/store/memberStore'
import { memberSchema, type MemberFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DEPARTMENTS = [
  '유아부', '아동부', '중등부', '고등부',
  '청년부', '장년부', '노년부', '기타',
]
const ROLES = ['목사', '전도사', '장로', '권사', '집사', '성도']

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-destructive">{message}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </h3>
  )
}

export default function MemberFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const { addMember, updateMember, getMember } = useMemberStore()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: '',
      gender: 'male',
      birthDate: '',
      phone: '',
      email: '',
      address: '',
      joinDate: new Date().toISOString().slice(0, 10),
      department: '',
      role: '',
      notes: '',
    },
  })

  useEffect(() => {
    if (isEdit && id) {
      const member = getMember(id)
      if (member) {
        reset({
          name: member.name,
          gender: member.gender,
          birthDate: member.birthDate,
          phone: member.phone,
          email: member.email,
          address: member.address,
          joinDate: member.joinDate,
          department: member.department,
          role: member.role,
          notes: member.notes,
        })
      }
    }
  }, [id, isEdit, getMember, reset])

  const onSubmit = (data: MemberFormData) => {
    if (isEdit && id) {
      updateMember(id, data)
      navigate(`/members/${id}`)
    } else {
      const member = addMember(data)
      navigate(`/members/${member.id}`)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        돌아가기
      </Button>

      <div>
        <h2 className="text-base font-semibold">
          {isEdit ? '교인 정보 수정' : '새 교인 등록'}
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {isEdit
            ? '교인의 정보를 수정합니다.'
            : '새로운 교인을 등록합니다. * 표시는 필수 항목입니다.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 기본 정보 */}
        <section className="space-y-4 rounded-lg border p-4">
          <SectionTitle>기본 정보</SectionTitle>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">
                이름 <span className="text-destructive">*</span>
              </Label>
              <Input id="name" placeholder="홍길동" {...register('name')} />
              <FieldError message={errors.name?.message} />
            </div>

            <div className="space-y-1.5">
              <Label>
                성별 <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="성별 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">남성</SelectItem>
                      <SelectItem value="female">여성</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.gender?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="birthDate">생년월일</Label>
              <Input id="birthDate" type="date" {...register('birthDate')} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="joinDate">
                등록일 <span className="text-destructive">*</span>
              </Label>
              <Input id="joinDate" type="date" {...register('joinDate')} />
              <FieldError message={errors.joinDate?.message} />
            </div>
          </div>
        </section>

        {/* 연락처 정보 */}
        <section className="space-y-4 rounded-lg border p-4">
          <SectionTitle>연락처 정보</SectionTitle>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="phone">
                연락처 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="010-0000-0000"
                {...register('phone')}
              />
              <FieldError message={errors.phone?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register('email')}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                placeholder="서울시 강남구..."
                {...register('address')}
              />
            </div>
          </div>
        </section>

        {/* 교회 정보 */}
        <section className="space-y-4 rounded-lg border p-4">
          <SectionTitle>교회 정보</SectionTitle>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>부서</Label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="부서 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">없음</SelectItem>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label>직분</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="직분 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">없음</SelectItem>
                      {ROLES.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">메모</Label>
            <Textarea
              id="notes"
              placeholder="특이사항이나 메모를 입력하세요..."
              rows={3}
              {...register('notes')}
            />
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isEdit ? '수정 완료' : '등록'}
          </Button>
        </div>
      </form>
    </div>
  )
}
