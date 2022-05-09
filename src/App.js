import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const bg_img = [
    "https://acegif.com/wp-content/gifs/sun-10.gif",
    "https://media.giphy.com/media/u01ioCe6G8URG/giphy.gif",
    "https://i.gifer.com/6ZDS.gif",
    "https://thumbs.gfycat.com/BabyishPerkyGallinule-size_restricted.gif",
    "https://thumbs.gfycat.com/FirmDisloyalBuzzard-size_restricted.gif",
    "https://acegif.com/wp-content/uploads/rain-4.gif",
    "https://acegif.com/wp-content/uploads/rainy-6.gif",
    "https://i.gifer.com/JPeu.gif",
    "https://acegif.com/wp-content/uploads/rain-5.gif",
    "https://www.gifmaniacos.es/wp-content/uploads/2021/08/tormentas-electricas-Gifmaniacos.es-13.gif"
]
  const [climap, setClimapp] = useState({})
  const [temperature, setTemperature] = useState()
  const [E_visibility, setE_Visibility] = useState()
  const [E_temperature_max, setE_Temperature_max]=useState()
  const [E_temperature_min, setE_Temperature_min]=useState()
  const [E_wind_speed, setE_wind_speed]=useState()

useEffect(()=>{
 function success(pos) {
    var crd = pos.coords;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=f95e6784a994835b446db5aca216dfda`)
    .then(res => {
      setClimapp(res.data)
      setTemperature(true)
      setE_Visibility(true)
      setE_Temperature_max(true)
      setE_Temperature_min(true)
      setE_wind_speed(true)

    })
    
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error);

},[])
const changeGrades = ()=>setTemperature(!temperature);
const changeVisibility = () => setE_Visibility(!E_visibility)
const changeTemperature_max = () => setE_Temperature_max(!E_temperature_max)
const changeTemperature_min = () => setE_Temperature_min(!E_temperature_min)
const changeWind_speed = () => setE_wind_speed(!E_wind_speed)




let bg_img_Index=String(climap.weather?.[0].id).substring(String(climap.weather?.[0].id).length -1,String(climap.weather?.[0].id).length);
document.body.style= `background-image: url('${bg_img[bg_img_Index]}')`

  return (
    <div className="App">
      <div className="div_container">
        <div className='div_title'>
          <h1>{climap.name}</h1>
          <h6>{climap.sys?.country}</h6>
        </div>
        <div className='div_content'>
          <img src={`http://openweathermap.org/img/wn/${climap.weather?.[0].icon}@2x.png`} alt="" />
        </div>
        <div className='div_content'>
          <h1>{temperature ? `${parseInt(climap.main?.temp)}  ` : `${parseInt(climap.main?.temp - 273.15)}  `}
            <i class="fa-solid fa-temperature-high"></i>
          </h1>
          <button onClick={changeGrades}>{temperature?"K":"C"}</button>
        </div>
        <div className='div_content termic'>
          <h2>{climap.weather?.[0].description}</h2>
          
        </div>
        <div className='div-pronostic'>
          <i class="fa-solid fa-eye-low-vision"></i> 
          {E_visibility?`${climap.visibility}` : `${climap.visibility / 1000}`} 
          <button onClick={changeVisibility}>{E_visibility?"M":"KM"}</button>
        </div>
        <div className='div-pronostic'>
          <i class="fa-solid fa-temperature-arrow-up"></i> 
          {E_temperature_max?`${climap.main?.temp_max}°` : `${parseInt(climap.main?.temp_max - 273.15)}º`}
          <button onClick={changeTemperature_max}>{E_temperature_max?"K":"C"}</button>
        </div>
        <div className='div-pronostic'>
          <i class="fa-solid fa-temperature-arrow-down"></i> 
          {E_temperature_min?`${climap.main?.temp_min}°` : `${parseInt(climap.main?.temp_min - 273.15)}º`}
          <button onClick={changeTemperature_min}>{E_temperature_min?"K":"C"}</button>
        </div>
        <div className='div-pronostic'>
          <i class="fa-solid fa-wind"></i> 
          {E_wind_speed?`${climap.wind?.speed}` : `${climap.wind?.speed * 3600 / 1000}`}
          <button onClick={changeWind_speed}>{E_wind_speed?"M":"K/H"}</button>
        </div>
        <div className='div-pronostic'>
          <i class="fa-solid fa-droplet-percent"></i>
          {climap.main?.humidity}%
        </div>
      </div>
      
    </div>
  );
}

export default App;
