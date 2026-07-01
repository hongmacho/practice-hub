'use client';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          김의사 클리닉
        </h2>
        <p className="text-sm text-gray-500">내과 · 가정의학과</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
          프로필
        </button>
        <button className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
          로그아웃
        </button>
      </div>
    </header>
  );
}
