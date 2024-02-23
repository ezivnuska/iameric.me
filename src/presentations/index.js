import  StartSmall from './start/StartSmall'
import  StartMedium from './start/StartMedium'
import  StartLarge from './start/StartLarge'

const getPresentation = size => {
    console.log('Showing Presentation:', size)
    switch (size) {
        case 'small': return <StartSmall />
        case 'medium': return <StartMedium />
        case 'large': return <StartLarge />
    }
}

export {
    getPresentation,
    StartSmall,
    StartMedium,
    StartLarge,
}