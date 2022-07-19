import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return <ArwesFooter animate>
    <Centered>
      <Paragraph style={{ fontSize: 14, margin: "10px 0" }}>
        Made with Love by Nidhal Hamdi
      </Paragraph>
    </Centered>
  </ArwesFooter>
};

export default Footer;
