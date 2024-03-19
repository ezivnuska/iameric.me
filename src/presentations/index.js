import  StartSmall from './start/StartSmall'
import  StartMedium from './start/StartMedium'
import  StartLarge from './start/StartLarge'

const getPresentation = (name, size) => {
    switch(name) {
        case 'start': {
            // console.log('size', size)
            switch (size) {
                case 'small': return <StartSmall />
                case 'medium': return <StartMedium />
                case 'large': return <StartLarge />
            }
        }
    }
}

export {
    getPresentation,
    StartSmall,
    StartMedium,
    StartLarge,
}