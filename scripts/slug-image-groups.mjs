// Maps each resource slug to its curated image group (see scripts/resolved_images.json).
export const SLUG_TO_GROUP = {
  // Kant
  "kant-s-moral-philosophy": "KANT",
  "groundwork-for-the-metaphysic-of-morals": "KANT",
  "kant-categorical-imperative": "KANT",
  "critique-of-pure-reason": "KANT",
  "critique-of-judgement": "KANT",
  // Aristotle
  "the-nicomachean-ethics": "ARISTOTLE",
  "aristotle-logic": "ARISTOTLE",
  "organon-and-other-logical-works": "ARISTOTLE",
  "the-poetics": "ARISTOTLE",
  // Plato
  "the-republic": "PLATO",
  "introduction-to-political-philosophy": "PLATO",
  // Hume
  "dialogues-concerning-natural-religion": "HUME",
  "an-enquiry-concerning-human-understanding": "HUME",
  "of-the-standard-of-taste": "HUME",
  // Descartes
  "meditations-on-first-philosophy": "DESCARTES",
  "gary-hatfield-on-descartes-meditations": "DESCARTES",
  // Locke
  "second-treatise-of-government": "LOCKE",
  // Hobbes
  leviathan: "HOBBES",
  // Rousseau
  "the-social-contract-discourses": "ROUSSEAU",
  // Mill
  utilitarianism: "MILL",
  "a-system-of-logic-ratiocinative-and-inductive": "MILL",
  // Berkeley
  "three-dialogues-between-hylas-and-philonous": "BERKELEY",
  // Aquinas
  "the-ox-heard-round-the-world-thomas-aquinas": "AQUINAS",
  // Anselm / ontological arguments
  "ontological-arguments": "ANSELM",
  // Rawls
  "john-rawls": "RAWLS",
  "john-rawls-internet-encyclopedia-of-philosophy": "RAWLS",
  "jonathan-wolff-on-john-rawls-a-theory-of-justice": "RAWLS",
  "john-rawls-his-life-and-theory-of-justice": "RAWLS",
  "the-rawlsian-social-contract": "RAWLS",
  // Kierkegaard
  "kierkegaard-s-ren": "KIERKEGAARD",
  "s-ren-kierkegaard-a-free-online-course": "KIERKEGAARD",
  // Camus
  "camus-albert": "CAMUS",
  "an-animated-introduction-to-albert-camus-existentialism": "CAMUS",
  "camus-on-the-absurd-the-myth-of-sisyphus": "CAMUS",
  // Sartre
  "sartre-jean-paul-existentialism": "SARTRE",
  "mary-warnock-on-sartre-s-existentialism": "SARTRE",
  // Existentialism generic
  existentialism: "EXISTENTIALISM_GENERIC",
  "the-cambridge-companion-to-existentialism": "EXISTENTIALISM_GENERIC",
  // Confucius
  confucius: "CONFUCIUS",
  "the-analects-of-confucius": "CONFUCIUS",
  // Laozi / Daoism
  daoism: "LAOZI_DAOISM",
  "the-tao-teh-king-or-the-tao-and-its-characteristics": "LAOZI_DAOISM",
  // Zhuangzi
  zhuangzi: "ZHUANGZI",
  "the-complete-works-of-chuang-tzu": "ZHUANGZI",
  // Nagarjuna
  nagarjuna: "NAGARJUNA",
  "no-four-ways-about-it-n-g-rjuna-s-tetralemma": "NAGARJUNA",
  // Buddha
  "dhammapada-a-collection-of-verses": "BUDDHA",
  "suffering-and-smiling-the-buddha": "BUDDHA",
  "nothingness-in-asian-philosophy": "BUDDHA",
  // Bentham / utilitarianism video
  "utilitarianism-ethics-unwrapped": "BENTHAM",
  // Virtue ethics / Greek agora
  "virtue-ethics": "GREEK_AGORA",
  "virtue-ethics-ethics-unwrapped": "GREEK_AGORA",
  // Ethics generic / justice fountain
  consequentialism: "JUSTICE_GENERIC",
  "consequentialism-and-utilitarianism": "JUSTICE_GENERIC",
  "ethics-a-free-online-course": "JUSTICE_GENERIC",
  // Problem of evil
  "the-problem-of-evil": "PROBLEM_OF_EVIL",
  "the-problem-of-evil-is-suffering-evidence-that-there-is-not-a-god": "PROBLEM_OF_EVIL",
  "stephen-law-on-the-problem-of-evil": "PROBLEM_OF_EVIL",
  "the-problem-of-evil-for-atheists": "PROBLEM_OF_EVIL",
  // Religion generic
  "theological-voluntarism": "RELIGION_GENERIC",
  "philosophy-of-religion": "RELIGION_GENERIC",
  "ethics-and-god-divine-command-theory-and-the-euthyphro-dilemma": "RELIGION_GENERIC",
  // Pascal
  "pascal-s-wager": "PASCAL",
  // Social contract generic
  "contemporary-approaches-to-the-social-contract": "SOCIAL_CONTRACT_GENERIC",
  "social-contract-theory": "SOCIAL_CONTRACT_GENERIC",
  // War
  war: "WAR",
  "just-war-theory-revisionists-vs-traditionalists": "WAR",
  // Justice statue
  justice: "JUSTICE_STATUE",
  "justice-what-s-the-right-thing-to-do-the-moral-side-of-murder": "JUSTICE_STATUE",
  // Personal identity
  "personal-identity": "PERSONAL_IDENTITY",
  "identity-over-time": "PERSONAL_IDENTITY",
  "christopher-shields-on-personal-identity": "PERSONAL_IDENTITY",
  // Free will
  "free-will": "FREE_WILL",
  "free-will-and-free-choice": "FREE_WILL",
  // Knowledge / epistemology
  "the-analysis-of-knowledge": "KNOWLEDGE_EPISTEMOLOGY",
  epistemology: "KNOWLEDGE_EPISTEMOLOGY",
  "theory-of-knowledge": "KNOWLEDGE_EPISTEMOLOGY",
  "introduction-to-philosophy-epistemology": "KNOWLEDGE_EPISTEMOLOGY",
  "the-gettier-problem-and-the-definition-of-knowledge": "KNOWLEDGE_EPISTEMOLOGY",
  "the-gettier-problem-no-longer-a-problem": "KNOWLEDGE_EPISTEMOLOGY",
  // Induction
  "the-problem-of-induction": "INDUCTION",
  // Mind / brain
  "the-chinese-room-argument": "MIND_BRAIN",
  dualism: "MIND_BRAIN",
  "qualia-the-knowledge-argument": "MIND_BRAIN",
  functionalism: "MIND_BRAIN",
  "the-mind-body-problem-what-are-minds": "MIND_BRAIN",
  "the-mind-body-problem-and-metaphysics": "MIND_BRAIN",
  "ned-block-on-consciousness": "MIND_BRAIN",
  // Logic - Carroll
  "symbolic-logic": "LOGIC_CARROLL",
  "symbolic-logic-a-free-online-course": "LOGIC_CARROLL",
  // Logic generic
  "validity-and-soundness": "LOGIC_GENERIC",
  "deductive-and-inductive-arguments": "LOGIC_GENERIC",
  "logic-i": "LOGIC_GENERIC",
  "introduction-to-philosophy-logic": "LOGIC_GENERIC",
  // Death
  death: "DEATH",
  // Metaphysics generic
  "experimental-metaphysics": "METAPHYSICS_GENERIC",
  // Aesthetics - Venus
  beauty: "AESTHETICS_VENUS",
  "aesthetic-experience": "AESTHETICS_VENUS",
  aesthetics: "AESTHETICS_VENUS",
  // Aesthetics - variety
  "studies-in-poetry-what-s-the-use-of-beauty": "AESTHETICS_VARIETY",
  "definitions-of-art-what-is-art": "AESTHETICS_VARIETY",
  "elisabeth-schellekens-dammann-on-disagreement-about-taste": "AESTHETICS_VARIETY",
  // Aesthetics - nature
  "aesthetics-and-nature": "AESTHETICS_NATURE",
};
