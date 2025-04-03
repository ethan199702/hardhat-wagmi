export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">仪表盘</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">数据统计</h2>
          <p className="text-gray-600">这里是数据统计内容</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">用户信息</h2>
          <p className="text-gray-600">这里是用户信息内容</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">系统状态</h2>
          <p className="text-gray-600">这里是系统状态内容</p>
        </div>
      </div>
    </div>
  );
}
