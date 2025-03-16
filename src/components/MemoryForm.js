import React, { useMemo, useState } from 'react'
import { DateSelector, Form, ModalContainer } from '@components'
import { useMemory, useForm, useModal, useUser } from '@context'
import { createMemory } from '@utils/memories'
import { getDate, getMonth, getYear } from 'date-fns'

const MemoryForm = ({ data = null }) => {

    const fields = [
        {
            name: 'body',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { updateMemory } = useMemory()
    const { formError, formFields, resetForm, setFormError, setFormLoading } = useForm()
    const { closeModal } = useModal()
    const { user } = useUser()

    const [date, setDate] = useState(null)
    const year = useMemo(() => date && getYear(date), [date])
    const month = useMemo(() => date && getMonth(date), [date])
    const day = useMemo(() => date && getDate(date), [date])

    const handleSubmit = async () => {
        
        let memoryData = {
            ...data,
            ...formFields,
            _id: data?._id || null,
            author: user._id,
            year,
            month,
            day,
        }

        let newMemory = await createMemory(memoryData)
        
        if (newMemory) {
            updateMemory(newMemory)

            closeModal()
        }
    }

    const submitFormData = async () => {

        if (formError) {
            console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
        }
         
        setFormLoading(true)
        const response = await handleSubmit()
        setFormLoading(false)
         
        if (response) {
            if (response.error) {
                setFormError(response)
            } else resetForm()
        }
    }

    return (
        <ModalContainer title={`${data ? 'Edit' : 'New'} Memory`}>
            
            <DateSelector
                memory={data}
                onChange={value => setDate(value)}
            />

            <Form
                data={data}
                fields={fields}
                onSubmit={submitFormData}
            />

        </ModalContainer>
    )
}

export default MemoryForm