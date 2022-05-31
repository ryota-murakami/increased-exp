import { HomeIcon } from '@heroicons/react/outline'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import { onCloseHander } from './Sidebar'

const LoginLink: React.FC = memo(() => {
  return (
    <Link
      onClick={onCloseHander}
      to="/login"
      data-cy="login-btn"
      className="group flex items-center rounded-md bg-gray-900 px-2 py-2 text-base font-medium text-white"
    >
      <HomeIcon className="'text-gray-300 flex-shrink-0' mr-4 h-6 w-6" />
      Login
    </Link>
  )
})
LoginLink.displayName = 'LoginLink'

export default LoginLink
