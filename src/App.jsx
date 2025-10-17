import { use, useCallback, useEffect, useState, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setlength] = useState(8);
  const [numbersallowed, setnumbersallowed] = useState(false);
  const [charctersallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");


  const passwordref = useRef(null);


  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let charcters = "!@#$%^&*(){}[]"
    let number = "1234567890";

    if(numbersallowed) str += number
    if(charctersallowed) str += charcters
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);

  }, [numbersallowed, length, charctersallowed, setpassword])

  useEffect(() => {
    passwordgenerator()
  }, [numbersallowed, length, charctersallowed, passwordgenerator])

  const copytoclipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 999); 
    window.navigator.clipboard.writeText(password) 
  }, [password])


  return (
    <>
      <div className='w-full h-screen bg-black flex flex-col  items-center'>
        <h1 className='text-white text-center text-2xl p-4'>Password Generator</h1>
        <div>
          <div className='p-12 h-36 bg-gray-900 rounded-lg w-200 border-2 mt-19 flex gap-12'>
            <input
              placeholder='Password'
              readOnly
              ref={passwordref}
              value={password}
              className='outline-none w-full p-3 border-1 border-white rounded-lg bg-white'
              type="text" />
            <button className='bg-white rounded-lg px-4 cursor-pointer'
            onClick={copytoclipboard}
            >Copy</button>
          </div>
          <div className='flex gap-12'>
            <div className='flex gap-9 w-65'>
              <input type="range"
                min={6}
                max={19}
                onChange={(e) => {
                  setlength(e.target.value)
                }}
              />
              <label className='text-white text-lg ' htmlFor="">Length : {length} </label>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox"
                defaultChecked={numbersallowed}
                onClick={() => {
                  setnumbersallowed((e) => !e)
                }}
              />
              <label className='text-white text-lg ' htmlFor="">Numbers allowd</label>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox"
                defaultChecked={charctersallowed}
                onClick={() => {
                  setcharallowed((e) => !e)
                }}
              />
              <label className='text-white text-lg' htmlFor="">Charactors allowd</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
