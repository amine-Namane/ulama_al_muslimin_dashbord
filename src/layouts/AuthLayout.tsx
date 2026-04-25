type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <img src="src/assets/logo.png" alt="Logo" className="w-36 ml-4 " />
      </div>

      <div className="grid h-screen max-w-none items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
