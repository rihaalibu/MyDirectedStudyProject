import { useEffect, useState } from "react";

API_BASE_URL = "http://localhost:8080";
const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/client/1`).then((resp) =>
     resp.json()).then((data) => {
      setData(data)});
  },[])
return(
<>
<ul>
    {final.map((data,index)=> {
        console.log(data);
        return <li key={data.clientId}>{data.client_id} ({data.client_name})</li>
        })}
</ul>
</>
);
}

export default App;