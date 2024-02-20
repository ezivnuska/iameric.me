import React, { useContext } from 'react'
import {
    ThemedText,
    LoadingView,
    VendorList,
} from '@components'
import {
    Screen,
} from '.'
import { loadUsersByRole } from '@utils/data'
import { AppContext } from '../../AppContext'

export default props => {

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const [vendors, setVendors] = useState(null)

    useEffect(() => {
        loadVendors()
    }, [])

    const loadVendors = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading vendors...' })
        
        const users = await loadUsersByRole('vendor')
        
        setVendors(users)
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }
    
    return (
        <Screen title='Merchants'>
            
            {loading
                ? <LoadingView label={loading} />
                : (
                    <View
                        style={{ display: vendors ? 'visible' : 'hidden' }}
                    >
                        {
                            vendors
                                ? <VendorList users={vendors} {...props} />
                                : <ThemedText>No participating vendors.</ThemedText>
                        }

                    </View>
                )
            }

        </Screen>
    )
}