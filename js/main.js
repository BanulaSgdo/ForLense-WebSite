const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Close" : "Menu";
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("is-active");
  }
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const status = contactForm.querySelector("[data-form-status]");

    const subject = encodeURIComponent(`ForLens inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:info@forlense.xyz?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = "Your email client is opening with the prepared message.";
    }
  });
}

const demoTabs = document.querySelectorAll("[data-demo-tab]");
const demoPanels = document.querySelectorAll("[data-demo-panel]");

demoTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.demoTab;

    demoTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    demoPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.demoPanel === target);
    });
  });
});

const showcaseData = {
  agent: {
    image: "assets/images/agent.png",
    alt: "Endpoint agent module",
    owner: "IT22908742",
    title: "Endpoint telemetry and honeypot signals",
    body: "Runs lightweight monitoring, captures process/file/network activity, and uses decoys to expose early attacker behavior before real assets are reached.",
    details: [
      "Target overhead: less than 10% CPU/RAM impact.",
      "Secure telemetry forwarding delay target: less than 5 seconds.",
      "Supports endpoint-level response commands from the dashboard.",
      "Commercial value: quick SME deployment without specialist SOC setup."
    ]
  },
  ai: {
    image: "assets/images/anomaly-engine.jpeg",
    alt: "AI detection engine module",
    owner: "IT21289934",
    title: "Explainable behavioral detection",
    body: "Correlates anomaly models, threat intelligence feeds, and MITRE ATT&CK context so alerts are useful for non-specialist SME teams.",
    details: [
      "Isolation Forest for point anomalies.",
      "LSTM autoencoder concept for sequential behavior anomalies.",
      "Threat intelligence enrichment from open-source feeds.",
      "MITRE ATT&CK mapping presents detections as explainable tactics and techniques, not black-box model output."
    ]
  },
  logs: {
    image: "assets/images/secure-logs.png",
    alt: "Secure logging module",
    owner: "IT22887580",
    title: "Tamper-evident evidence chain",
    body: "Protects incident logs with verification-friendly cryptographic integrity, helping the final demo show exactly how tampering is detected.",
    details: [
      "Dynamic chunking for scalable log protection.",
      "Digest comparison to detect unauthorized log modification.",
      "Forensic evidence support for incident response and reporting.",
      "Commercial value: trusted incident evidence for compliance-minded SMEs."
    ]
  },
  soar: {
    image: "assets/images/Soar.png",
    alt: "SOAR dashboard module",
    owner: "IT22340078",
    title: "Dynamic response automation",
    body: "Turns alerts into recommended playbooks, quarantine notifications, response actions, and business-readable incident summaries.",
    details: [
      "Role-aware risk scoring for prioritized triage.",
      "Actions include isolate, block IP, terminate process, and notify admin.",
      "Feedback-driven workflow adaptation for reducing repeated false positives.",
      "Commercial value: one-click response for teams without dedicated SOC analysts."
    ]
  }
};

const showcaseTabs = document.querySelectorAll("[data-showcase]");
const showcaseImage = document.querySelector("[data-showcase-image]");
const showcaseCopy = document.querySelector("[data-showcase-copy]");

showcaseTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const data = showcaseData[tab.dataset.showcase];

    if (!data || !showcaseImage || !showcaseCopy) {
      return;
    }

    showcaseTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    showcaseImage.src = data.image;
    showcaseImage.alt = data.alt;
    const detailItems = data.details.map((item) => `<li>${item}</li>`).join("");
    showcaseCopy.innerHTML = `<span>${data.owner}</span><h3>${data.title}</h3><p>${data.body}</p><ul>${detailItems}</ul>`;
  });
});

const timelineItems = {
  brainstorm: ["25 Mar", "Brainstorming workshop", "Initial problem exploration for SME endpoint security, stakeholder needs, and feasible research scope."],
  registration: ["26 May", "Group registration", "Finalized the project team and aligned member responsibilities."],
  taf: ["30 Jun - 16 Jul", "Topic Assessment Form", "Submitted and refined the topic direction around explainable endpoint security for SMEs."],
  charter: ["23 July", "Project Charter", "Defined scope, deliverables, assumptions, risks, and project governance."],
  draft: ["15 Aug", "Proposal reports draft", "Prepared early research reports for member-specific components and supervisor feedback."],
  proposal: ["8-12 Sep", "Proposal presentation", "Presented the problem, gap, objectives, architecture direction, and validation plan."],
  "proposal-final": ["19 Sep", "Proposal reports final", "Submitted finalized proposal reports after review changes."],
  pp1: ["15-19 Dec", "Progress Presentation I", "Demonstrated prototype progress for agent, AI engine, secure logging, and SOAR dashboard."],
  check1: ["15-19 Dec", "Check List I", "Validated progress evidence and first-stage implementation deliverables."],
  research: ["Mar", "Research paper", "Prepared research contribution, evaluation direction, and supporting literature."],
  "final-report": ["Apr", "Final reports", "Completed final report material for system design, testing, and evaluation."],
  pp2: ["Mar", "Progress Presentation II", "Focused on integration, commercialization, visual demo flow, and panel feedback fixes."],
  check2: ["Mar", "Check List II", "Confirmed second-stage development and documentation progress."],
  rp: ["June", "RP acceptance notification", "Research paper acceptance milestone from the assessment timeline."],
  "final-viva": ["May", "Final presentation and viva", "Delivered final demonstration, defense, and individual component explanation."],
  website: ["June", "Project Website", "Published the commercialized project website with documents, slides, milestones, and team details."],
  logbook: ["June", "Research logbook", "Submitted the research logbook as the final project tracking record."]
};

const timelineButtons = document.querySelectorAll("[data-timeline-target]");
const timelineDetail = document.querySelector("[data-timeline-detail]");
const timelineBoard = document.querySelector("[data-timeline-board]");

timelineButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = timelineItems[button.dataset.timelineTarget];

    if (!item || !timelineDetail) {
      return;
    }

    timelineButtons.forEach((entry) => entry.classList.toggle("is-active", entry === button));
    timelineDetail.innerHTML = `<span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p>`;
  });
});

document.querySelectorAll("[data-timeline-filter]").forEach((filter) => {
  filter.addEventListener("click", () => {
    const phase = filter.dataset.timelineFilter;

    document.querySelectorAll("[data-timeline-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === filter);
    });

    timelineButtons.forEach((button) => {
      button.classList.toggle("is-muted", phase !== "all" && button.dataset.phase !== phase);
    });

    document.querySelectorAll(".road-card").forEach((card, index) => {
      const target = timelineButtons[index];
      card.classList.toggle("is-muted", phase !== "all" && target && target.dataset.phase !== phase);
    });
  });
});

document.querySelectorAll("[data-timeline-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!timelineBoard) {
      return;
    }

    const direction = Number(button.dataset.timelineScroll || 1);
    timelineBoard.scrollBy({
      left: direction * 420,
      behavior: "smooth"
    });
  });
});
