export default function Operations({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-4 pl-6 py-7 text-very-dark-grayish-blue bg-white dark:bg-very-dark-desaturated-blue flex justify-between text-base ${className}`}
    >
      {children}
    </div>
  );
}
