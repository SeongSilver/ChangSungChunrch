import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pin, Trash2, Pencil } from 'lucide-react'
import { useNoticeStore } from '@/store/noticeStore'
import { type Notice } from '@/types'
import { Button } from '@/components/ui/button'
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
  })
}

export default function NoticesPage() {
  const navigate = useNavigate()
  const { notices, deleteNotice } = useNoticeStore()
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null)

  const sorted = [...notices].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
    return b.createdAt.localeCompare(a.createdAt)
  })

  const handleDelete = () => {
    if (deleteTarget) {
      deleteNotice(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          총{' '}
          <span className="font-medium text-foreground">{notices.length}</span>
          건
        </p>
        <Button size="sm" onClick={() => navigate('/notices/new')}>
          <Plus className="mr-1.5 h-4 w-4" />
          공지 작성
        </Button>
      </div>

      <div className="space-y-2">
        {sorted.length === 0 ? (
          <div className="rounded-lg border border-dashed p-16 text-center text-sm text-muted-foreground">
            등록된 공지사항이 없습니다.
          </div>
        ) : (
          sorted.map((notice) => (
            <div
              key={notice.id}
              className="group flex cursor-pointer items-start justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-muted/40"
              onClick={() => navigate(`/notices/${notice.id}`)}
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  {notice.isPinned && (
                    <Pin className="h-3.5 w-3.5 shrink-0 text-primary" />
                  )}
                  <p
                    className={`truncate text-sm font-medium ${
                      notice.isPinned ? 'text-primary' : ''
                    }`}
                  >
                    {notice.title}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(notice.createdAt)}
                </p>
              </div>

              <div
                className="ml-4 flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => navigate(`/notices/${notice.id}/edit`)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => setDeleteTarget(notice)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공지사항 삭제</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">
                {deleteTarget?.title}
              </span>{' '}
              공지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
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
