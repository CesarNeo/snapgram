import { SIDEBAR_LINKS } from '@/constants'
import { useUser } from '@/hooks/auth'
import { useSignOutMutation } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

function LeftSidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useUser()
  const { mutate: signOut, isSuccess } = useSignOutMutation()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess, navigate])

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
            alt=""
            className="h-14 w-14 rounded-full"
          />

          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {SIDEBAR_LINKS.map((link) => (
            <li
              key={link.label}
              className="leftsidebar-link data-[active=true]:bg-primary-500"
              data-active={pathname === link.route}
            >
              <NavLink
                to={link.route}
                className="flex gap-4 items-center p-4 group"
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  data-active={pathname === link.route}
                  className="group-hover:invert-white transition-all data-[active=true]:invert-white"
                />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost w-fit"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar
