'use client'
export const GotoTop = () => {

  return <div
    className="bg-[#37475A] py-4 text-center hover:bg-[#485769] transition cursor-pointer"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <span className="text-sm font-medium">Back to top</span>
  </div>
}