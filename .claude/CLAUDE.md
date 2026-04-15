다음은 프로젝트 정보야. 이걸 참고해서 개발을 진행해줘.

## 프로젝트 개요

교인 등록, 헌금 관리, 통계, 게시판 기능을 제공하는 교회 웹 관리 시스템

## 기술 스택

- Frontend: React.js v19, TypeScript, Zustand, Tailwind CSS, shadcn/ui (현재 Vite + TS 세팅 완료)
- Backend: Node.js (Express.js), TypeScript
- Database: SQLite
- Auth: JWT

## 로그인 정보

- ID: changsung / PW: changsung0303

## 전체 Phase 계획

- Phase 1: 프로젝트 초기화 및 환경 설정 (폴더 구조, 백엔드 초기 세팅, DB 연결)
- Phase 2: 인증 시스템 (로그인/로그아웃, JWT)
- Phase 3: 교인 등록/관리
- Phase 4: 헌금 관리 (주일헌금, 감사헌금, 십일조, 선교헌금, 기타헌금)
- Phase 5: 헌금 통계 (연/월/주)
- Phase 6: 교회 게시판
- Phase 7: QA 및 버그 수정
- Phase 8: 최종 검토

## 화면 구조

- /login → 로그인 페이지
- / → 메인 대시보드 (교회 사진 + 소개)
- LNB 메뉴: 교인등록, 헌금등록, 통계, 교회게시판
- /members → 교인 목록/등록
- /offerings → 헌금 목록/등록
- /stats → 헌금 통계
- /board → 게시판

## 데이터 모델

- Member(교인): id, name, birthDate, phone, email, address, joinDate, department, role, status, baptismDate, notes
- Offering(헌금): id, memberId, type(주일/감사/십일조/선교/기타), amount, offeringDate, notes
- Post(게시판): id, title, content, authorId, views, createdAt

## 디렉토리 구조 목표

test/
├── src/ ← 현재 React 프론트엔드
├── backend/ ← 새로 생성할 Node.js 서버
└── .claude/ ← 에이전트 파일들

Phase 1부터 시작해줘. 백엔드 폴더 생성 및 Express + Prisma + SQLite 초기 세팅을 진행해줘.
