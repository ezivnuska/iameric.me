import { AppContext, AppContextProvider, useApp } from './AppContext'
// import { AuthContext, AuthContextProvider, useAuth } from './AuthContext_BAK2'
import { CartContext, CartContextProvider, useCart } from './CartContext'
import { ContactContext, ContactContextProvider, useContacts } from './ContactContext'
import { FormContext, FormContextProvider,useForm } from './FormContext'
import { ForumContext, ForumContextProvider,useForum } from './ForumContext'
import { ModalContext, ModalContextProvider, useModal } from './ModalContext'
import { OrderContext, OrderContextProvider, useOrders } from './OrderContext'
import { ProductContext, ProductContextProvider, useProducts } from './ProductContext'
import { UserContext, UserContextProvider, useUser } from './UserContext'

export {
    AppContext,
    AppContextProvider,
    // AuthContext,
    // AuthContextProvider,
    CartContext,
    CartContextProvider,
    ContactContext,
    ContactContextProvider,
    FormContext,
    FormContextProvider,
    ForumContext,
    ForumContextProvider,
    ModalContext,
    ModalContextProvider,
    OrderContext,
    OrderContextProvider,
    ProductContext,
    ProductContextProvider,
    // useAuth,
    useApp,
    useCart,
    useContacts,
    useForm,
    useForum,
    useModal,
    useOrders,
    useProducts,
    useUser,
    UserContext,
    UserContextProvider,
}