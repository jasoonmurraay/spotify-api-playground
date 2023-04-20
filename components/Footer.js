import classes from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${classes.footerBody}`}>
      <p>Spotify App</p>
      <p>&copy; Jason Murray 2023</p>
    </footer>
  );
};

export default Footer;
