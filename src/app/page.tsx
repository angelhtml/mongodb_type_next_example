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

    // get data
    const GetData = ()=>{
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
    GetData()
  }



  useEffect(() => {
    GetData()
  }, [])

  const Remove = (id: any) =>{
    axios({
      method: 'get',
      url: `/api/removeuser/${id}`,
    })
    .then(res => {
      console.log(res.data)
      GetData()
    })
    .catch(err => {
      console.log(err)
    })
  }

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
              <div className="border-2 border-red-500 p-2 m-6 flex justify-between" key={item._id}>
                <p>{item.name}</p>
                <button onClick={() => Remove(item._id)} className="text-red-500">remove</button>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
