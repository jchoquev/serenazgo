"use client"
import { Button, Checkbox, Label, TextInput ,Select ,Tabs} from 'flowbite-react';
import Navbar from "@/components/Navbar";
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import {PiUserList} from "react-icons/pi"
import { MdDashboard } from 'react-icons/md';

export default function admin(){
    return (
        <>
          <Navbar/>
          <div className='container mx-auto p-5'>
            <Tabs.Group
            aria-label="Default tabs"
            style="default"
            >
                <Tabs.Item
                    active
                    icon={HiUserCircle}
                    title="Nuevo"
                >
                    <ShadowInputs/>
                </Tabs.Item>
                <Tabs.Item
                    icon={PiUserList}
                    title="Usuarios"
                >
                    <p>
                    This is
                    <span className="font-medium text-gray-800 dark:text-white">
                        Dashboard tabs associated content
                    </span>
                    .
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                    </p>
                </Tabs.Item>
            </Tabs.Group>
          </div>  
        </>
    );
}

function ShadowInputs() {
    return (
      <form className="grid grid-cols-4 gap-4 p-1">
        <div>
          <div className="block">
            <Label
              value="DNI:"
            />
          </div>
          <TextInput
            name="DNI"
            required
            sizing="sm"
            shadow
            type="text"
          />
        </div>
        <div>
          <div className="block">
            <Label
              value="Nombres:"
            />
          </div>
          <TextInput
            name="Nombre"
            required
            sizing="sm"
            shadow
            type="text"
          />
        </div>
        <div>
          <div className="block">
            <Label
              value="Apellido Paterno:"
            />
          </div>
          <TextInput
            name="ApePaterno"
            required
            sizing="sm"
            shadow
            type="text"
          />
        </div>
        <div>
          <div className="block">
            <Label
              value="Apellido Materno:"
            />
          </div>
          <TextInput
            name="ApeMaterno"
            required
            sizing="sm"
            shadow
            type="text"
          />
        </div>
        <div>
          <div className="block">
            <Label
              value="Apellido Materno:"
            />
          </div>
          <TextInput
            name="ApeMaterno"
            required
            sizing="sm"
            shadow
            type="text"
          />
        </div>
        <div>
          <div className="block">
            <Label
              value="# de Celular:"
            />
          </div>
          <TextInput
            name="NCelular"
            required
            sizing="sm"
            shadow
            type="text"
          />
        </div>
        <div>
          <div className="block">
            <Label
              value="Grupo:"
            />
          </div>
          <TextInput
            name="NCelular"
            required
            sizing="sm"
            shadow
            type="text"
          />
        </div>
        <div
        className="max-w-md"
        id="select"
        >
        <div className="block">
            <Label
            value="Grupo"
            />
        </div>
        <Select name="Grupo"  required   sizing="sm" >
            <option >  </option>
            <option>
            Canada
            </option>
            <option>
            France
            </option>
            <option>
            Germany
            </option>
        </Select>
        </div>

      </form>
    )
  }
  
  
  