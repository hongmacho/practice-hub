# ROADMAP: Practice Hub 개발 로드맵

## Sprint 0: 환경 셋업 (1-2시간)
**목표:** 프로젝트 기초 구축, DB 스키마 정의, 데모 데이터 준비

### 완료 기준
- [ ] Next.js 15 프로젝트 생성 (TypeScript, Tailwind, App Router)
- [ ] Drizzle ORM + better-sqlite3 설치 및 설정
- [ ] 모든 DB 테이블 생성 (Users, Patients, Appointments, MedicalRecords, Payments)
- [ ] Seed 데이터 충분히 생성 (의사 1명, 환자 5명, 예약 10개, 진료기록 5개, 결제 5개)
- [ ] 프로젝트 구조 초기화 (app/, components/, lib/, public/ 디렉토리)
- [ ] .env.example 생성

### DB 스키마 정의
```sql
-- users (clinic staff)
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'doctor', 'staff')),
  clinic_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- patients
CREATE TABLE patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clinic_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  birth_date TEXT,
  gender TEXT CHECK(gender IN ('M', 'F', 'Other')),
  address TEXT,
  medical_history TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- appointments
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clinic_id INTEGER NOT NULL,
  patient_id INTEGER NOT NULL,
  appointment_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- medical_records
CREATE TABLE medical_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clinic_id INTEGER NOT NULL,
  patient_id INTEGER NOT NULL,
  visit_date TEXT NOT NULL,
  chief_complaint TEXT,
  diagnosis TEXT,
  treatment TEXT,
  prescription TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- payments
CREATE TABLE payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clinic_id INTEGER NOT NULL,
  patient_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending', 'paid', 'overdue')),
  due_date TEXT,
  paid_date TEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);
```

### 컴포넌트 구조
```
components/
  ├── ui/                    (shadcn/ui components)
  ├── layout/
  │   ├── Header.tsx
  │   ├── Sidebar.tsx
  │   └── Footer.tsx
  ├── dashboard/
  │   ├── StatCard.tsx
  │   ├── RecentAppointments.tsx
  │   └── StatsChart.tsx
  ├── patients/
  │   ├── PatientTable.tsx
  │   ├── PatientForm.tsx
  │   ├── PatientDetail.tsx
  │   └── PatientSearch.tsx
  ├── appointments/
  │   ├── AppointmentCalendar.tsx
  │   ├── AppointmentForm.tsx
  │   └── AppointmentList.tsx
  ├── medical-records/
  │   ├── RecordForm.tsx
  │   ├── RecordList.tsx
  │   └── RecordDetail.tsx
  └── common/
      ├── EmptyState.tsx
      ├── LoadingSpinner.tsx
      └── ErrorBoundary.tsx

app/
  ├── layout.tsx
  ├── page.tsx
  ├── dashboard/
  │   └── page.tsx
  ├── patients/
  │   ├── page.tsx
  │   ├── [id]/
  │   │   ├── page.tsx
  │   │   └── edit/page.tsx
  │   └── new/page.tsx
  ├── appointments/
  │   └── page.tsx
  ├── medical-records/
  │   └── page.tsx
  ├── payments/
  │   └── page.tsx
  ├── settings/
  │   └── page.tsx
  └── api/
      ├── patients/
      │   ├── route.ts
      │   └── [id]/route.ts
      ├── appointments/
      │   └── route.ts
      ├── medical-records/
      │   └── route.ts
      └── payments/
          └── route.ts

lib/
  ├── db.ts                  (Drizzle setup)
  ├── schema.ts              (DB schema)
  ├── repositories/
  │   ├── patient.ts
  │   ├── appointment.ts
  │   ├── medical-record.ts
  │   └── payment.ts
  └── utils.ts
```

---

## Sprint 1: 기본 레이아웃 & 대시보드 (2-3시간)
**목표:** 전체 앱 레이아웃, 네비게이션, 대시보드 페이지 완성

### 완료 기준
- [ ] Header/Sidebar 네비게이션 구현 (한국어)
- [ ] 반응형 레이아웃 (모바일/태블릿/데스크톱)
- [ ] 대시보드 페이지
  - [ ] 오늘 예약 카드 (숫자 + 최근 3개)
  - [ ] 매출 요약 (이번달, 지난달)
  - [ ] 새 환자 수
  - [ ] 미수금 현황
- [ ] 간단한 통계 차트 (Chart.js 또는 Recharts)
- [ ] 한국어 모든 UI 텍스트

### 페이지/컴포넌트
- `app/layout.tsx` - 전체 레이아웃
- `components/layout/Header.tsx` - 상단 네비게이션
- `components/layout/Sidebar.tsx` - 좌측 메뉴
- `app/dashboard/page.tsx` - 대시보드
- `components/dashboard/StatCard.tsx` - 통계 카드
- `components/dashboard/RecentAppointments.tsx` - 최근 예약
- `components/dashboard/StatsChart.tsx` - 매출/통계 차트

---

## Sprint 2: 환자 관리 - 목록 & 검색 (2-3시간)
**목표:** 환자 조회, 검색, 필터 기능

### 완료 기준
- [ ] 환자 목록 페이지 (테이블)
- [ ] 검색 기능 (이름, 전화번호)
- [ ] 필터 기능 (성별, 생년월일 범위)
- [ ] 페이지네이션 (10개씩)
- [ ] 빈 상태 처리 ("아직 환자가 없습니다")
- [ ] 로딩 상태 처리
- [ ] 오류 상태 처리

### 페이지/컴포넌트
- `app/patients/page.tsx` - 환자 목록
- `components/patients/PatientTable.tsx` - 테이블
- `components/patients/PatientSearch.tsx` - 검색/필터
- `components/common/EmptyState.tsx` - 빈 상태
- `components/common/LoadingSpinner.tsx` - 로딩
- `lib/repositories/patient.ts` - DB 접근

### API 엔드포인트
- `GET /api/patients` - 목록 조회 (쿼리: search, filter, page)
- `POST /api/patients` - 신규 환자 등록
- `GET /api/patients/[id]` - 개별 환자 조회
- `PUT /api/patients/[id]` - 환자 정보 수정
- `DELETE /api/patients/[id]` - 환자 삭제

---

## Sprint 3: 환자 관리 - 상세 & 예약 (2-3시간)
**목표:** 환자 상세 페이지, 예약 관리

### 완료 기준
- [ ] 환자 상세 페이지
  - [ ] 기본 정보 (이름, 생년월일, 연락처 등)
  - [ ] 진료 이력 탭 (최근 5개)
  - [ ] 예약 내역 탭
  - [ ] 결제 현황 탭
  - [ ] 수정/삭제 버튼
- [ ] 환자 등록/수정 폼 (Form + Validation)
- [ ] 예약 관리
  - [ ] 예약 목록 페이지
  - [ ] 예약 추가 (모달 또는 폼)
  - [ ] 예약 변경/취소
  - [ ] 달력 또는 시간표 보기
- [ ] 진료 기록 추가 폼

### 페이지/컴포넌트
- `app/patients/[id]/page.tsx` - 환자 상세
- `app/patients/new/page.tsx` - 환자 등록
- `app/patients/[id]/edit/page.tsx` - 환자 수정
- `components/patients/PatientForm.tsx` - 폼
- `components/patients/PatientDetail.tsx` - 상세 보기
- `app/appointments/page.tsx` - 예약 목록
- `components/appointments/AppointmentForm.tsx` - 예약 폼
- `components/appointments/AppointmentList.tsx` - 예약 목록
- `app/medical-records/page.tsx` - 진료 기록
- `components/medical-records/RecordForm.tsx` - 기록 추가

### API 엔드포인트
- `GET /api/appointments` - 예약 목록
- `POST /api/appointments` - 예약 추가
- `PUT /api/appointments/[id]` - 예약 변경
- `DELETE /api/appointments/[id]` - 예약 취소
- `GET /api/medical-records` - 진료 기록 조회
- `POST /api/medical-records` - 진료 기록 추가

---

## Sprint 4: 결제 & 통계 (2-3시간)
**목표:** 결제 관리, 통계/분석 완성

### 완료 기준
- [ ] 결제 페이지
  - [ ] 모든 청구 목록 (상태별)
  - [ ] 미결제/연체 필터
  - [ ] 청구 추가 버튼
  - [ ] 결제 표시 기능
- [ ] 통계/분석
  - [ ] 월별 매출 차트
  - [ ] 환자 수 추이
  - [ ] 상위 진료과목
- [ ] 규정 준수
  - [ ] HIPAA 기본 체크리스트
  - [ ] 보안 설정 페이지

### 페이지/컴포넌트
- `app/payments/page.tsx` - 결제 관리
- `components/payments/PaymentTable.tsx` - 테이블
- `components/dashboard/StatsChart.tsx` - 차트 개선
- `app/settings/page.tsx` - 설정 (규정 준수 포함)

### API 엔드포인트
- `GET /api/payments` - 결제 목록
- `POST /api/payments` - 청구 추가
- `PUT /api/payments/[id]` - 결제 표시
- `GET /api/stats` - 통계 데이터

---

## Sprint 5: 반응형 & QA 마무리 (2-3시간)
**목표:** 모바일 대응, 버그 수정, 접근성 개선

### 완료 기준
- [ ] 모든 페이지 모바일 대응 (320px 이상)
- [ ] 반응형 테스트 (모바일/태블릿/데스크톱)
- [ ] 접근성 (WCAG 기본)
  - [ ] 색상 대비
  - [ ] 키보드 네비게이션
  - [ ] Alt 텍스트
- [ ] 에러 경계 추가
- [ ] 로딩 상태 전체 점검
- [ ] 빈 상태 메시지 전체 점검

### 컴포넌트
- `components/common/ErrorBoundary.tsx` - 에러 경계
- 기존 컴포넌트 반응형 개선

---

## Sprint 6: 문서 & GitHub Push (1-2시간)
**목표:** README 작성, 문서 정리, GitHub 푸시

### 완료 기준
- [ ] README.md 작성
  - [ ] 서비스 소개
  - [ ] 기술 스택 표
  - [ ] 설치 방법 (npm install, npm run dev)
  - [ ] 기본 사용법
  - [ ] 트러블슈팅
- [ ] .gitignore 확인 (node_modules, *.db, .env.local)
- [ ] .env.example 생성
- [ ] 최종 QA (tsc, lint, build)
  - [ ] `npx tsc --noEmit` - 0 오류
  - [ ] `npm run lint` - 0 오류
  - [ ] `npm run build` - 성공
- [ ] user-suggest.html 생성
- [ ] GitHub 저장소 생성 및 푸시

### 최종 체크리스트
- [ ] 한국어 UI 100% (영어 0개)
- [ ] 6개 이상 페이지 완성
- [ ] 대시보드 완성
- [ ] 환자 관리 (목록+상세+검색) 완성
- [ ] 예약 관리 완성
- [ ] 결제 관리 완성
- [ ] 반응형 대응 완료
- [ ] 빈 상태/로딩/에러 처리 완료
- [ ] 문서 완성
- [ ] GitHub 푸시 완료

---

## 시간 배분
- Sprint 0: 1-2시간
- Sprint 1: 2-3시간
- Sprint 2: 2-3시간
- Sprint 3: 2-3시간
- Sprint 4: 2-3시간
- Sprint 5: 2-3시간
- Sprint 6: 1-2시간
- **총:** 14-20시간

---

## 주의사항
1. 각 Sprint 완료 후 `npm run build` 실행하여 빌드 오류 확인
2. Repository 패턴으로 DB 접근 추상화 (lib/repositories/)
3. 모든 UI 텍스트는 한국어 (영어 금지)
4. 빈 상태, 로딩, 에러 상태 필수 처리
5. shadcn/ui 컴포넌트 최대 활용
6. 함수/컴포넌트 200줄 이하 유지

