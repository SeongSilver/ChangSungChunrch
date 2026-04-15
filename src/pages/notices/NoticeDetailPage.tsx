import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, Pin } from 'lucide-react'
import { useNoticeStore } from '@/store/noticeStore'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getNotice, deleteNotice } = useNoticeStore()
  const [showDelete, setShowDelete] = useState(false)

  const notice = getNotice(id!)

  if (!notice) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <p className="text-sm text-muted-foreground">공지를 찾을 수 없습니다.</p>
        <Button variant="outline" size="sm" onClick={() => navigate('/notices')}>
          목록으로
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    deleteNotice(notice.id)
    navigate('/notices')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => navigate('/notices')}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        공지 목록
      </Button>

      <div className="space-y-3">
        {/* Title */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {notice.isPinned && (
              <div className="flex items-center gap-1.5 text-primary">
                <Pin className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">상단 고정</span>
              </div>
            )}
            <h2 className="text-xl font-semibold leading-snug">
              {notice.title}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/notices/${id}/edit`)}
            >
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              수정
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-destructive hover:text-destructive"
              onClick={() => setShowDelete(true)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {formatDate(notice.createdAt)}
          {notice.updatedAt !== notice.createdAt &&
            ` · 수정됨 ${formatDate(notice.updatedAt)}`}
        </p>
      </div>

      <Separator />

      {/* Content */}
      <div className="prose prose-sm max-w-none">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {notice.content}
        </p>
      </div>

      {/* Delete Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공지사항 삭제</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">
                {notice.title}
              </span>{' '}
              공지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
