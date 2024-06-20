import axios from "axios";
import {useEffect, useState} from "react";
import QRCode from "react-qr-code";

interface Item {
  id: number;
  value: string;
}

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [items, setItems] = useState<Item[]>([{
    id: 1,
    value: 'qwf'
  }]);

  const handleGet = async () => {
    const response = await axios.get("http://localhost:3000");

    setItems(response.data);
  }

  useEffect(() => {
    handleGet()
  }, []);

  const handleAdd = async () => {
    if (!inputText) {
      return;
    }

    const response = await axios.post('http://localhost:3000/add', {
      value: inputText
    });

    setItems(prevState => ([...prevState, response.data]));
  }

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/delete/${id}`);
    setItems(prevState => prevState.filter(item => item.id !== id));
  }

  return (
   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%',  }}>
     <div>
       <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
       <button onClick={handleAdd}>
         Add
       </button>
     </div>
     <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
       {items.length ? items.map((item: Item) => (
         <div key={item.id} style={{display: 'flex', gap: 4}}>
           <QRCode value={`https://example.com/?table=${item.value}`}/>
           <button onClick={() => handleDelete(item.id)} style={{height: 40}}>
             Delete
           </button>
         </div>
       )) : <></>}
     </div>
   </div>
  )
}

export default App
