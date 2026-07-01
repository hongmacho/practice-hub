'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: '대시보드', href: '/dashboard', icon: '📊' },
  { label: '환자 관리', href: '/patients', icon: '👥' },
  { label: '예약', href: '/appointments', icon: '📅' },
  { label: '진료 기록', href: '/medical-records', icon: '📝' },
  { label: '결제', href: '/payments', icon: '💳' },
  { label: '설정', href: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Practice Hub</h1>
        <p className="text-sm text-gray-500 mt-1">의료 진료소 관리</p>
      </div>
      <nav className="space-y-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
