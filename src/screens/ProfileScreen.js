import React from 'react'
import {
    LoadingView,
    Profile,
} from '@components'
import {
    Screen,
} from '.'
import {
    useUser,
} from '@context'

// export default props => {
//     const { profile } = useUser()
//     return (
//         <Screen {...props}>
//             {
//                 profile
//                 ? <Profile />
//                 : <LoadingView loading='Looking for profile...' />
//             }
//         </Screen>
//     )
// }
export default props => {
    // const { profile } = useUser()
    return (
        <Screen {...props}>
            <Profile />
        </Screen>
    )
}