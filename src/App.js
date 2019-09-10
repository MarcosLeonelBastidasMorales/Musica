import React, {useState, useEffect, Fragment} from 'react';
import Formulario from './componentes/Formulario';
import Cancion from './componentes/Cancion';
import Informacion from './componentes/Informacion';
import Axios from 'axios';
import { async } from 'q';


function App () {

  const [artista, agregarAtista] = useState('');
  const [letra, agregarLetra] = useState([]);
  const [info, agregarInfo] =useState({});



  ///Metodo para consultal la api de letra de canciones
  const consultarAPILetra = async busqueda => {
    const {artista, cancion} = busqueda;
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    //consultar la API 
    const resultado = await Axios(url);

    //Almacenar el artista que se busco
    agregarAtista(artista);

    //Guardar la letra de la cancion en el State
    agregarLetra(resultado.data.lyrics);
    
  }

  /// Metodo Para consultar la api de informacion
  const consultarAPIInfo= async () =>{
    if (artista){
      const url= `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const resultado = await Axios(url);
      agregarInfo(resultado.data.artists[0])
    }

  }
  useEffect( () => {
    consultarAPIInfo();
  },[artista] )





  return (

    <Fragment>
      <Formulario 
        consultarAPILetra={consultarAPILetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">

            <Informacion 
              info={info}
            />
            
          </div>

          <div className="col-md-6">
            <Cancion 
              letra={letra}
            />
          </div>
        </div>

      </div>

    </Fragment>

  );
};

export default App;