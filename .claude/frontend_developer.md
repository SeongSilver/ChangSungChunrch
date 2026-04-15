# 에이전트: 프론트엔드 개발자 (Frontend Developer)

## 역할
React.js v19 기반 교회 관리 시스템 UI 구현

## 기술 스택
- React.js v19
- TypeScript (strict mode)
- Zustand (상태 관리)
- Tailwind CSS
- shadcn/ui (컴포넌트)
- React Router v6
- React Hook Form + Zod
- Recharts (통계 차트)
- Axios (HTTP 클라이언트)
- date-fns (날짜 처리)

## 페이지 구조

### 라우팅
```
/login              → 로그인
/                   → 메인 (교회 소개)
/members            → 교인 목록
/members/new        → 교인 등록
/members/:id        → 교인 상세/수정
/offerings          → 헌금 목록
/offerings/new      → 헌금 등록
/stats              → 헌금 통계
/board              → 게시판 목록
/board/new          → 글쓰기
/board/:id          → 게시글 상세
```

### 레이아웃
- 로그인 페이지: 전체 화면 센터 레이아웃
- 메인 앱: Sidebar(LNB) + Header + Content 레이아웃
  - LNB 메뉴: 교인등록, 헌금등록, 통계, 교회게시판

## Zustand 스토어 구조
```typescript
// authStore: 인증 상태
interface AuthStore {
  user: User | null
  token: string | null
  login: (credentials) => Promise<void>
  logout: () => void
}

// memberStore: 교인 관리
interface MemberStore {
  members: Member[]
  fetchMembers: () => Promise<void>
  createMember: (data) => Promise<void>
  updateMember: (id, data) => Promise<void>
  deleteMember: (id) => Promise<void>
}

// offeringStore: 헌금 관리
interface OfferingStore {
  offerings: Offering[]
  stats: OfferingStats | null
  fetchOfferings: (filters?) => Promise<void>
  fetchStats: (period, params) => Promise<void>
  createOffering: (data) => Promise<void>
}

// postStore: 게시판
interface PostStore {
  posts: Post[]
  currentPost: Post | null
  fetchPosts: () => Promise<void>
  fetchPost: (id) => Promise<void>
  createPost: (data) => Promise<void>
}
```

## 헌금 타입
```typescript
type OfferingType = '주일헌금' | '감사헌금' | '십일조' | '선교헌금' | '기타헌금'
```

## 주요 컴포넌트
- Layout/Sidebar.tsx: LNB 네비게이션
- Layout/Header.tsx: 상단 헤더 (사용자 정보, 로그아웃)
- Members/MemberForm.tsx: 교인 등록/수정 폼
- Members/MemberTable.tsx: 교인 목록 테이블
- Offerings/OfferingForm.tsx: 헌금 등록 폼
- Offerings/OfferingTable.tsx: 헌금 목록
- Stats/YearlyChart.tsx: 연간 통계 차트
- Stats/MonthlyChart.tsx: 월별 통계
- Stats/WeeklyChart.tsx: 주별 통계
- Board/PostList.tsx: 게시글 목록
- Board/PostEditor.tsx: 게시글 작성/수정
- Common/ProtectedRoute.tsx: 인증 보호 라우트

## 디자인 가이드
- 색상 팔레트: 교회 특성에 맞게 따뜻하고 신뢰감 있는 색상 (딥 블루, 골드 액센트)
- 폰트: Noto Sans KR (한국어 지원)
- 반응형: 모바일 우선 설계
- 다크/라이트 모드 지원 (shadcn 기본 테마 활용)

## 초기 설정 명령어
```bash
npx create-react-app frontend --template typescript
cd frontend
npm install zustand react-router-dom axios
npm install react-hook-form zod @hookform/resolvers
npm install recharts date-fns
npx shadcn@latest init
npx shadcn@latest add button input form table card dialog
npx shadcn@latest add select textarea badge tabs sidebar
npm install -D tailwindcss postcss autoprefixer
```

## API 연동
- baseURL: http://localhost:3001/api
- 인증: Authorization: Bearer {token} 헤더
- 토큰은 localStorage에 저장
- Axios 인터셉터로 토큰 자동 첨부 및 401 처리
