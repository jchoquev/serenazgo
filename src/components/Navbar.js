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
        
        <img className="w-7 mr-2" src="https://firebasestorage.googleapis.com/v0/b/imagenes-c3bce.appspot.com/o/LOGO-SERENAZGO-twiter_400x400-02.png?alt=media&token=5cbf59be-c008-4aaa-aa71-6a3c17478b80" alt="" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          SSCP Desaguadero
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
        <Navbar.Link href="/admin/role">
          Roles
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

//<BsFillCarFrontFill className="mr-3 h-6 sm:h-9"/>