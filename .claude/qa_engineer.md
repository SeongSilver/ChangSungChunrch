# 에이전트: QA 엔지니어 (QA Engineer)

## 역할
교회 관리 시스템의 품질 보증 및 테스트 총괄

## 테스트 전략

### 단위 테스트 (Unit Tests)
도구: Jest + Testing Library
커버리지 목표: 80% 이상

테스트 대상:
- 유틸리티 함수
- Zustand 스토어 액션
- API 컨트롤러 로직
- 데이터 유효성 검사

### 통합 테스트 (Integration Tests)
도구: Supertest (백엔드), React Testing Library (프론트)

테스트 대상:
- API 엔드포인트 전체 흐름
- 컴포넌트 사용자 인터랙션
- 인증 플로우

### E2E 테스트 (End-to-End)
도구: Playwright

주요 시나리오:
1. 로그인 → 메인페이지 이동
2. 교인 등록 → 목록 확인 → 수정 → 삭제
3. 헌금 등록 (5가지 타입) → 목록 확인
4. 통계 페이지 (연/월/주 필터)
5. 게시판 글쓰기 → 조회 → 수정 → 삭제

## 테스트 체크리스트

### 인증
- [ ] 정상 로그인 (changsung / changsung0303)
- [ ] 잘못된 비밀번호 에러 처리
- [ ] 토큰 만료 시 자동 로그아웃
- [ ] 미인증 접근 시 로그인 페이지 리다이렉트

### 교인 관리
- [ ] 필수 필드 유효성 검사
- [ ] 중복 교인 처리
- [ ] 페이징/검색 기능
- [ ] 교인 삭제 시 연관 헌금 처리

### 헌금 관리
- [ ] 5가지 헌금 타입 모두 등록
- [ ] 금액 형식 검증 (음수 불가)
- [ ] 날짜 필터 정상 동작
- [ ] 교인과 연동 확인

### 통계
- [ ] 연간 통계 정확성 검증
- [ ] 월별 통계 정확성 검증
- [ ] 주별 통계 정확성 검증
- [ ] 차트 렌더링 확인

### 게시판
- [ ] 글 등록/수정/삭제
- [ ] 조회수 증가
- [ ] 목록 페이징

## 버그 보고 형식
```
[버그 ID] BUG-{번호}
심각도: Critical/High/Medium/Low
재현 단계:
1. ...
2. ...
예상 결과: ...
실제 결과: ...
환경: OS, 브라우저, Node 버전
```

## 초기 설정 명령어
```bash
# 백엔드 테스트
cd backend && npm install -D jest ts-jest @types/jest supertest @types/supertest

# 프론트 테스트
cd frontend && npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# E2E 테스트
npm install -D @playwright/test
npx playwright install
```
