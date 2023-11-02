import { BOTTOMBAR_LINKS } from '@/constants'
import { Link, useLocation } from 'react-router-dom'

function Bottombar() {
  const { pathname } = useLocation()

  return (
    <footer className="bottom-bar">
      {BOTTOMBAR_LINKS.map((link) => (
        <Link
          to={link.route}
          key={link.label}
          className="data-[active=true]:bg-primary-500 rounded-[10px] flex-center flex-col gap-1 p-2 transition"
          data-active={pathname === link.route}
        >
          <img
            src={link.imgURL}
            alt={link.label}
            data-active={pathname === link.route}
            className="group-hover:invert-white transition-all data-[active=true]:invert-white"
            width={16}
            height={16}
          />
          <p className="tiny-medium text-light-2">{link.label}</p>
        </Link>
      ))}
    </footer>
  )
}

export default Bottombar
