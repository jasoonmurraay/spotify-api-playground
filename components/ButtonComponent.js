const ButtonComponent = (props) => {
    const onClickHandler = (e) => {
        e.preventDefault()
        return props.onClick(e.target.value)
    }
    return (
        <button value={props.text} onclick={onClickHandler}>{props.text}</button>
    )
}

export default ButtonComponent