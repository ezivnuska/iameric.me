import React from 'react'
import { Button } from 'antd'

export default ({ dirty, valid, label, ...props }) => (
    <Button
        {...props}
        size='large'
        type={dirty ? 'primary' : 'default'}
        disabled={!dirty || !valid}
        style={{
            color: dirty ? '#fff' : '#fff',
            backgroundColor: dirty ? '#161' : '#ccc',
        }}
    >
        {label}
    </Button>
)