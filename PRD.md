# PRD: 의료 진료소 관리 시스템 (Practice Hub)

## 1. 개요
개인 개원의(의사, 치과의사, 한의사)와 소규모 의료 클리닉을 위한 통합 진료소 관리 SaaS.  
환자 기록, 예약, 결제, 규정 준수를 한 곳에서 관리.

**Target Users:** 개인 개원의, 소규모 의료 클리닉 원장  
**Pricing Model:** $30-50/월 (기본형), $80-120/월 (프리미엄)

---

## 2. MoSCoW 우선순위 (Must-have 12개, Should 6개, Could 4개)

| 우선순위 | 기능 | 설명 | 스프린트 |
|---------|------|------|---------|
| **MUST** | 환자 기록 관리 | 환자 등록, 기본정보, 진료 이력, 검진 결과 저장 | Sprint 2-3 |
| **MUST** | 예약 시스템 | 온라인 예약, 일정 관리, 중복 예약 방지 | Sprint 3 |
| **MUST** | 진료 기록 작성 | 진료일자, 증상, 처방, 진단명 기록 | Sprint 3 |
| **MUST** | 환자 목록 및 검색 | 빠른 검색, 필터(진료과목, 상태 등) | Sprint 2 |
| **MUST** | 결제 추적 | 진료비 청구, 결제 여부, 미수금 관리 | Sprint 4 |
| **MUST** | 대시보드 | 오늘 예약, 매출 요약, 새 환자 수 등 주요 통계 | Sprint 4 |
| **MUST** | 반응형 UI | 모바일/태블릿/데스크톱 대응 | Sprint 1-5 |
| **MUST** | 한국어 UI | 모든 버튼, 레이블, 메뉴, 에러/성공 메시지 한국어 | Sprint 1-5 |
| **MUST** | 빈 상태 처리 | 데이터 없을 때 명확한 가이드 메시지 | Sprint 2-5 |
| **MUST** | 로딩/에러 상태 | 로딩 UI, 에러 메시지, 재시도 기능 | Sprint 2-5 |
| **MUST** | 기본 컴플라이언스 | HIPAA 기본 체크리스트, 암호화 저장소 | Sprint 4 |
| **MUST** | README & 설치 가이드 | 기술 스택, 설치 방법, 사용법 | Sprint 6 |
| **SHOULD** | 진료 통계 분석 | 월별 매출, 환자 만족도 추이, 인기 진료과목 | Sprint 4 |
| **SHOULD** | 환자 알림 | SMS/이메일 예약 리마인더 | Sprint 5 |
| **SHOULD** | 다중 의료진 | 여러 의사 계정 관리, 권한 분리 | Sprint 5 |
| **SHOULD** | 진료 약속 시간표 | 주간/월간 시간표 관리 | Sprint 3 |
| **SHOULD** | PDF 내보내기 | 진료 기록, 청구서 PDF 다운로드 | Sprint 5 |
| **SHOULD** | 자동 송금 요청 | 미수금 자동 청구 알림 (이메일) | Sprint 5 |
| **COULD** | Kakao Pay 연동 | 온라인 결제 (추후 버전) | Sprint 6+ |
| **COULD** | 카톡 예약 연동 | Kakao Talk 봇 (추후 버전) | Sprint 6+ |
| **COULD** | AI 진단 보조 | 증상 기반 진단명 추천 (추후 버전) | Sprint 6+ |
| **COULD** | 초대 코드 시스템 | 팀원 초대, 다중 클리닉 관리 | Sprint 6+ |

---

## 3. 화면 목록 (6개 이상)

| # | 화면명 | 설명 | 컴포넌트 |
|---|--------|------|---------|
| 1 | **대시보드** | 오늘 예약, 매출, 새 환자, 미수금 요약 | Card, Chart |
| 2 | **환자 목록** | 모든 환자 조회, 검색, 필터 | Table, SearchBar, Filter |
| 3 | **환자 상세** | 환자 정보, 진료 이력, 결제 현황 | Tabs, Timeline |
| 4 | **환자 등록/편집** | 신규 환자 등록, 정보 수정 | Form, Input |
| 5 | **예약 관리** | 예약 일정 보기, 추가/취소/변경 | Calendar, Modal |
| 6 | **진료 기록** | 진료 이력 조회, 상세 정보 보기 | List, DetailView |
| 7 | **결제 관리** | 청구, 결제 현황, 미수금 추적 | Table, Status Badge |
| 8 | **설정** | 클리닉 정보, 계정 설정, 보안 | Settings, Toggle |

---

## 4. 경쟁분석 & 차별점

### 경쟁사
1. **Nextgen Healthcare** - 대형 병원 대상, $10K+/월 (개원의 대상 아님)
2. **Athenahealth** - 클라우드 기반 하지만 한국 미지원, 높은 학습곡선
3. **일반 CRM + 예약 시스템 조합** - 통합 없음, 수작업 많음

### Practice Hub의 차별점
- ✅ **개원의 맞춤형 UX** - 의사 workflow에 최적화
- ✅ **한글 인터페이스** - 완벽한 한국어 지원
- ✅ **저가 모델** - $30-50/월 (경쟁사 대비 1/200)
- ✅ **빠른 도입** - 15분 내 시작
- ✅ **기본 규정 준수** - HIPAA/의료법 체크리스트 내장

---

## 5. 데이터 모델

### 주요 테이블
```
Patients
  - id (PK)
  - email (unique)
  - phone
  - name
  - birth_date
  - gender
  - address
  - created_at
  - updated_at

Appointments
  - id (PK)
  - patient_id (FK)
  - appointment_date
  - time_slot
  - status (scheduled, completed, cancelled)
  - notes
  - created_at

MedicalRecords
  - id (PK)
  - patient_id (FK)
  - visit_date
  - chief_complaint
  - diagnosis
  - treatment
  - prescription
  - notes
  - created_at

Payments
  - id (PK)
  - patient_id (FK)
  - amount
  - status (pending, paid, overdue)
  - due_date
  - paid_date
  - created_at

Users (Clinic Staff)
  - id (PK)
  - email (unique)
  - password_hash
  - name
  - role (admin, doctor, staff)
  - clinic_id (FK)
  - created_at
```

---

## 6. 한국어 UI 텍스트 가이드

### 네비게이션
- "대시보드" / "환자 관리" / "예약" / "진료 기록" / "결제" / "설정"

### 버튼
- "새 환자 등록" / "예약 추가" / "저장" / "취소" / "삭제" / "수정"
- "상세보기" / "다운로드" / "인쇄" / "공유" / "추출"

### 폼 라벨
- "이름" / "전화번호" / "생년월일" / "성별" / "주소" / "이메일"
- "진료과목" / "진료일" / "진료시간" / "주소"
- "증상" / "진단명" / "처방" / "비고"

### 상태
- "예약대기" / "예약완료" / "진료완료" / "취소됨"
- "미결제" / "결제완료" / "연체됨"

### 에러/성공 메시지
- "저장되었습니다." / "삭제되었습니다."
- "오류가 발생했습니다. 다시 시도해주세요."
- "필수 필드를 입력해주세요."
- "올바른 이메일 형식을 입력해주세요."

### 빈 상태
- "아직 환자가 없습니다. 새 환자를 등록해보세요."
- "예약 기록이 없습니다."
- "진료 기록이 없습니다."

---

## 7. 성공 기준

- [ ] tsc, lint, build 0개 오류
- [ ] 한국어 UI 100% (영어 텍스트 0개)
- [ ] 6개 이상 페이지/화면 완성
- [ ] 대시보드 (요약 통계) 완성
- [ ] 환자 목록 + 상세 (2단계 UX) 완성
- [ ] 검색 또는 필터 기능 완성
- [ ] 빈 상태, 로딩, 에러 상태 처리
- [ ] 반응형 (모바일 320px 이상 대응)
- [ ] README.md (기술스택, 설치, 사용법)
- [ ] .gitignore (node_modules, *.db, .env.local)
- [ ] GitHub 푸시 완료
- [ ] user-suggest.html 생성

---

## 8. 기술 스택

- **Frontend:** Next.js 15 (App Router) + TypeScript + shadcn/ui + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Drizzle ORM + better-sqlite3
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form
- **Validation:** Zod
- **Date Handling:** date-fns

---

## 9. 개발 일정 (6개 스프린트)

- **Sprint 0:** 환경 셋업, DB 스키마, seed 데이터
- **Sprint 1-2:** 핵심 페이지 (대시보드, 환자 목록, 상세)
- **Sprint 3:** 예약, 진료 기록 기능
- **Sprint 4:** 결제, 통계, 규정 준수
- **Sprint 5:** 미닫기, 반응형, 접근성
- **Sprint 6:** QA, 문서, GitHub push

