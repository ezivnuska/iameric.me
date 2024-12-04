import React from 'react'
import { Form } from '@components'

const BugForm = ({ onCancel, onSubmit }) => {

    const fields = [
        {
            label: `Tell us what's wrong`,
            name: 'text',
            placeholder: 'Describe the error...',
            multiline: true,
        },
    ]

    return (
        <Form
            title='Report Bug'
            fields={fields}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
}

export default BugForm