import Link from "next/link"

const ProfileMenu = () => {
  return (
    <div className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' tabIndex={-1}>
        <Link href={'#'} className='text-gray-700 block px-4 py-2 text-sm'>Item 1</Link>
        <Link href={'#'} className='text-gray-700 block px-4 py-2 text-sm'>Item 2</Link>
        <Link href={'#'} className='text-gray-700 block px-4 py-2 text-sm'>Item 3</Link>
    </div>
  )
};

export default ProfileMenu