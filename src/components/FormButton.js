import React from 'react'
import { Button } from 'antd'

export default ({ dirty, valid, label, ...props }) => (
    <Button
        {...props}
        size='large'
        type={dirty ? 'primary' : 'dashed'}
        disabled={!dirty || !valid}
        style={{
            color: dirty ? '#fff' : '#777',
            backgroundColor: dirty ? '#161' : '#333',
        }}
    >
        {label}
    </Button>
)