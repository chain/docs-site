import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const OptionList = [
    {
        title: "Sequence",
        img: require("@site/static/img/chain-sequence.png").default,
        description: (
            <>
                Sequence is a ledger-as-a-service that enables organizations to
                securely track and transfer balances in a token format.
            </>
        ),
    },
    {
        title: "Cloud",
        img: require("@site/static/img/chain-cloud.png").default,
        description: (
            <>
                Decentralized infrastructure protocol designed for developers to
                access blockchain networks on-demand.
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
    } else if (title === "Cloud") {
        link = "/docs/cloud/introduction";
    } else {
        link = "/";
    }
    return (
        <div className={styles.optionCard}>
            <Link to={link}>
                <div className={styles.content}>
                    <div className={styles.featureGifContainer}>
                        <img
                            src={img}
                            className={styles.featureGif}
                            role="img"
                        />
                    </div>
                    <div className={styles.optionDescription}>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function HomepageOptions() {
    return (
        <section className={styles.features}>
            <div className={styles.optionContainer}>
                {OptionList.map((props, idx) => (
                    <Option key={idx} {...props} />
                ))}
            </div>
        </section>
    );
}
