import React from 'react'
import {
    UserHeading,
} from '.'

export default ({ user }) => (
    <UserHeading
        online={!!user.token}
        username={user.username}
        filename={user.profileImage && user.profileImage.filename ? user.profileImage.filename : null}
    />
)