interface LayoutProps {
    children: React.ReactNode
  }
  
  export function Layout({ children }: LayoutProps) {
    return (
      <div className="min-h-screen bg-black text-gray-100">
        {children}
      </div>
    )
  }
  
  