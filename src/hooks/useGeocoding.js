import { useEffect, useState } from "react"
import Locationiq from "../utils/api";

export const useGeocoding = ({ latitude, longitude }) => {

    const [address, setaddress] = useState({});
    const [isFetching, setIsFetching] = useState(true);


    useEffect(() => {
        getGeocoding()
    }, [latitude, longitude])


    const getGeocoding = async () => {
        setIsFetching(false)
        const key = 'pk.32b790ffec52a831ac358dfd15412c91';
        const resp = await Locationiq.get(`/reverse?key=${key}&lat=${latitude}&lon=${longitude}&format=json`);
        setaddress(resp.data.address)
        setIsFetching(true)
    }


    const getAddres = async (latitude, longitude) => {
        const key = 'pk.32b790ffec52a831ac358dfd15412c91';
        const resp = await Locationiq.get(`/reverse?key=${key}&lat=${latitude}&lon=${longitude}&format=json`);
         setaddress(resp.data.address)
    }

    return {
        address,
        getAddres,
        isFetching
    }

}
