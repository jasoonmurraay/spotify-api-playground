import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={`${classes.footerBody}`}>
      <p>Spotify App</p>
      <p>&copy; Jason Murray 2023</p>
    </div>
  );
};

export default Footer;
