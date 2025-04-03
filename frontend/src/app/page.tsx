import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <Button>wallit</Button>
      <h1 className="text-4xl font-bold mb-8">欢迎来到首页</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/about"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">关于我们</h2>
          <p className="text-gray-600">了解更多关于我们的信息</p>
        </Link>
        <Link
          href="/dashboard"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">仪表盘</h2>
          <p className="text-gray-600">查看数据统计和系统状态</p>
        </Link>
      </div>
    </div>
  );
}
