import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  console.log("FE Version: 1.0.3");
  return (
    <MainLayout>
      <div className="flex min-h-full items-center justify-center">
        <main className="rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-blue-600">
            Welcome to TM - Subscription
          </h1>
        </main>
      </div>
    </MainLayout>
  );
}
