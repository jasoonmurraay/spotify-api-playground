import classes from './ButtonComponent.module.css'

const ButtonComponent = (props) => {
    const onClickHandler = (e) => {
        e.preventDefault()
        return props.onClick(e.target.value)
    }
    return (
        <button className={classes.styles} value={props.text} onClick={onClickHandler}>{props.text}</button>
    )
}

export default ButtonComponent