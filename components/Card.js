import classes from "../styles/Card.module.css";

const Card = (props) => {
  const renderSubContent = props.subContent.map((text) => {
    return <li>{text}</li>;
  });
  return (
    <a href={props.link}>
      <div className={classes.wholeCard}>
        {props.img && <img className={classes.cardImage} src={props.image} />}
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
