import classes from '../styles/ButtonComponent.module.css'

const ButtonComponent = (props) => {
    const onClickHandler = (e) => {
        e.preventDefault()
        return props.onClick(e.target.value)
    }
    return (
        <button className={`${classes.styles} btn btn-primary`} value={props.id? props.id : props.text} onClick={onClickHandler}>{props.text}</button>
    )
}

export default ButtonComponent