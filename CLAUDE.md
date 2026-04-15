# 교회 관리 시스템 (Church Management System)

## 프로젝트 개요
교인 등록, 헌금 관리, 통계, 게시판 기능을 제공하는 교회 웹 관리 시스템

## 기술 스택
- **Frontend**: React.js v19, TypeScript, Zustand, Tailwind CSS, shadcn/ui
- **Backend**: Node.js (Express.js), TypeScript
- **Database**: SQLite (개발) / PostgreSQL (프로덕션)
- **Auth**: JWT 기반 인증

## 인증 정보 (개발용)
- ID: changsung
- PW: changsung0303

## 주요 기능
1. 로그인/로그아웃
2. 메인 페이지 (교회 사진, 소개)
3. 교인 등록/관리
4. 헌금 등록 (주일헌금, 감사헌금, 십일조, 선교헌금, 기타헌금)
5. 헌금 통계 (연/월/주 단위)
6. 교회 게시판

## 디렉토리 구조
```
church-management-system/
├── frontend/          # React 앱
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/     # Zustand 스토어
│   │   ├── hooks/
│   │   ├── types/
│   │   └── api/
├── backend/           # Node.js 서버
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
└── docs/             # 문서
```

## 코딩 컨벤션
- TypeScript strict mode 사용
- ESLint + Prettier 적용
- 컴포넌트: PascalCase
- 함수/변수: camelCase
- 상수: UPPER_SNAKE_CASE
- API 응답은 항상 { success, data, message } 형태

## Git 컨벤션
- feat: 새 기능
- fix: 버그 수정
- refactor: 리팩토링
- docs: 문서
- test: 테스트
- style: 스타일
