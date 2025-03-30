import React, { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { DateSelector, Form, Row, Stack } from '@components'
import { useMemory, useForm, useModal, useUser } from '@context'
import { Size } from '@utils/stack'
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
        <Stack
            flex={1}
        >
            <Row
                padding={[Size.XS, Size.XS, Size.None, Size.M]}
                align='center'
            >
                <Text
                    variant='headlineSmall'
                    style={{ flex: 1 }}
                >
                    {`${data ? 'Edit' : 'New'} Memory`}
                </Text>

                <IconButton
                    icon='close-thick'
                    onPress={closeModal}
                    style={{ margin: 0, padding: 0 }}
                />

            </Row>

            <ScrollView
                style={{
                    marginVertical: 0,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Size.S,
                }}
            >
            
                <Stack
                    flex={1}
                    spacing={Size.M}
                    padding={[Size.S, Size.M]}
                >
            
                    <DateSelector
                        memory={data}
                        onChange={value => setDate(value)}
                    />
        
                    <Form
                        data={data}
                        fields={fields}
                        onSubmit={submitFormData}
                    />

                </Stack>

            </ScrollView>

        </Stack>
    )
}

export default MemoryForm