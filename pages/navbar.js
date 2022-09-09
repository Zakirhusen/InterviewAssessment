import Link from 'next/link'
import React from 'react'


export const Navbar = () => {
  return (
    <>
        <ul className='navbar'>
            <li className='nav-item'>
            <Link href="/allproducts">
            <a>
            All Products
            </a>
            </Link> </li>
            <li className='nav-item'>
            <Link href="/newproduct">
            <a>
            Add New Product
            </a></Link> </li>

        </ul>
    </>
  )
}


