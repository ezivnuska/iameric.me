import { AppContextProvider, useApp } from './AppContext'
import { BugContextProvider, useBugs } from './BugContext'
import { FeedContextProvider, useFeed } from './FeedContext'
import { FormContextProvider, useForm } from './FormContext'
import { ModalContextProvider, useModal } from './ModalContext'
import { UserContextProvider, useUser } from './UserContext'
import { NotificationContextProvider, useNotification } from './NotificationContext'
import { SocketContextProvider, useSocket } from './SocketContext'
// import { ContactsContextProvider, useContacts } from './ContactsContext'

export {
    AppContextProvider,
    BugContextProvider,
    // ContactsContextProvider,
    FeedContextProvider,
    FormContextProvider,
    NotificationContextProvider,
    UserContextProvider,
    ModalContextProvider,
    SocketContextProvider,
    useApp,
    useBugs,
    // useContacts,
    useFeed,
    useForm,
    useModal,
    useNotification,
    useSocket,
    useUser,
}