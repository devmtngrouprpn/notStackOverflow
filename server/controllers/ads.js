// const Healing = require("./../../src/assets/Healing.svg");
// const Train = require("./../../src/assets/Train.svg");
// const Weight = require("./../../src/assets/Weight.svg");
// const Child = require("./../../src/assets/Child.svg");

// BROKEN DONT HIT
module.exports = {
  Ads: (req, res) => {
    console.log("Hit On Ads");
    let API = [
      {
        name: "Pear Theraputics",
        background: "",
        logo:
          "https://media.licdn.com/dms/image/C560BAQFKS8tiOjNJ0Q/company-logo_200_200/0?e=2159024400&v=beta&t=M6jBm3X9Q_pkJvZ5Z5V8PtEGtbPrg0RIfZ4Lx5ijWVo",
        location: "San Fransico, CA",
        industry: { type: "BioTechnology", img: "" },
        funds: true,
        size: "51 - 200",
        techStack: [
          "javascript",
          "java",
          "C++",
          "Ruby",
          "sql",
          "react",
          "vue",
          "performance"
        ],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 2
      },
      {
        name: "Pyrofex Corporation",
        background: "",
        logo: "https://pyrofex.io/wp-content/uploads/2018/08/Reddit-Icon.png",
        location: "Orem, UT",
        industry: { type: "CryptoCurency" },
        funds: false,
        size: "11-50",
        techStack: [
          "scala",
          "linux",
          "haskell",
          "rholang",
          "javascript",
          "c",
          "c++",
          "scheme"
        ],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 2
      },
      {
        name: "foreUP Inc.",
        background: "",
        logo:
          "data:image/png;base64,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",
        location: "Orem, UT",
        industry: { type: "Computer Software" },
        funds: false,
        size: "11-50",
        techStack: ["php", "apache", "twitter-bootstrap", "aws"],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 1
      },
      {
        name: "Salad Technologies",
        background: "",
        logo: "https://i.stack.imgur.com/aqSxx.png",
        location: "Park City, UT",
        industry: { type: "Cloud Computing" },
        funds: true,
        size: "1-10",
        techStack: ["electron", "C#", "javascript", "aws", "blockchain"],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 1
      },
      {
        name: "Varo Money",
        background: "",
        logo: "https://i.stack.imgur.com/FhoCR.png",
        location: "Draper, UT",
        industry: { type: "Banking" },
        funds: true,
        size: "51-200",
        techStack: ["java", "aws", "apache", "swift", "javascript"],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 4
      },
      {
        name: "Radiant",
        background: "",
        logo: "https://i.stack.imgur.com/ylnHw.png",
        location: "Salt Lake City, UT",
        industry: { type: "Augmented Reality" },
        funds: false,
        size: "11-50",
        techStack: ["node.js", "swift", "java"],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 3
      },
      {
        name: "SimpleNexus",
        background: "",
        logo: "https://i.stack.imgur.com/R72m5.png",
        location: "Lehi, UT",
        industry: { type: "Enterprise Software" },
        funds: false,
        size: "51-200",
        techStack: ["ruby", "swift", "vue"],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 3
      },
      {
        name: "Digital Media Solutions",
        background: "",
        logo: "https://i.stack.imgur.com/rBNTk.png",
        location: "Lehi, UT",
        industry: { type: "Digital Marketing" },
        funds: false,
        size: "201-500",
        techStack: ["javascript", "php", "laravel", "aws", "java"],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 3
      },
      {
        name: "Health Equity",
        background: "",
        logo: "https://i.stack.imgur.com/tzYRo.png",
        location: "Draper, UT",
        industry: { type: "Financial Services" },
        funds: false,
        size: "1k-5k",
        techStack: [".net", "sql", "C#", "html", "css"],
        benefits: [
          {
            img: Healing,
            desc:
              "401(k) and offer package inclusive of generous equity options"
          },
          {
            img: Train,
            desc: "Monthly stipends for cell phone use and commuting costs"
          },
          {
            img: Child,
            desc:
              "Paid parental leave for primary & secondary caregivers (moms & dads)"
          },
          { img: Weight, desc: "Wellness and fitness reimbursements" }
        ],
        jobNum: 3
      }
    ];
    res.status(200).send(API[0]);
  }
};
