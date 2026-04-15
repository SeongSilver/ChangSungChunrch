import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const ROUTE_TITLES: Array<{ pattern: RegExp; title: string }> = [
  { pattern: /^\/members\/new$/, title: '교인 등록' },
  { pattern: /^\/members\/.+\/edit$/, title: '교인 수정' },
  { pattern: /^\/members\/.+$/, title: '교인 상세' },
  { pattern: /^\/members$/, title: '교인 관리' },
  { pattern: /^\/dashboard$/, title: '대시보드' },
]

function getTitle(pathname: string) {
  return (
    ROUTE_TITLES.find(({ pattern }) => pattern.test(pathname))?.title ??
    '교회 관리 시스템'
  )
}

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation()
  const title = getTitle(location.pathname)

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={onMenuClick}
        aria-label="메뉴 열기"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <h1 className="text-sm font-semibold">{title}</h1>
    </header>
  )
}
