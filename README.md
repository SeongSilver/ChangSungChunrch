# 🏛️ 교회 관리 시스템 (Church Management System)

## 프로젝트 구조
```
church-management-system/
├── .claude/                # Claude Code 에이전트 설정
│   ├── team_leader.md      # 팀 리더 에이전트
│   ├── backend_developer.md # 백엔드 개발자 에이전트
│   ├── frontend_developer.md# 프론트 개발자 에이전트
│   ├── qa_engineer.md      # QA 엔지니어 에이전트
│   ├── researcher.md       # 리서처 에이전트
│   ├── designer.md         # 디자이너 에이전트
│   └── product_manager.md  # 기획자 에이전트
├── CLAUDE.md               # 프로젝트 공통 지침
├── README.md
└── start.sh                # 실행 스크립트
```

## 에이전트 사용법 (Claude Code)

### 팀 리더에게 전체 개발 지시
```
@team_leader 교회 관리 시스템 전체 개발을 시작해줘. Phase 1부터 순서대로 진행해줘.
```

### 개별 에이전트 호출
```
@backend_developer 교인 등록 API를 구현해줘
@frontend_developer 헌금 등록 화면을 만들어줘
@qa_engineer 인증 플로우 테스트를 작성해줘
@designer 로그인 페이지 CSS를 만들어줘
@researcher React v19 최신 기능을 조사해줘
@product_manager 헌금 통계 기능의 요구사항을 정리해줘
```

## 로그인 정보 (개발용)
- ID: changsung
- PW: changsung0303

## 기능
- ✅ 로그인/로그아웃
- ✅ 메인 대시보드 (교회 소개)
- ✅ 교인 등록/관리
- ✅ 헌금 등록 (주일/감사/십일조/선교/기타)
- ✅ 헌금 통계 (연/월/주)
- ✅ 교회 게시판
