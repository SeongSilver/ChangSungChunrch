import { useNavigate } from 'react-router-dom'
import { Users, UserRound, BarChart3 } from 'lucide-react'
import { useMemberStore } from '@/store/memberStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface StatCardProps {
  title: string
  value: string | number
  sub?: string
  icon: React.ElementType
  onClick?: () => void
}

function StatCard({ title, value, sub, icon: Icon, onClick }: StatCardProps) {
  return (
    <Card
      className={onClick ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const members = useMemberStore((s) => s.members)

  const total = members.length
  const male = members.filter((m) => m.gender === 'male').length
  const female = members.filter((m) => m.gender === 'female').length

  const deptCounts = members.reduce<Record<string, number>>((acc, m) => {
    const dept = m.department || '미분류'
    acc[dept] = (acc[dept] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold">안녕하세요 👋</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          교회 관리 시스템 현황입니다.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="전체 교인"
          value={`${total}명`}
          sub={`남 ${male}명 · 여 ${female}명`}
          icon={Users}
          onClick={() => navigate('/members')}
        />
        <StatCard
          title="남성"
          value={`${male}명`}
          sub={`전체의 ${total ? Math.round((male / total) * 100) : 0}%`}
          icon={UserRound}
        />
        <StatCard
          title="여성"
          value={`${female}명`}
          sub={`전체의 ${total ? Math.round((female / total) * 100) : 0}%`}
          icon={UserRound}
        />
      </div>

      {/* Department Summary */}
      {Object.keys(deptCounts).length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">부서별 현황</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(deptCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([dept, count]) => (
                <div key={dept} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-sm text-muted-foreground">
                    {dept}
                  </span>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(count / total) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-muted-foreground">
                      {count}명
                    </span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      {/* Phase 3 placeholder */}
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
        <BarChart3 className="h-8 w-8 text-muted-foreground/40" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            헌금 통계 · 출석 현황
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground/60">
            Phase 3에서 추가될 예정입니다
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/members')}
        >
          교인 관리 바로가기
        </Button>
      </div>
    </div>
  )
}
