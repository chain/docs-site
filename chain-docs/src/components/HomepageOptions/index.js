import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const OptionList = [
  {
    title: "Sequence",
    img: require("@site/static/img/sequence-full.gif").default,
    description: (
      <>
        Sequence is a ledger-as-a-service that enables organizations to securely
        track and transfer balances in a token format.
      </>
    ),
  },
  {
    title: "XCN",
    img: require("@site/static/img/xcn-full.gif").default,
    description: (
      <>
        The Chain Ecosystem Cryptocurrency. Stake your XCN today to participate
        in Chain Governance.
        {/* these line breaks make the cards the same hight, should fix in CSS */}
        {/* <br /><br /> */}
      </>
    ),
  },
];

function Option({ img, title, description }) {
  var link;
  if (title === "Sequence") {
    link = "/docs/sequence/get-started/introduction";
  } else if (title === "XCN") {
    link = "/docs/xcn/token/introduction";
  } else {
    link = "/";
  }
  return (
    <div className={styles.optionCard}>
      <Link to={link}>
        <div className="text--center">
          <img src={img} className={styles.featureGif} role="img" />
        </div>
        <div className="option-description text--left padding-horiz--lg">
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageOptions() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {OptionList.map((props, idx) => (
            <Option key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
