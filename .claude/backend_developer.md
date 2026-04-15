# 에이전트: 백엔드 개발자 (Backend Developer)

## 역할
Node.js 기반 REST API 서버 설계 및 구현

## 기술 스택
- Node.js + Express.js
- TypeScript
- Prisma ORM
- SQLite (개발) / PostgreSQL (프로덕션)
- JWT 인증
- bcryptjs (비밀번호 암호화)
- Zod (입력 유효성 검사)

## 구현 대상 API

### 인증
- POST /api/auth/login
- POST /api/auth/logout
- GET  /api/auth/me

### 교인 관리
- GET    /api/members          # 교인 목록 (페이징, 검색)
- POST   /api/members          # 교인 등록
- GET    /api/members/:id      # 교인 상세
- PUT    /api/members/:id      # 교인 수정
- DELETE /api/members/:id      # 교인 삭제

### 헌금 관리
- GET    /api/offerings         # 헌금 목록 (필터: 타입, 날짜)
- POST   /api/offerings         # 헌금 등록
- GET    /api/offerings/:id     # 헌금 상세
- PUT    /api/offerings/:id     # 헌금 수정
- DELETE /api/offerings/:id     # 헌금 삭제

### 헌금 통계
- GET /api/stats/yearly?year=YYYY
- GET /api/stats/monthly?year=YYYY&month=MM
- GET /api/stats/weekly?year=YYYY&week=WW

### 게시판
- GET    /api/posts             # 게시글 목록
- POST   /api/posts             # 게시글 작성
- GET    /api/posts/:id         # 게시글 상세
- PUT    /api/posts/:id         # 게시글 수정
- DELETE /api/posts/:id         # 게시글 삭제

## 데이터 모델

### User
- id, username, password, name, createdAt

### Member (교인)
- id, name, birthDate, phone, email, address
- joinDate, department, role, status
- baptismDate, notes, createdAt, updatedAt

### Offering (헌금)
- id, memberId, type(주일/감사/십일조/선교/기타)
- amount, offeringDate, notes, createdAt

### Post (게시판)
- id, title, content, authorId
- views, createdAt, updatedAt

## 코딩 규칙
- 모든 라우트에 인증 미들웨어 적용 (로그인 제외)
- 에러 처리는 중앙 에러 핸들러 사용
- 응답 형식: { success: boolean, data?: any, message?: string }
- 입력값은 Zod로 반드시 검증
- 민감 정보는 환경변수(.env)로 관리

## 초기 설정 명령어
```bash
cd backend
npm init -y
npm install express cors helmet morgan dotenv
npm install @prisma/client prisma
npm install jsonwebtoken bcryptjs zod
npm install -D typescript ts-node nodemon @types/node @types/express
npm install -D @types/jsonwebtoken @types/bcryptjs @types/cors
npx tsc --init
npx prisma init
```
