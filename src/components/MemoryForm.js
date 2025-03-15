import React, { useMemo, useState } from 'react'
// import { View } from 'react-native'
// import { Card } from 'react-native-paper'
import { DateSelector, Form, ModalContainer, ModalHeader } from '@components'
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
        // <Card
        //     elevation={1}
        //     style={{
        //         flex: 1,
        //         width: '100%',
        //         gap: 10,
        //     }}
        // >

        //     <ModalHeader
        //         title={`${data ? 'Edit' : 'New'} Memory`}
        //     />

        //     <View style={{ flex: 1, gap: 10 }}>
        //         <View style={{ paddingHorizontal: 15 }}>
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
        //         </View>

        //     </View>
                
        // </Card>
    )
}

export default MemoryForm