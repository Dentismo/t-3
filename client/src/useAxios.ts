import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (configObj: { axiosInstance: any; method: any; url: any; message?: any }): {response: AxiosResponse<any, any> | undefined, error: string, loading: boolean, refetch: () => void} => {
    const {axiosInstance, method ,url, message} = configObj

    const [response, setResponse] = useState<AxiosResponse>()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(0)

    const refetch = () => setReload(prev => prev + 1)

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url, {
                    signal: controller.signal,
                    message: message
                })
                console.log(res)
                setResponse(res.data)
            } catch (error: any) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        //useEffect cleanup function
        return () => controller.abort()

        // eslint-disable-next-line
    }, [reload])

    return {response, error, loading, refetch}
}

export default useAxios