import { Progress } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import './App.css';
import type { FormEvent } from 'react';
import { useState } from 'react';
import bersiaplah from './assets/bersiaplah.jpg';
import rusdi from './assets/rusdi.jpg';
import imut from './assets/imut.jpg';
import yesking from './assets/yesking.png';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [percent, setPercent] = useState(0);
  const [imgPath, setImgPath] = useState('');
  const jomokers = [
    "humam", "jeisa", "rafa", "danu", "farhan"
  ]

  const checkJomok = (event: FormEvent) => {
    event.preventDefault();
    const currentName = inputValue.toLowerCase();
    
    // 1. Definisikan variabel lokal untuk menampung hasil persentase yang baru
    let calculatedPercent = 0;

    // Set submittedName (hanya untuk keperluan rendering)
    setSubmittedName(inputValue);
    

    
    // Logika perhitungan persentase
    if (currentName) {
      if (jomokers.some(jomoker => currentName.includes(jomoker))){
        calculatedPercent = 1000;
    } else {
            calculatedPercent = Math.floor(Math.random() * 101);
        }
    }
    
    // **2. Gunakan VARIABEL LOKAL untuk LOGIKA penentuan ImgPath**
    // (Bukan state 'percent' yang masih lama)
    if (calculatedPercent >= 0 && calculatedPercent < 26) {
      setImgPath(bersiaplah);
    } 
    else if (calculatedPercent < 51) {
      setImgPath(rusdi);
    } 
    else if (calculatedPercent < 76) {
      setImgPath(imut);
    } 
    else {
      setImgPath(yesking);
    }
    
    // **3. Update state 'percent' untuk keperluan TAMPILAN**
    // Panggilan ini memicu re-render berikutnya
    setPercent(calculatedPercent); 

    setInputValue('');
  };  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className='flex flex-col max-w-2xl mx-auto'> 
        <h1 className='mb-4'>Seberapa jomok kamu?</h1>
        <h3 className='mb-4'>Masukkan nama kamu di bawah! <span><ArrowDownOutlined /></span></h3>
        <form onSubmit={checkJomok} className='flex flex-col gap-4'>
          <input type="text" 
                  value={inputValue} 
                  id='inputName' 
                  placeholder='Contoh: Humam' 
                  onChange={handleInputChange}
                  className='min-h-10 border border-gray-400 rounded-md p-2' />
          <button className='text-white' type='submit'>
            Submit
          </button>
        </form>

        {submittedName && percent <= 100 && (
          <div className='mt-4 flex flex-col gap-2'>
            <p><b>{submittedName}</b>, Kamu {percent}% Jomok!</p>
            <Progress percent={percent} status='active' showInfo={false} />
            <img src={imgPath} />
          </div>
        )}
        {submittedName && percent == 1000 && (
          <div className='mt-4 flex flex-col gap-2'>
            <p className='mb-2'><b>{submittedName}</b>, Kamu {percent}% Jomok!</p>
            <div className='w-screen relative left-1/2 right-1/2 -mx-[50vw]'>
              <Progress percent={percent} status='active' showInfo={false} strokeColor='#F54927' />
            </div>
            <img src={imgPath} className='w-full' />
          </div>
        )}
      </div>
    </>
  )
}

export default App;
