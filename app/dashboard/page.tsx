'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DashboardData {
  todayAppointments: number;
  monthlyRevenue: number;
  newPatients: number;
  unpaidAmount: number;
  appointments?: Array<{
    id: number;
    patientName?: string;
    appointmentDate: string;
    timeSlot: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    todayAppointments: 0,
    monthlyRevenue: 0,
    newPatients: 0,
    unpaidAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/api/appointments?date=' + new Date().toISOString().split('T')[0]);
        const appointments = await res.json();

        // Mock data for demo
        setData({
          todayAppointments: Array.isArray(appointments) ? appointments.length : 0,
          monthlyRevenue: 2850000,
          newPatients: 5,
          unpaidAmount: 145000,
          appointments: Array.isArray(appointments) ? appointments.slice(0, 5) : [],
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">오늘 예약</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {data.todayAppointments}
              </p>
            </div>
            <span className="text-3xl">📅</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">이번달 매출</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {(data.monthlyRevenue / 1000000).toFixed(1)}M
              </p>
            </div>
            <span className="text-3xl">💰</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">신환 수</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {data.newPatients}
              </p>
            </div>
            <span className="text-3xl">👤</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">미수금</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {(data.unpaidAmount / 1000).toFixed(0)}K
              </p>
            </div>
            <span className="text-3xl">⚠️</span>
          </div>
        </Card>
      </div>

      {/* Recent Appointments */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">최근 예약</h2>
        {data.appointments && data.appointments.length > 0 ? (
          <div className="space-y-3">
            {data.appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {apt.appointmentDate} {apt.timeSlot}
                  </p>
                </div>
                <Badge variant="outline">예약 확정</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">예약이 없습니다.</p>
        )}
      </Card>
    </div>
  );
}
