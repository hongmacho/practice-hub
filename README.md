# Practice Hub - 의료 진료소 관리 시스템

개인 개원의와 소규모 의료 클리닉을 위한 통합 진료소 관리 SaaS입니다.
환자 기록, 예약, 결제, 규정 준수를 한 곳에서 관리할 수 있습니다.

## 주요 기능

- **📊 대시보드** - 오늘의 예약, 매출, 신환 현황을 한눈에 확인
- **👥 환자 관리** - 환자 정보, 진료 이력, 결제 현황 통합 관리
- **📅 예약 시스템** - 온라인 예약, 일정 관리, 중복 방지 자동화
- **📝 진료 기록** - 진료 이력, 진단명, 처방 기록
- **💳 결제 추적** - 청구, 결제, 미수금 체계적 관리
- **⚙️ 규정 준수** - HIPAA 기본 체크리스트, 암호화 저장

## 기술 스택

| 영역 | 기술 |
|------|------|
| **Frontend** | Next.js 15, TypeScript, React |
| **UI 라이브러리** | shadcn/ui, Tailwind CSS |
| **Database** | Drizzle ORM, better-sqlite3 |
| **Forms** | React Hook Form, Zod |
| **Date** | date-fns |

## 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/practice-hub.git
cd practice-hub
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 시작

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 4. 데이터베이스 초기화

첫 실행 시 데이터베이스가 자동으로 생성됩니다.
초기 데이터를 로드하려면 다음 API를 호출하세요:

```bash
curl -X POST http://localhost:3000/api/initialize
```

## 프로젝트 구조

```
practice-hub/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈페이지
│   ├── api/                 # API 라우트
│   ├── dashboard/           # 대시보드 페이지
│   ├── patients/            # 환자 관리 페이지
│   ├── appointments/        # 예약 관리 페이지
│   ├── medical-records/     # 진료 기록 페이지
│   ├── payments/            # 결제 관리 페이지
│   └── settings/            # 설정 페이지
├── components/
│   ├── ui/                  # shadcn/ui 컴포넌트
│   └── layout/              # 레이아웃 컴포넌트
├── lib/
│   ├── db.ts               # Drizzle DB 설정
│   ├── schema.ts           # DB 스키마
│   ├── seed.ts             # 초기 데이터
│   └── repositories/        # 데이터 접근 계층
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 사용법

### 로그인
기본 계정 (데모용):
- **이메일**: doctor@clinic.kr
- **비밀번호**: (패스워드 필드는 아직 구현 안됨)

### 환자 등록
1. 좌측 메뉴에서 "환자 관리" 클릭
2. "새 환자 등록" 버튼 클릭
3. 환자 정보 입력 후 저장

### 예약 관리
1. "예약" 메뉴에서 예약 목록 확인
2. "예약 추가" 버튼으로 새 예약 생성
3. 예약 변경/취소 기능 사용

### 결제 관리
1. "결제" 메뉴에서 모든 청구 목록 조회
2. 상태별 필터 (미결제, 결제완료, 연체)
3. 결제 표시로 상태 업데이트

## 개발 가이드

### TypeScript 타입 검사
```bash
npm run type-check
```

### 린트 실행
```bash
npm run lint
```

### 빌드
```bash
npm run build
```

### 프로덕션 서버 시작
```bash
npm run start
```

## 트러블슈팅

### 데이터베이스 오류
- `clinic.db` 파일이 프로젝트 루트에 생성됩니다.
- 초기화하려면 파일을 삭제 후 재시작하세요.

### API 호출 오류
- 개발 서버가 실행 중인지 확인하세요.
- 브라우저 콘솔에서 네트워크 오류를 확인하세요.

### 스타일 오류
- Tailwind CSS가 제대로 로드되었는지 확인하세요.
- `npm run dev` 재시작해보세요.

## 라이선스

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다.

## 작자

Hong Paul - hongp0508@gmail.com

---

**마지막 업데이트**: 2026년 7월 2일
