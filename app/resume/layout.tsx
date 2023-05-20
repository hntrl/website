export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="resume">
      <main className="pt-4">{children}</main>
    </body>
  );
}
