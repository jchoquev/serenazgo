'use client';

import { Dropdown, Navbar } from 'flowbite-react';
import { BsFillCarFrontFill } from "react-icons/bs";
import { signOut } from "next-auth/react";

export default function NavbarAdmin({User}) {
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="/admin">
        <BsFillCarFrontFill className="mr-3 h-6 sm:h-9"/>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          SSCP Puno
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
          <Dropdown
            inline
            label={<BsFillCarFrontFill/>}
            className='z-50'
          >
          <Dropdown.Header>
            <span className="block text-sm">
              {User&&User.fullNombres}
            </span>
            <span className="block truncate text-sm font-medium">
              {User&&User.Cargo.Cargo}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            Configuracion
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={()=>{signOut();}}>
            Salir
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="#"
        >
          <p>
            Inicio
          </p>
        </Navbar.Link>
        <Navbar.Link href="/admin/vehicles">
          Vehiculos
        </Navbar.Link>
        <Navbar.Link href="/admin/grupo">
          Grupo
        </Navbar.Link>
        <Navbar.Link href="/admin/handys">
          Handy
        </Navbar.Link>
        <Navbar.Link href="/admin/tacticalpoints">
          Puntos tacticos
        </Navbar.Link>
        <Navbar.Link href="/admin/zonas">
          Zonas
        </Navbar.Link>
        <Navbar.Link href="/admin/personal">
          Personal
        </Navbar.Link>
        <Navbar.Link href="/admin/asistencia">
          Asistencia
        </Navbar.Link>
        <Navbar.Link href="/admin/configs">
          Configuraciones
        </Navbar.Link>
        <Navbar.Link href="/admin/sipcop">
          SIPCOP-M
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}