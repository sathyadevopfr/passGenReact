import { useState ,useCallback,useEffect,useRef} from 'react';
function App() {
  const [length, setLength] = useState(8);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [numsAllowed, setNumsAllowed] = useState(false);
  const [password, setPassword] = useState(' ');
  const generatePassword = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numsAllowed) str += '0123456789';
    if (charsAllowed) str += '!@#$%^&*()_+-=[;:,.<>/?';
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    
  }, [length, charsAllowed, numsAllowed]);
  useEffect(() => {
    generatePassword();
  }, [length, charsAllowed, numsAllowed]);
  const copyPassToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }
  const passwordRef = useRef();

  return (
    // <div className="bg-gray-800">
    <div className="w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white-500">
      <h1 className="text-center text-white my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 text-black text-center"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="outline-none bg-violet-500 text-white px-5 py-0.5 shrink-0"
          onClick={copyPassToClipboard}
        >
          {" "}
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={7}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={e => setLength(e.target.value)}
          />
          <label htmlFor="length" className="text-white">
            Length : {length}
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numsAllowed}
            onChange={() => {
              return setNumsAllowed(prev => !prev);
            }}
          />
          <label htmlFor="numbers" className="text-white">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charsAllowed}
            onChange={() => {
              return setCharsAllowed(prev => !prev);
            }}
          />
          <label htmlFor="characters" className="text-white">
            Characters
          </label>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default App;
