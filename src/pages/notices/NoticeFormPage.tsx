import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useNoticeStore } from '@/store/noticeStore'
import { noticeSchema, type NoticeFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-destructive">{message}</p>
}

export default function NoticeFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const { addNotice, updateNotice, getNotice } = useNoticeStore()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NoticeFormData>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: '',
      content: '',
      isPinned: false,
    },
  })

  const isPinned = watch('isPinned')

  useEffect(() => {
    if (isEdit && id) {
      const notice = getNotice(id)
      if (notice) {
        reset({
          title: notice.title,
          content: notice.content,
          isPinned: notice.isPinned,
        })
      }
    }
  }, [id, isEdit, getNotice, reset])

  const onSubmit = (data: NoticeFormData) => {
    if (isEdit && id) {
      updateNotice(id, data)
      navigate(`/notices/${id}`)
    } else {
      const notice = addNotice(data)
      navigate(`/notices/${notice.id}`)
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
          {isEdit ? '공지 수정' : '공지 작성'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="title">
            제목 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="공지 제목을 입력하세요"
            {...register('title')}
          />
          <FieldError message={errors.title?.message} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="content">
            내용 <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="content"
            placeholder="공지 내용을 입력하세요..."
            rows={10}
            className="resize-y"
            {...register('content')}
          />
          <FieldError message={errors.content?.message} />
        </div>

        {/* 상단 고정 토글 */}
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/40">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isPinned}
              onChange={(e) => setValue('isPinned', e.target.checked)}
            />
            <div
              className={`h-5 w-9 rounded-full transition-colors ${
                isPinned ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                isPinned ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </div>
          <div>
            <p className="text-sm font-medium">상단 고정</p>
            <p className="text-xs text-muted-foreground">
              목록 최상단에 고정 표시됩니다
            </p>
          </div>
        </label>

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
