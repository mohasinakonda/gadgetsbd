import { X } from "lucide-react"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type InputPros = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
const Input = (props: InputPros) => {

  return <input {...props} className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" />
}
export const AddressModal = () => {

  return <form action="" className="space-y-4 max-w-lg mx-auto p-9 rounded bg-gray-100 relative">
    <button type="button" popoverTarget="address-modal" popoverTargetAction="hide" className="absolute top-4 right-4 cursor-pointer ">
      <X />
    </button>
    <h2 className="text-lg font-bold">Shipping address</h2>
    <div className="flex gap-4 w-full">
      <div className="flex-1">
        <label htmlFor="name">Name</label>
        <Input type="text" id="name" name="name" />
      </div>
      <div className="flex-1">
        <label htmlFor="phone">Phone</label>
        <Input type="text" id="phone" name="phone" />
      </div>
    </div>

    <div>
      <label htmlFor="address">Address</label>
      <Input type="text" id="address" name="address" />
    </div>
    <div className="flex gap-4 w-full">
      <div className="flex-1">
        <label htmlFor="city">City</label>
        <Input type="text" id="city" name="city" />
      </div>
      <div className="flex-1">
        <label htmlFor="state">State</label>
        <Input type="text" id="state" name="state" />
      </div>
    </div>
    <div className="flex gap-4 w-full">
      <div className="flex-1">
        <label htmlFor="country">Country</label>
        <Input type="text" id="country" name="country" />
      </div>
      <div className="flex-1">
        <label htmlFor="postalCode">Postal Code</label>
        <Input type="text" id="postalCode" name="postalCode" />
      </div>
    </div>


    <button className="btn-primary rounded-md w-full h-12" type="submit">Save</button>
  </form>
}