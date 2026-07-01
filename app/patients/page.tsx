'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const query = search ? `?search=${search}` : '';
        const res = await fetch(`/api/patients${query}`);
        const data = await res.json();
        setPatients(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Failed to load patients:', error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadPatients, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">환자 관리</h1>
        <Link href="/patients/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            새 환자 등록
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="환자 이름 또는 전화번호로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">아직 환자가 없습니다.</p>
            <p className="text-gray-400 mt-2">새 환자를 등록해보세요.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>전화번호</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>생년월일</TableHead>
                  <TableHead>성별</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.birthDate}</TableCell>
                    <TableCell>{patient.gender === 'M' ? '남' : '여'}</TableCell>
                    <TableCell>
                      <Link href={`/patients/${patient.id}`}>
                        <Button variant="outline" size="sm">
                          상세보기
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
