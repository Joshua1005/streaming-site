type Props = { children: React.ReactNode };

function AuthLayout({ children }: Props) {
  return (
    <main className={"min-h-screen grid grid-cols-1 lg:grid-cols-2"}>
      <article className={"bg-primary lg:block hidden"} />
      <article className={"grid place-items-center p-2"}>{children}</article>
    </main>
  );
}

export default AuthLayout;
