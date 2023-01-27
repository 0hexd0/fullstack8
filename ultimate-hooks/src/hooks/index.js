import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        async function getAll() {
            const response = await axios.get(baseUrl)
            setResources(response.data)
        }
        getAll()
    }, [baseUrl])

    // ...

    const create = (resource) => {
        async function add() {
            const response = await axios.post(baseUrl, resource)
            setResources(resources.concat(response.data))
        }
        add()
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}