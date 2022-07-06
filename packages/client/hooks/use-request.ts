import { useState } from 'react'

export interface UseRequestHook {
  doRequest: Function;
  errors: Array<Object>;
}

export interface RequestError {
  code: Number,
  message: String
}

export interface RequestOptions {
  url: RequestInfo | URL,
  method?: String,
  body?: Object,
  customHeaders?: Object,
  onSuccess?: Function
}

const defaultHeaders = { 'Content-Type': 'application/json' }

const useRequest = ({ url, method, body, customHeaders, onSuccess }: RequestOptions) => {
  const [errors, setErrors] = useState<Array<RequestError>>([])

  const doRequest = async () => {
    const headers = customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
    const options: any = { headers, method: method?.toUpperCase() || 'GET' }
    if (body) options.body = JSON.stringify(body)

    const response = await fetch(url, options)
    const data = await response.json()
  
    let errorsData: Array<RequestError> = []
    if (data.error) errorsData = data.error?.data?.map?.((err: any) => ({ code: response.status, message: err.msg })) || [{ code: response.status, message: data.error.message }]
    setErrors(errorsData)

    if (errorsData.length === 0 && onSuccess) onSuccess(data)
    return data
  }

  return { doRequest, errors }
}

export default useRequest
