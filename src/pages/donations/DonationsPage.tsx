import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  TrendingUp,
  Receipt,
} from 'lucide-react'
import { useDonationStore } from '@/store/donationStore'
import { DONATION_TYPES, type Donation, type DonationType } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const TYPE_COLORS: Record<DonationType, string> = {
  십일조: 'bg-blue-100 text-blue-700',
  감사헌금: 'bg-green-100 text-green-700',
  건축헌금: 'bg-orange-100 text-orange-700',
  특별헌금: 'bg-purple-100 text-purple-700',
  기타: 'bg-gray-100 text-gray-600',
}

function formatKRW(amount: number) {
  return `${amount.toLocaleString('ko-KR')}원`
}

function getMonthLabel(yyyyMM: string) {
  const [y, m] = yyyyMM.split('-')
  return `${y}년 ${m}월`
}

export default function DonationsPage() {
  const navigate = useNavigate()
  const { donations, deleteDonation } = useDonationStore()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<DonationType | 'all'>('all')
  const [monthFilter, setMonthFilter] = useState<string>(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })
  const [deleteTarget, setDeleteTarget] = useState<Donation | null>(null)

  // Derive unique months from donations
  const months = [
    ...new Set(donations.map((d) => d.date.slice(0, 7))),
  ].sort((a, b) => b.localeCompare(a))

  const filtered = donations
    .filter((d) => {
      const matchSearch =
        !search ||
        d.memberName.includes(search) ||
        d.notes.includes(search)
      const matchType = typeFilter === 'all' || d.type === typeFilter
      const matchMonth = !monthFilter || d.date.startsWith(monthFilter)
      return matchSearch && matchType && matchMonth
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  const totalAmount = filtered.reduce((sum, d) => sum + d.amount, 0)

  const handleDelete = () => {
    if (deleteTarget) {
      deleteDonation(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {monthFilter ? getMonthLabel(monthFilter) : '전체'} 총 헌금액
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatKRW(totalAmount)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {filtered.length}건
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              종류별 현황
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {DONATION_TYPES.map((type) => {
                const count = filtered.filter((d) => d.type === type).length
                if (count === 0) return null
                return (
                  <span
                    key={type}
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium',
                      TYPE_COLORS[type]
                    )}
                  >
                    {type} {count}
                  </span>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-40 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="헌금자, 메모 검색"
            className="pl-9"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>

        <Select
          value={monthFilter}
          onValueChange={setMonthFilter}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="월 선택" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {getMonthLabel(m)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as DonationType | 'all')}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="종류" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            {DONATION_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          size="sm"
          className="ml-auto"
          onClick={() => navigate('/donations/new')}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          헌금 등록
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-lg border md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead>날짜</TableHead>
              <TableHead>헌금자</TableHead>
              <TableHead>종류</TableHead>
              <TableHead className="text-right">금액</TableHead>
              <TableHead>메모</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-16 text-center text-sm text-muted-foreground"
                >
                  등록된 헌금 내역이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="text-muted-foreground">
                    {donation.date}
                  </TableCell>
                  <TableCell className="font-medium">
                    {donation.memberName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'border-0 text-xs',
                        TYPE_COLORS[donation.type]
                      )}
                    >
                      {donation.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {formatKRW(donation.amount)}
                  </TableCell>
                  <TableCell className="max-w-40 truncate text-muted-foreground">
                    {donation.notes || '-'}
                  </TableCell>
                  <TableCell>
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
                            navigate(`/donations/${donation.id}/edit`)
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteTarget(donation)}
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

      {/* Mobile Cards */}
      <div className="space-y-2 md:hidden">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            등록된 헌금 내역이 없습니다.
          </p>
        ) : (
          filtered.map((donation) => (
            <div
              key={donation.id}
              className="flex items-center justify-between rounded-lg border bg-card p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {donation.memberName}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium',
                      TYPE_COLORS[donation.type]
                    )}
                  >
                    {donation.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{donation.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tabular-nums text-sm">
                  {formatKRW(donation.amount)}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(`/donations/${donation.id}/edit`)
                      }
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      수정
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => setDeleteTarget(donation)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>헌금 내역 삭제</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">
                {deleteTarget?.memberName}
              </span>
              의{' '}
              <span className="font-medium text-foreground">
                {deleteTarget?.date}
              </span>{' '}
              헌금 내역을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
