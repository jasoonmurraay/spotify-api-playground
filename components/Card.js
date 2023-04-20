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
    <a className={classes.link} href={props.link}>
      <div className={classes.wholeCard}>
        {props.img && <img className={classes.cardImage} src={props.img} />}
        {props.header && <h2 className={classes.cardHeader}>{props.header}</h2>}
        <div>
          {props.subheader && <p className={classes.subHeader}></p>}
          {props.subContent && <ul>{renderSubContent()}</ul>}
        </div>
      </div>
    </a>
  );
};
export default Card;
