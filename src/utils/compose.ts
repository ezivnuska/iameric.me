export default ({ components = [], children, ...rest }) => {

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp {...rest}>{acc}</Comp>
            }, children)}
        </>
    )
}