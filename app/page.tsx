import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Practice Hub에 오신 것을 환영합니다
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          개인 개원의를 위한 통합 진료소 관리 시스템
        </p>
        <Link href="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-700">
            시작하기
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-2">📊 대시보드</h3>
          <p className="text-gray-600">오늘의 예약, 매출, 신환 현황을 한눈에 확인하세요.</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-2">👥 환자 관리</h3>
          <p className="text-gray-600">환자 정보, 진료 이력, 결제 현황을 통합 관리하세요.</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-2">📅 예약 관리</h3>
          <p className="text-gray-600">온라인 예약, 일정 관리, 중복 방지를 자동화하세요.</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-2">💳 결제 추적</h3>
          <p className="text-gray-600">청구, 결제, 미수금을 체계적으로 관리하세요.</p>
        </div>
      </div>
    </div>
  );
}
