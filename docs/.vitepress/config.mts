import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Virtual Labs",
  titleTemplate: "A MHRD Govt of India Initiative",
  description: "A MHRD Govt of India Initiative",
  head: [["link", { rel: "icon", href: "../favicon.ico" }]],
  lang: "en-US",
  base: "/",
  cleanUrls: true,

  themeConfig: {
    logo: { src: "../vlabs-full-logo.jpg", alt: "Vlabs Full Logo" },
    siteTitle: false,

    nav: [
      { text: "Home", link: "https://vlab.co.in/" },
      { text: "Partners", link: "https://vlab.co.in/participating-institutes" },
      { text: "Contact", link: "https://vlab.co.in/contact-us" },
    ],

    socialLinks: [
      { icon: "twitter", link: "https://twitter.com/TheVirtualLabs" },
      {
        icon: "facebook",
        link: "https://www.facebook.com/Virtual-Labs-IIT-Delhi-301510159983871/",
      },
      { icon: "youtube", link: "https://www.youtube.com/watch?v=asxRaOgk6a0" },
      {
        icon: "linkedin",
        link: "https://in.linkedin.com/in/virtual-labs-008ba9136",
      },
    ],

    outline: { level: [2, 3] },

    sidebar: {
      "/": [
        { text: "Introduction", link: "/" },

        { text: "Objective", link: "/objective" },

        { text: "List of experiments", link: "/listOfExperiments" },

        { text: "Target Audience", link: "/targetAudience" },

        { text: "Course Allignment", link: "/courseAllignment" },

        { text: "Feedback", link: "/feedback" },
      ],
      "/exp/name_of_first_experiment/": [
        { text: "Aim", link: "/exp/name_of_first_experiment/aim" },
        { text: "Theory", link: "/exp/name_of_first_experiment/theory" },
        {
          text: "Procedure",
          link: "/exp/name_of_first_experiment/procedure",
        },
        {
          text: "Self Evaluation",
          link: "/exp/name_of_first_experiment/selfEvaluation",
        },
        {
          text: "Simulation",
          link: "/exp/name_of_first_experiment/simulation",
        },
        {
          text: "Assignment",
          link: "/exp/name_of_first_experiment/assignment",
        },
        { text: "Quiz", link: "/exp/name_of_first_experiment/quiz" },
        { text: "Videos", link: "/exp/name_of_first_experiment/videos" },
        {
          text: "References",
          link: "/exp/name_of_first_experiment/references",
        },
        { text: "Feedback", link: "/exp/name_of_first_experiment/feedback" },
      ],
      "/exp/name_of_second_experiment/": [
        { text: "Aim", link: "/exp/name_of_second_experiment/" },
        { text: "Theory", link: "/exp/name_of_second_experiment/theory" },
        { text: "Procedure", link: "/exp/name_of_second_experiment/procedure" },
        {
          text: "Self Evaluation",
          link: "/exp/name_of_second_experiment/selfEvaluation",
        },
        {
          text: "Simulation",
          link: "/exp/name_of_second_experiment/simulation",
        },
        {
          text: "Assignment",
          link: "/exp/name_of_second_experiment/assignment",
        },
        { text: "Quiz", link: "/exp/name_of_second_experiment/quiz" },
        { text: "Videos", link: "/exp/name_of_second_experiment/videos" },
        {
          text: "References",
          link: "/exp/name_of_second_experiment/references",
        },
        { text: "Feedback", link: "/exp/name_of_second_experiment/feedback" },
      ],
    },

    docFooter: {
      prev: false,
      next: false,
    },

    footer: {
      message:
        'Released under the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPL 3.0</a>.',
      copyright:
        'Copyright © 2019-present <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons (CC BY-NC-SA 4.0)</a>',
    },
  },
});
