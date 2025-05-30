import React, { Fragment } from 'react'
import { navlinks } from '../../utils/utils'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { Listbox } from '@headlessui/react'

type Person = {
  id: number,
  name:string, 
  unavailable: boolean,
}

const people: Person[] = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]
const TestHeadless = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [selected, setSelected] = useState<Person>(people[0])
  const [selectedPerson, setSelectedPerson] = useState<Person>(people[0])

  return (
    <section className={`${enabled? 'bg-[#8d8d8d]' : 'mainDarkBg'} w-full h-screen`}>
      <div className='mainPX w-full text-white flex justify-between py-2'>
        <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
          {({ checked }) => (
            /* Use the `checked` state to conditionally style the button. */
            <button className={`${ checked ? 'bg-[#0b0b5b]' : 'bg-[beige]'}
            relative inline-flex h-6 w-[50px] items-center rounded-full`}
            >
              <span
                className={`${ checked ? 'translate-x-[28px]' : 'translate-x-[2px]'}
                  h-5 w-5 rounded-full bg-[#f4f4f4] transition1 border border-black`}
              />
            </button>
          )}
        </Switch>

        <div className='flex items-center gap-3'>
          {navlinks.map((link, i) => <p key={i}>{link.name}</p>)}
        </div>

        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <div className='flex flex-col gap-3 relative'>
            <Listbox.Button className={`border p-1 rounded-md outline-none`}>{selectedPerson.name}</Listbox.Button>
            <Listbox.Options className={`p-1 rounded-md absolute mt-[50px] right-0`}>
              {people.map((person) => (
                <div className='flex items-center gap-3 relative'>
                  {person.name === selectedPerson.name && <i className="absolute top-[3px] left-[-25px] fa-solid fa-circle-check"></i>}

                  <Listbox.Option  className={`text-nowrap outline-none cursor-pointer
                   ${person.unavailable ? 'opacity-30' : 'opacity-100'}`}
                    key={person.id}
                    value={person}
                    disabled={person.unavailable}
                  >
                    {person.name}
                  </Listbox.Option>
                </div>
              ))}
            </Listbox.Options>
          </div>
         
        </Listbox>
        
      </div>
    </section>
  )
}

export default TestHeadless