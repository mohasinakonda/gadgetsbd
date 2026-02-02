import { X } from "lucide-react"

export const Modal = ({ children }: { children: React.ReactNode }) => {

  return <div popover="auto" id="modal" className="w-full h-full backdrop-blur-2xl">
    <button popoverTarget="modal" popoverTargetAction="hide" className="absolute top-4 right-4 cursor-pointer">
      <X />
    </button>
    <div className="max-w-[1000px] mx-auto w-full p-6">
      {children}
    </div>
  </div>
}