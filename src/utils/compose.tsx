const compose = ({ components = [], children, ...rest }) => {

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp {...rest}>{acc}</Comp>
            }, children)}
        </>
    )
}

export default compose