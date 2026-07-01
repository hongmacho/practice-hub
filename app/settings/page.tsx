'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">설정</h1>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">클리닉 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              클리닉명
            </label>
            <input
              type="text"
              defaultValue="김의사 클리닉"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              진료 과목
            </label>
            <input
              type="text"
              defaultValue="내과 · 가정의학과"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 mt-4">
            저장
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">보안 & 규정 준수</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">HIPAA 컴플라이언스</span>
            <span className="text-green-600 font-semibold">✓ 활성</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">데이터 암호화</span>
            <span className="text-green-600 font-semibold">✓ 활성</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">백업 자동화</span>
            <span className="text-green-600 font-semibold">✓ 활성</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
