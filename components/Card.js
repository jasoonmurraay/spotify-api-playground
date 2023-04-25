import classes from "../styles/Card.module.css";

const Card = (props) => {
  const renderSubContent = props.subContent
    ? props.subContent.map((text) => {
        if (props.subContent) {
          return <li>{text}</li>;
        }
      })
    : null;
  return (
    <div className={classes.wholeCard} onClick={props.onClickWhole}>
      {props.img && <img className={classes.cardImage} src={props.img} />}
      {props.header && <h2 className={classes.cardHeader}>{props.header}</h2>}
      <div>
        {props.subheader && <p className={classes.subHeader}></p>}
        {props.subContent && <ul>{renderSubContent()}</ul>}
        {props.btn1 && (
          <button onClick={() => props.onClick1}>{props.btn1}</button>
        )}
        {props.btn2 && (
          <button onClick={() => props.onClick2}>{props.btn2}</button>
        )}
      </div>
    </div>
  );
};
export default Card;
