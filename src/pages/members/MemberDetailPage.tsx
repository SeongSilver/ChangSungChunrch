import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  UserRound,
  StickyNote,
} from 'lucide-react'
import { useMemberStore } from '@/store/memberStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface InfoRowProps {
  icon: React.ElementType
  label: string
  value: string
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm">{value}</p>
      </div>
    </div>
  )
}

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getMember, deleteMember } = useMemberStore()
  const [showDelete, setShowDelete] = useState(false)

  const member = getMember(id!)

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <p className="text-sm text-muted-foreground">
          교인을 찾을 수 없습니다.
        </p>
        <Button variant="outline" size="sm" onClick={() => navigate('/members')}>
          목록으로 돌아가기
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    deleteMember(member.id)
    navigate('/members')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => navigate('/members')}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        교인 목록
      </Button>

      {/* Profile Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <UserRound className="h-7 w-7 text-primary" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <Badge
                variant={member.gender === 'male' ? 'default' : 'secondary'}
              >
                {member.gender === 'male' ? '남성' : '여성'}
              </Badge>
            </div>
            {(member.department || member.role) && (
              <p className="mt-1 text-sm text-muted-foreground">
                {[member.department, member.role].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/members/${id}/edit`)}
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

      <Separator />

      {/* Contact Info */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          연락처 정보
        </h3>
        <div className="space-y-3">
          <InfoRow icon={Phone} label="연락처" value={member.phone} />
          <InfoRow icon={Mail} label="이메일" value={member.email} />
          <InfoRow icon={MapPin} label="주소" value={member.address} />
        </div>
      </section>

      {(member.joinDate ||
        member.birthDate ||
        member.department ||
        member.role) && (
        <>
          <Separator />
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              교회 정보
            </h3>
            <div className="space-y-3">
              <InfoRow icon={Calendar} label="등록일" value={member.joinDate} />
              <InfoRow
                icon={Calendar}
                label="생년월일"
                value={member.birthDate}
              />
              <InfoRow icon={Users} label="부서" value={member.department} />
              <InfoRow icon={UserRound} label="직분" value={member.role} />
            </div>
          </section>
        </>
      )}

      {member.notes && (
        <>
          <Separator />
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              메모
            </h3>
            <div className="flex gap-3">
              <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="whitespace-pre-wrap text-sm">{member.notes}</p>
            </div>
          </section>
        </>
      )}

      {/* Meta */}
      <p className="text-xs text-muted-foreground/60">
        마지막 수정: {new Date(member.updatedAt).toLocaleDateString('ko-KR')}
      </p>

      {/* Delete Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>교인 삭제</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">{member.name}</span>{' '}
              교인을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
