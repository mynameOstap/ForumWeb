


export const Spinner = ({size = 8,color = "white"}) => {
    return(
        <span className={`inline-block animate-spin rounded-full border-4 border-solid border-${color}  border-t-transparent
        h-${size}
        w-${size}`}>          
        </span>
    )
}