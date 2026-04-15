# 에이전트: 디자이너 (Designer)

## 역할
교회 관리 시스템의 UI/UX 디자인 가이드 및 컴포넌트 스펙 제공

## 디자인 콘셉트
**"따뜻한 신뢰 (Warm Trust)"**
교회의 따뜻함과 신뢰감을 동시에 표현하는 모던 미니멀 디자인

## 색상 시스템 (CSS Variables)
```css
:root {
  /* Primary - 깊은 네이비 (신뢰, 안정) */
  --primary: #1e3a5f;
  --primary-hover: #2d5a8e;
  --primary-light: #e8f0fb;

  /* Secondary - 따뜻한 골드 (헌신, 가치) */
  --secondary: #c9a84c;
  --secondary-hover: #b8962e;

  /* Background */
  --bg-main: #f8f9fc;
  --bg-card: #ffffff;
  --bg-sidebar: #1e3a5f;

  /* Text */
  --text-primary: #1a2332;
  --text-secondary: #6b7a99;
  --text-sidebar: #e8f0fb;

  /* Status */
  --success: #2e7d32;
  --warning: #f57c00;
  --error: #c62828;
  --info: #1565c0;

  /* Border */
  --border: #e2e8f0;
  --border-focus: #1e3a5f;
}
```

## 타이포그래피
```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');

font-family: 'Noto Sans KR', sans-serif;
--font-xs: 12px;
--font-sm: 14px;
--font-base: 16px;
--font-lg: 18px;
--font-xl: 20px;
--font-2xl: 24px;
--font-3xl: 30px;
```

## 레이아웃 스펙

### 사이드바 (LNB)
- 너비: 260px (접힘: 72px)
- 배경: var(--bg-sidebar) = #1e3a5f
- 로고 영역: 높이 72px
- 메뉴 아이템 높이: 48px
- 아이콘 크기: 20px
- 활성 메뉴: 배경 rgba(255,255,255,0.15), 왼쪽 보더 3px var(--secondary)

### 헤더
- 높이: 64px
- 배경: white
- 그림자: 0 1px 3px rgba(0,0,0,0.1)

### 콘텐츠 영역
- 패딩: 24px
- 최대 너비: 1200px
- 카드 border-radius: 12px
- 카드 shadow: 0 2px 8px rgba(0,0,0,0.08)

## 페이지별 디자인 스펙

### 로그인 페이지
- 배경: 그라데이션 (딥 블루 → 미드나이트)
- 카드: 흰색, 360px 너비, 패딩 40px
- 교회 이름: 골드 색상, 24px Bold
- 로고/십자가 아이콘: 상단 중앙

### 메인 페이지
- 히어로 섹션: 교회 사진 (placeholder: 그라데이션 배경 + 텍스트)
- 통계 카드 4개 (교인 수, 이번달 헌금, 이번주 헌금, 게시글)
- 최근 헌금 목록 (5개)
- 최근 게시글 목록 (5개)

### 교인 등록 폼 필드
- 이름 (필수), 생년월일, 전화번호, 이메일
- 주소, 등록일 (필수), 구역/부서
- 직분 (선택: 일반, 집사, 권사, 장로, 목사)
- 세례일, 비고

### 헌금 등록 폼 필드
- 교인 선택 (검색 가능 드롭다운)
- 헌금 종류 (라디오 또는 탭: 5가지)
- 금액 (천 단위 콤마 자동)
- 헌금일 (기본값: 오늘)
- 비고

### 통계 페이지
- 상단: 기간 선택 탭 (연/월/주)
- 막대 차트: 헌금 종류별 금액
- 선 차트: 추이 분석
- 요약 카드: 총액, 최고/최저, 평균

## 반응형 브레이크포인트
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

## 아이콘 라이브러리
Lucide React 사용
- 교인: Users
- 헌금: Coins / DollarSign
- 통계: BarChart3
- 게시판: MessageSquare
- 홈: Church / Home
- 로그인: LogIn
- 로그아웃: LogOut
- 설정: Settings
