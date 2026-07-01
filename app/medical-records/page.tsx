'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">진료 기록</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">기록 추가</Button>
      </div>

      <Card className="p-12 text-center">
        <p className="text-gray-500 text-lg">진료 기록 관리 기능이 준비 중입니다.</p>
        <p className="text-gray-400 mt-2">곧 추가될 예정입니다.</p>
      </Card>
    </div>
  );
}
