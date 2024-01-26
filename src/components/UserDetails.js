import React from 'react'
import {
    UserHeading,
} from '.'

export default ({ user }) => (
    <UserHeading
        user={user}
        filename={user.profileImage && user.profileImage.filename ? user.profileImage.filename : null}
    />
)