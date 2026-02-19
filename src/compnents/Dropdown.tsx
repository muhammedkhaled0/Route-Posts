import  UsersIcon  from '@/src/compnents/icons/UsersIcon'

type Props = {
  register: any
  name: string
  error?: string
  touched?: boolean
}

export default function Dropdown({ register, name, error, touched }: Props) {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="relative">
        <UsersIcon className="size-5 text-gray-400 absolute top-1/2 -translate-y-1/2 start-2 pointer-events-none" />
        <select
          {...register(name)}
          className="
            input
            appearance-none
            ps-11
            cursor-pointer
            focus:border-blue-600
          "
        >
          <option value=""> Select gender</option>
          <option value="male"> Male</option>
          <option value="female"> Female</option>
        </select>

        {/* arrow */}
        <svg
          className="size-4 absolute end-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.5 7.5L10 12l4.5-4.5" />
        </svg>
      </div>

      {touched && error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
