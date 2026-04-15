import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useDonationStore } from '@/store/donationStore'
import { useMemberStore } from '@/store/memberStore'
import { DONATION_TYPES } from '@/types'
import { donationSchema, type DonationFormData } from '@/lib/validations'
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-destructive">{message}</p>
}

export default function DonationFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const { addDonation, updateDonation, getDonation } = useDonationStore()
  const members = useMemberStore((s) => s.members)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      memberId: '',
      amount: 0,
      type: '십일조',
      date: new Date().toISOString().slice(0, 10),
      notes: '',
    },
  })

  useEffect(() => {
    if (isEdit && id) {
      const donation = getDonation(id)
      if (donation) {
        reset({
          memberId: donation.memberId || 'anonymous',
          amount: donation.amount,
          type: donation.type,
          date: donation.date,
          notes: donation.notes,
        })
      }
    }
  }, [id, isEdit, getDonation, reset])

  const onSubmit = (data: DonationFormData) => {
    // Resolve memberName from memberId
    const member = members.find((m) => m.id === data.memberId)
    const memberName =
      data.memberId === 'anonymous'
        ? '익명'
        : (member?.name ?? data.memberId)

    const payload = {
      memberId: data.memberId === 'anonymous' ? '' : data.memberId,
      memberName,
      amount: data.amount,
      type: data.type,
      date: data.date,
      notes: data.notes,
    }

    if (isEdit && id) {
      updateDonation(id, payload)
    } else {
      addDonation(payload)
    }
    navigate('/donations')
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
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
          {isEdit ? '헌금 내역 수정' : '헌금 등록'}
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {isEdit ? '헌금 내역을 수정합니다.' : '새로운 헌금 내역을 등록합니다.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <section className="space-y-4 rounded-lg border p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* 헌금자 */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label>
                헌금자 <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="memberId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="헌금자 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anonymous">익명</SelectItem>
                      {members.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                          {m.department ? ` (${m.department})` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.memberId?.message} />
            </div>

            {/* 날짜 */}
            <div className="space-y-1.5">
              <Label htmlFor="date">
                날짜 <span className="text-destructive">*</span>
              </Label>
              <Input id="date" type="date" {...register('date')} />
              <FieldError message={errors.date?.message} />
            </div>

            {/* 종류 */}
            <div className="space-y-1.5">
              <Label>
                종류 <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="종류 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {DONATION_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* 금액 */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="amount">
                금액 (원) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                min={0}
                step={10000}
                placeholder="0"
                {...register('amount', { valueAsNumber: true })}
              />
              <FieldError message={errors.amount?.message} />
            </div>

            {/* 메모 */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="notes">메모</Label>
              <Textarea
                id="notes"
                placeholder="특이사항 등 메모를 입력하세요..."
                rows={2}
                {...register('notes')}
              />
            </div>
          </div>
        </section>

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
