import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, MoreHorizontal, Pencil, Trash2, UserRound } from 'lucide-react'
import { useMemberStore } from '@/store/memberStore'
import { Member } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function MembersPage() {
  const navigate = useNavigate()
  const { members, deleteMember } = useMemberStore()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null)

  const filtered = members.filter(
    (m) =>
      m.name.includes(search) ||
      m.phone.includes(search) ||
      m.department.includes(search) ||
      m.role.includes(search)
  )

  const handleDelete = () => {
    if (deleteTarget) {
      deleteMember(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Page Actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          총{' '}
          <span className="font-medium text-foreground">{filtered.length}</span>
          명
        </p>
        <Button size="sm" onClick={() => navigate('/members/new')}>
          <Plus className="mr-1.5 h-4 w-4" />
          새 교인 등록
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="이름, 연락처, 부서 검색"
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-lg border md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-32">이름</TableHead>
              <TableHead className="w-16">성별</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>부서</TableHead>
              <TableHead>직분</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-16 text-center text-sm text-muted-foreground"
                >
                  {search ? '검색 결과가 없습니다.' : '등록된 교인이 없습니다.'}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((member) => (
                <TableRow
                  key={member.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/members/${member.id}`)}
                >
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={member.gender === 'male' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {member.gender === 'male' ? '남' : '여'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.phone}
                  </TableCell>
                  <TableCell>
                    {member.department ? (
                      <span className="text-sm">{member.department}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {member.role ? (
                      <span className="text-sm">{member.role}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.joinDate}
                  </TableCell>
                  <TableCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/members/${member.id}/edit`)
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteTarget(member)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card List */}
      <div className="space-y-2 md:hidden">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            {search ? '검색 결과가 없습니다.' : '등록된 교인이 없습니다.'}
          </p>
        ) : (
          filtered.map((member) => (
            <div
              key={member.id}
              className={cn(
                'flex cursor-pointer items-center justify-between',
                'rounded-lg border bg-card p-4',
                'transition-colors hover:bg-muted/50'
              )}
              onClick={() => navigate(`/members/${member.id}`)}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <UserRound className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{member.name}</span>
                    <Badge
                      variant={
                        member.gender === 'male' ? 'default' : 'secondary'
                      }
                      className="h-4 px-1 text-[10px]"
                    >
                      {member.gender === 'male' ? '남' : '여'}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {member.phone}
                    {member.department && ` · ${member.department}`}
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-1"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => navigate(`/members/${member.id}/edit`)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => setDeleteTarget(member)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>교인 삭제</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
              </span>{' '}
              교인을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
