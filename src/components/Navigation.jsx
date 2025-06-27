import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '🏠 home' },
    { path: '/about', label: '💫 about me' },
    { path: '/blog', label: '📝 blog' },
  ]
  
  return (
    <nav className="navigation">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
