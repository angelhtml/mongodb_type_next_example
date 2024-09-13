"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([])
  const [input, setInput] = useState({
    name: '',
    password: ''
  })

  const Inputhander = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value,
      }
    })
  }

  const Submit = () => {
    axios({
      method: 'post',
      url: '/api/adduser',
      data: {
        name: input.name,
        password: input.password
      }
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/getuser'
    })
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [Submit])

  return (
    <div>
      <div>
        <input name='name' value={input.name} onChange={Inputhander} placeholder="name"/>
        <input name="password" value={input.password} onChange={Inputhander} placeholder="password"/>
        <button onClick={Submit}>submit</button>
      </div>
      <div>
        {
          data && data.map((item: any) => {
            return (
              <div key={item._id}>
                <p>{item.name}</p>
                <p>{item.password}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
