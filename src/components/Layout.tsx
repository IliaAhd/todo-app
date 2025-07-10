export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full sm:w-[600px] mx-auto px-6 md:px-0 text-very-light-gray absolute top-16 inset-0">
      {children}
    </div>
  );
}
