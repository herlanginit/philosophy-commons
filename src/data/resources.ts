export const TOPICS = [
  "Ethics",
  "Metaphysics",
  "Epistemology",
  "Logic",
  "Political Philosophy",
  "Philosophy of Mind",
  "Aesthetics",
  "Philosophy of Religion",
  "Existentialism",
  "Eastern Philosophy",
] as const;

export const RESOURCE_TYPES = [
  "Lesson Plan",
  "Primary Text",
  "Explainer",
  "Video",
  "Podcast",
  "Discussion Guide",
  "Activity",
] as const;

export const LEVELS = [
  "Intro / High School",
  "Undergraduate",
  "Graduate / Advanced",
] as const;

export const TRADITIONS = [
  "Ancient",
  "Medieval",
  "Modern",
  "Contemporary",
  "Analytic",
  "Continental",
  "Eastern",
] as const;

export type Topic = (typeof TOPICS)[number];
export type ResourceType = (typeof RESOURCE_TYPES)[number];
export type Level = (typeof LEVELS)[number];
export type Tradition = (typeof TRADITIONS)[number];

export interface Resource {
  slug: string;
  title: string;
  description: string;
  body: string[];
  type: ResourceType;
  topics: Topic[];
  level: Level;
  tradition: Tradition;
  dateAdded: string;
  popularity: number;
  estMinutes: number;
  author: string;
}

// Fallback data: used when RESOURCES_SHEET_CSV_URL isn't configured, or if the
// live sheet fetch fails. See src/lib/sheet.ts for the live-data path.
export const seedResources: Resource[] = [
  {
    slug: "trolley-problem-discussion-guide",
    title: "The Trolley Problem: A Discussion Guide",
    description:
      "A classroom-ready guide for running the trolley problem as a live debate, with escalating variations and guiding questions.",
    body: [
      "The trolley problem, first posed by Philippa Foot in 1967 and developed further by Judith Jarvis Thomson, asks whether it is permissible to divert a runaway trolley onto a track where it will kill one person in order to save five. It remains one of the most effective ways to introduce students to the tension between consequentialist and deontological reasoning, because almost everyone has a strong initial intuition — and almost everyone's intuition wavers once the variations start.",
      "This guide walks facilitators through four escalating scenarios: the standard switch case, the footbridge case (pushing a large man to stop the trolley), the loop track variant, and a transplant-surgeon analogue. For each, students vote before discussion, argue in pairs, then vote again — the shift in votes becomes the discussion's real subject matter.",
      "Guiding questions include: Does it matter whether harm is a means to an end or a side effect? Is there a morally relevant difference between killing and letting die? Can a single unified theory explain all four verdicts, or do our intuitions simply resist systematization? The guide closes with pointers to Foot's 'The Problem of Abortion and the Doctrine of Double Effect' and Thomson's 'The Trolley Problem' for advanced students who want the primary sources.",
    ],
    type: "Discussion Guide",
    topics: ["Ethics"],
    level: "Intro / High School",
    tradition: "Contemporary",
    dateAdded: "2026-05-12",
    popularity: 981,
    estMinutes: 45,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "aristotle-nicomachean-ethics-book-ii",
    title: "Aristotle, Nicomachean Ethics — Book II (Excerpt)",
    description:
      "An annotated excerpt on virtue as a mean between extremes, with marginal glosses for first-time readers of Aristotle.",
    body: [
      "In Book II of the Nicomachean Ethics, Aristotle argues that moral virtue is not innate but acquired through habituation: we become just by doing just acts, temperate by doing temperate acts, brave by doing brave acts. 'We are what we repeatedly do,' as the famous (if loosely translated) summary goes.",
      "This excerpt includes the full doctrine of the mean — the claim that virtues such as courage lie between two vices, one of excess (rashness) and one of deficiency (cowardice) — along with Aristotle's caution that the mean is relative to the individual, not a fixed arithmetic midpoint.",
      "Marginal glosses explain key Greek terms (arete, hexis, phronesis) and flag the passages most commonly quoted in secondary literature, making this suitable as a first primary-source reading in an undergraduate ethics sequence.",
    ],
    type: "Primary Text",
    topics: ["Ethics"],
    level: "Undergraduate",
    tradition: "Ancient",
    dateAdded: "2025-09-03",
    popularity: 742,
    estMinutes: 35,
    author: "Aristotle (trans. W. D. Ross, annotated)",
  },
  {
    slug: "utilitarianism-explained",
    title: "Utilitarianism, Explained",
    description:
      "A plain-language primer on Bentham's and Mill's utilitarianism, the greatest-happiness principle, and its most common objections.",
    body: [
      "Utilitarianism holds that the right action is the one that produces the greatest balance of happiness over suffering for everyone affected. Jeremy Bentham founded the view on a simple hedonic calculus; John Stuart Mill refined it by distinguishing higher and lower pleasures, arguing that a dissatisfied Socrates beats a satisfied fool.",
      "This explainer covers act versus rule utilitarianism, the 'utility monster' and 'experience machine' objections, and why utilitarianism keeps resurfacing in debates over public policy, animal welfare, and effective altruism.",
      "Written for readers with no prior philosophy background, with a two-minute summary at the top and a 'go deeper' reading list at the bottom.",
    ],
    type: "Explainer",
    topics: ["Ethics", "Political Philosophy"],
    level: "Intro / High School",
    tradition: "Modern",
    dateAdded: "2026-02-20",
    popularity: 1240,
    estMinutes: 8,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "kant-categorical-imperative-lesson-plan",
    title: "Kant's Categorical Imperative — Lesson Plan",
    description:
      "A 50-minute lesson introducing the categorical imperative through the universalizability and humanity formulations, with in-class exercises.",
    body: [
      "This lesson plan introduces Kant's deontological ethics by contrasting it directly with the utilitarian material students typically encounter first. It opens with the lying-promise example from the Groundwork: could you will, as a universal law, that everyone break promises when convenient?",
      "Students then work through the humanity formulation — 'act so that you treat humanity, whether in your own person or in that of another, always as an end and never merely as a means' — applying it to cases involving deception, exploitation, and consent.",
      "Includes a printable worksheet, discussion prompts for small groups, suggested pacing, and an extension exercise comparing Kantian and utilitarian verdicts on the same case study.",
    ],
    type: "Lesson Plan",
    topics: ["Ethics"],
    level: "Undergraduate",
    tradition: "Modern",
    dateAdded: "2025-11-14",
    popularity: 615,
    estMinutes: 50,
    author: "Dr. Amara Osei",
  },
  {
    slug: "ship-of-theseus-explained",
    title: "The Ship of Theseus, Explained",
    description:
      "What makes an object 'the same' object over time? A short explainer on identity and persistence using Plutarch's classic puzzle.",
    body: [
      "If every plank of a ship is gradually replaced, is it still the same ship? Plutarch's puzzle, recorded in his Life of Theseus, is the oldest and most durable thought experiment about identity over time — and it gets sharper once you imagine someone collecting the discarded planks and reassembling a second ship.",
      "This explainer lays out the standard responses (four-dimensionalism, mereological essentialism, identity as a matter of convention) without assuming any prior logic or metaphysics background, and connects the puzzle to modern applications: personal identity after gradual cell replacement, software after every line of code is rewritten, and organizations after every member has turned over.",
    ],
    type: "Explainer",
    topics: ["Metaphysics"],
    level: "Intro / High School",
    tradition: "Ancient",
    dateAdded: "2026-01-08",
    popularity: 1103,
    estMinutes: 7,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "free-will-determinism-lesson-plan",
    title: "Free Will vs. Determinism — Lesson Plan",
    description:
      "A structured lesson mapping the positions of hard determinism, libertarian free will, and compatibilism onto a single decision case.",
    body: [
      "This lesson uses a single running example — a student who cheats on an exam — to test three positions: hard determinism (no one is ever truly responsible), libertarian free will (some choices are genuinely undetermined), and compatibilism (freedom and determinism are not actually in conflict, once 'freedom' is properly defined).",
      "Students are asked, for each position, whether the student should be held responsible and why. The lesson deliberately delays revealing the philosophical labels until after students have staked out positions, so they discover they may already hold a compatibilist or libertarian view without knowing the term for it.",
      "Closes with a short reading from Harry Frankfurt on hierarchical desires as an entry point to more advanced compatibilist literature.",
    ],
    type: "Lesson Plan",
    topics: ["Metaphysics", "Ethics"],
    level: "Undergraduate",
    tradition: "Contemporary",
    dateAdded: "2025-08-22",
    popularity: 588,
    estMinutes: 55,
    author: "Dr. Amara Osei",
  },
  {
    slug: "descartes-meditation-i",
    title: "Descartes, Meditations on First Philosophy — Meditation I (Excerpt)",
    description:
      "The opening meditation, in which Descartes resolves to doubt everything that admits of the slightest doubt — annotated for first-time readers.",
    body: [
      "Meditation I sets up the method of radical doubt: Descartes systematically strips away everything he can't be absolutely certain of, starting with the unreliability of the senses, moving through the dreaming argument, and ending with the hypothesis of an evil demon bent on deceiving him about everything, including mathematics.",
      "The excerpt is lightly annotated to flag Descartes' rhetorical structure — he is not actually trying to convince you that you might be dreaming forever, but building a foundation so secure that Meditation II's cogito can stand on it.",
      "Pairs well with the 'Descartes' Evil Demon' discussion guide in this library for a two-session unit on skepticism.",
    ],
    type: "Primary Text",
    topics: ["Metaphysics", "Epistemology"],
    level: "Undergraduate",
    tradition: "Modern",
    dateAdded: "2025-10-30",
    popularity: 703,
    estMinutes: 25,
    author: "René Descartes (trans. John Cottingham, annotated)",
  },
  {
    slug: "personal-identity-podcast",
    title: "What Is Personal Identity? (Podcast)",
    description:
      "A 22-minute audio conversation on what makes you 'you' over time — memory theories, bodily continuity, and the teletransporter paradox.",
    body: [
      "This episode walks through the major theories of personal identity in plain conversational language: Locke's memory criterion, the objections raised by Thomas Reid's 'brave officer' case, physical/bodily continuity theories, and Derek Parfit's argument that identity might not be what actually matters to us.",
      "The back half of the episode works through the teletransporter thought experiment — if a machine destroys your body and creates an atom-for-atom duplicate elsewhere, did you survive, or did you die and get replaced? — as a way of stress-testing each theory.",
      "A full transcript is included below the audio player for accessibility and citation purposes.",
    ],
    type: "Podcast",
    topics: ["Metaphysics"],
    level: "Intro / High School",
    tradition: "Contemporary",
    dateAdded: "2026-04-02",
    popularity: 456,
    estMinutes: 22,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "gettier-problem-explained",
    title: "The Gettier Problem, Explained",
    description:
      "Why 'justified true belief' isn't enough for knowledge — Edmund Gettier's 1963 counterexamples and what came after them.",
    body: [
      "For centuries, knowledge was widely defined as justified true belief: you know something if you believe it, it's true, and you have good reason to believe it. In a three-page 1963 paper, Edmund Gettier showed this definition fails — you can have a justified true belief that is, intuitively, not knowledge, because it's true only by luck.",
      "This explainer walks through Gettier's original cases and several cleaner modern replacements (the 'stopped clock' and 'fake barn' cases), then surveys the main proposed fixes: adding a no-false-lemmas clause, requiring causal connection to the fact, and reliabilist and virtue-theoretic accounts of knowledge.",
      "Ends with a note on why the Gettier problem, despite sixty years of proposed solutions, is still considered open by many epistemologists.",
    ],
    type: "Explainer",
    topics: ["Epistemology"],
    level: "Undergraduate",
    tradition: "Analytic",
    dateAdded: "2026-03-11",
    popularity: 892,
    estMinutes: 9,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "descartes-evil-demon-discussion-guide",
    title: "Descartes' Evil Demon — Discussion Guide",
    description:
      "A facilitation guide for exploring radical skepticism with students who have just read Meditation I.",
    body: [
      "This guide is designed to run immediately after students read Descartes' first Meditation. It opens with a simple prompt: 'What, if anything, can you be completely certain of?' and lets students generate their own candidates before introducing the evil demon hypothesis formally.",
      "Discussion moves through modern descendants of the same worry — the brain-in-a-vat scenario and The Matrix — and asks whether radical skepticism is a genuine threat to everyday knowledge claims or a kind of philosophical dead end that tells us more about the limits of certainty than about what we actually know.",
      "Includes a facilitator's answer key with common student misconceptions (e.g., conflating 'I can't be 100% certain' with 'I don't know') and how to gently correct them.",
    ],
    type: "Discussion Guide",
    topics: ["Epistemology", "Metaphysics"],
    level: "Intro / High School",
    tradition: "Modern",
    dateAdded: "2025-07-19",
    popularity: 511,
    estMinutes: 40,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "hume-enquiry-induction",
    title: "Hume, An Enquiry Concerning Human Understanding — On Induction (Excerpt)",
    description:
      "The classic statement of the problem of induction: why does past experience give us any reason to expect the future will resemble it?",
    body: [
      "Hume argues that all reasoning about matters of fact beyond present observation or memory rests on the relation of cause and effect — and that our belief in cause and effect itself rests on custom and habit, not on any demonstrable rational principle. We have never observed a 'necessary connection' between cause and effect, only constant conjunction.",
      "This excerpt includes Hume's famous challenge: any attempt to justify induction by appealing to induction's past success is circular. The problem, largely unsolved, still structures contemporary debates in philosophy of science.",
      "Annotated with brief notes explaining Hume's terminology ('matters of fact' vs. 'relations of ideas') for students encountering empiricism for the first time.",
    ],
    type: "Primary Text",
    topics: ["Epistemology"],
    level: "Undergraduate",
    tradition: "Modern",
    dateAdded: "2025-06-05",
    popularity: 469,
    estMinutes: 30,
    author: "David Hume (annotated)",
  },
  {
    slug: "intro-epistemology-video",
    title: "Know Thyself: An Introduction to Epistemology (Video)",
    description:
      "A 14-minute animated introduction to the central questions of epistemology, from the Delphic maxim to modern theories of knowledge.",
    body: [
      "This video traces the question 'What can we know, and how?' from the Delphic inscription 'know thyself' through Socratic method, Cartesian doubt, and into 20th-century analytic epistemology, using simple animation and everyday examples rather than jargon.",
      "Designed as a first exposure to the field for students with no prior philosophy coursework — a companion reading list with age-appropriate follow-ups is provided beneath the video.",
    ],
    type: "Video",
    topics: ["Epistemology"],
    level: "Intro / High School",
    tradition: "Ancient",
    dateAdded: "2025-12-01",
    popularity: 674,
    estMinutes: 14,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "valid-arguments-lesson-plan",
    title: "Introduction to Valid Arguments — Lesson Plan",
    description:
      "A foundational logic lesson distinguishing validity from truth, with practice identifying valid and invalid argument forms.",
    body: [
      "This lesson teaches the crucial distinction between an argument's validity (does the conclusion follow from the premises?) and the truth of its premises — using deliberately silly examples ('all cats are made of cheese; the moon is a cat; therefore the moon is made of cheese') to show that an argument can be valid while being unsound.",
      "Students practice identifying modus ponens, modus tollens, and two common fallacies that mimic them (affirming the consequent, denying the antecedent) through a matching worksheet.",
      "Ends with a short bridge to informal fallacies, previewing the companion 'Common Logical Fallacies' activity in this library.",
    ],
    type: "Lesson Plan",
    topics: ["Logic"],
    level: "Intro / High School",
    tradition: "Analytic",
    dateAdded: "2026-06-01",
    popularity: 530,
    estMinutes: 45,
    author: "Dr. Priya Nair",
  },
  {
    slug: "common-logical-fallacies-activity",
    title: "Common Logical Fallacies — Classroom Activity",
    description:
      "A card-sorting activity where students identify strawman, ad hominem, false dilemma, and six other fallacies in real-world excerpts.",
    body: [
      "Students receive a deck of twenty short argument excerpts, drawn from op-eds, advertisements, and everyday arguments, and sort them into nine fallacy categories: ad hominem, strawman, false dilemma, appeal to authority, slippery slope, hasty generalization, red herring, circular reasoning, and equivocation.",
      "Printable card set, answer key, and a follow-up writing prompt asking students to construct one real (non-fallacious) argument and one fallacious argument on the same topic are included.",
    ],
    type: "Activity",
    topics: ["Logic"],
    level: "Intro / High School",
    tradition: "Contemporary",
    dateAdded: "2026-01-25",
    popularity: 812,
    estMinutes: 35,
    author: "Dr. Priya Nair",
  },
  {
    slug: "aristotle-syllogism-explainer",
    title: "Aristotle's Syllogism, Explained",
    description:
      "How Aristotle formalized deductive reasoning into three-line syllogisms — and why his system dominated logic for two thousand years.",
    body: [
      "In the Prior Analytics, Aristotle developed the syllogism: a three-statement argument form (two premises and a conclusion) built from categorical statements like 'all A are B.' The classic example — all men are mortal; Socrates is a man; therefore Socrates is mortal — is a syllogism in the form known as Barbara.",
      "This explainer covers the four figures of the syllogism, the concept of a 'middle term,' and why Aristotelian logic, despite being superseded in expressive power by modern predicate logic, remains the historical foundation the entire discipline was built on.",
    ],
    type: "Explainer",
    topics: ["Logic"],
    level: "Undergraduate",
    tradition: "Ancient",
    dateAdded: "2025-05-14",
    popularity: 398,
    estMinutes: 10,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "locke-second-treatise-excerpt",
    title: "Locke, Second Treatise of Government (Excerpt)",
    description:
      "Locke's argument for natural rights, government by consent, and the right of revolution — foundational reading for political philosophy.",
    body: [
      "This excerpt covers Locke's state-of-nature argument, his account of property acquired through labor, and his claim that legitimate government rests on the consent of the governed — and can be justly overthrown when it violates the trust placed in it.",
      "Annotated to highlight the passages that most directly influenced the American Declaration of Independence, making it useful both as a philosophy text and as a companion reading in history and civics courses.",
    ],
    type: "Primary Text",
    topics: ["Political Philosophy"],
    level: "Undergraduate",
    tradition: "Modern",
    dateAdded: "2025-09-28",
    popularity: 560,
    estMinutes: 28,
    author: "John Locke (annotated)",
  },
  {
    slug: "social-contract-explained",
    title: "The Social Contract, Explained",
    description:
      "From Hobbes' Leviathan to Rousseau's general will — a survey of social contract theory and why we obey (or don't obey) the state.",
    body: [
      "Social contract theory asks: what could justify the state's authority over free individuals? This explainer compares three classic answers — Hobbes' argument that any authority beats the violent state of nature, Locke's consent-based and rights-limited government, and Rousseau's 'general will' — before turning to Rawls' 20th-century revival of the tradition.",
      "Written to give students a map of the terrain before they read any of the primary sources directly, with a comparison table summarizing each thinker's state of nature, their view of human nature, and the kind of government their argument justifies.",
    ],
    type: "Explainer",
    topics: ["Political Philosophy"],
    level: "Intro / High School",
    tradition: "Modern",
    dateAdded: "2026-02-08",
    popularity: 967,
    estMinutes: 11,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "rawls-veil-of-ignorance-activity",
    title: "Rawls' Veil of Ignorance — Classroom Activity",
    description:
      "Students design a hypothetical society's rules without knowing what position in that society they'll occupy.",
    body: [
      "In small groups, students draft a short constitution — covering taxation, healthcare, education, and criminal justice — under Rawls' 'veil of ignorance': they don't know whether they'll be born rich or poor, healthy or disabled, in the majority or a minority.",
      "The activity concludes with each group presenting their rules and comparing how the constraint of not knowing one's own position shaped their choices, directly testing Rawls' claim that this procedure tends to produce more equitable principles than unconstrained bargaining.",
      "Includes facilitator notes connecting the exercise back to Rawls' two principles of justice from A Theory of Justice.",
    ],
    type: "Activity",
    topics: ["Political Philosophy", "Ethics"],
    level: "Undergraduate",
    tradition: "Contemporary",
    dateAdded: "2025-11-30",
    popularity: 623,
    estMinutes: 50,
    author: "Dr. Amara Osei",
  },
  {
    slug: "just-war-theory-discussion-guide",
    title: "Just War Theory — Discussion Guide",
    description:
      "A graduate-level discussion guide on jus ad bellum and jus in bello, using contemporary case studies to test the traditional criteria.",
    body: [
      "This guide presents the classical criteria for a just war — just cause, legitimate authority, right intention, proportionality, last resort, and probability of success (jus ad bellum), alongside discrimination and proportionality in conduct (jus in bello) — and pairs each criterion with a contested contemporary case for structured debate.",
      "Designed for advanced seminars, the guide assumes familiarity with basic normative ethics and asks students to weigh consequentialist and deontological objections to the just war tradition, including revisionist critiques from contemporary just war theorists who reject the traditional framework's sharp civilian/combatant distinction.",
    ],
    type: "Discussion Guide",
    topics: ["Political Philosophy", "Ethics"],
    level: "Graduate / Advanced",
    tradition: "Contemporary",
    dateAdded: "2025-04-17",
    popularity: 287,
    estMinutes: 60,
    author: "Dr. Marcus Feldman",
  },
  {
    slug: "chinese-room-explained",
    title: "The Chinese Room Argument, Explained",
    description:
      "John Searle's famous thought experiment against strong AI — can symbol manipulation alone ever amount to genuine understanding?",
    body: [
      "Imagine a person who doesn't speak Chinese, locked in a room with a rulebook for manipulating Chinese symbols in response to other Chinese symbols passed in from outside. Follow the rules well enough, and the room produces convincing conversational replies — without anyone inside ever understanding a word of Chinese. Searle argues this shows that running the right program is not sufficient for genuine understanding, no matter how convincingly it behaves.",
      "This explainer covers the argument's structure, the most influential objections (the systems reply, the robot reply, the brain simulator reply), and why the thought experiment remains central to debates about large language models and machine understanding today.",
    ],
    type: "Explainer",
    topics: ["Philosophy of Mind"],
    level: "Undergraduate",
    tradition: "Analytic",
    dateAdded: "2026-05-29",
    popularity: 1358,
    estMinutes: 9,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "could-a-machine-think-lesson-plan",
    title: "Could a Machine Think? — Lesson Plan",
    description:
      "A lesson connecting the Turing Test, the Chinese Room, and modern AI chatbots to core questions in philosophy of mind.",
    body: [
      "This lesson opens with a live (or simulated) Turing-Test-style exercise: students exchange messages with an unidentified conversation partner and guess whether it's human, then discuss what, if anything, passing the test would prove.",
      "The lesson then introduces Searle's Chinese Room as a challenge to behaviorist criteria for thought, and closes by asking students to apply both frameworks to a specific, current AI system, defending a position on whether it understands anything at all.",
      "Includes discussion rubric and suggested time allocations for a 75-minute class.",
    ],
    type: "Lesson Plan",
    topics: ["Philosophy of Mind"],
    level: "Undergraduate",
    tradition: "Contemporary",
    dateAdded: "2026-06-18",
    popularity: 940,
    estMinutes: 75,
    author: "Dr. Marcus Feldman",
  },
  {
    slug: "marys-room-video",
    title: "Mary's Room: The Knowledge Argument (Video)",
    description:
      "A short animated video on Frank Jackson's thought experiment about a color scientist who has never seen color.",
    body: [
      "Mary is a brilliant scientist who has learned every physical fact there is to know about color vision, but has lived her entire life in a black-and-white room. When she finally steps outside and sees red for the first time, does she learn something new?",
      "This video presents Jackson's knowledge argument against physicalism, the standard physicalist replies (the ability hypothesis, the acquaintance hypothesis), and leaves students with the open question the thought experiment was designed to raise: can any amount of physical knowledge capture what an experience is like?",
    ],
    type: "Video",
    topics: ["Philosophy of Mind"],
    level: "Intro / High School",
    tradition: "Contemporary",
    dateAdded: "2025-10-09",
    popularity: 705,
    estMinutes: 10,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "what-makes-art-good-discussion-guide",
    title: "What Makes Art 'Good'? — Discussion Guide",
    description:
      "An accessible entry point into aesthetics: is beauty objective, subjective, or something in between?",
    body: [
      "This guide opens with a simple provocation — students are shown two very different artworks and asked to defend which is 'better,' then asked what they even mean by that. From there, the discussion moves through subjectivist ('beauty is in the eye of the beholder'), objectivist (there are real standards of aesthetic value), and intersubjectivist positions (Hume's 'true judges' and Kant's account of aesthetic judgment as claiming universal but non-conceptual assent).",
      "Designed to be accessible with no prior philosophy background, using visual art, music, and film examples students already have opinions about.",
    ],
    type: "Discussion Guide",
    topics: ["Aesthetics"],
    level: "Intro / High School",
    tradition: "Contemporary",
    dateAdded: "2025-08-03",
    popularity: 421,
    estMinutes: 40,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "kant-critique-of-judgment-excerpt",
    title: "Kant, Critique of Judgment — On the Beautiful (Excerpt)",
    description:
      "Kant's account of aesthetic judgment as 'disinterested pleasure' claiming universal validity without relying on a concept.",
    body: [
      "This excerpt presents Kant's core claims about judgments of beauty: that they are disinterested (not tied to desire or use), that they nonetheless claim universal agreement, and that this universality cannot rest on a determinate concept the way a judgment like 'this is red' does.",
      "Dense and technical, this reading is intended for graduate seminars already familiar with the broader architecture of Kant's critical philosophy; a glossary of Kantian terminology is provided as an appendix.",
    ],
    type: "Primary Text",
    topics: ["Aesthetics"],
    level: "Graduate / Advanced",
    tradition: "Modern",
    dateAdded: "2025-03-22",
    popularity: 198,
    estMinutes: 45,
    author: "Immanuel Kant (trans. Werner Pluhar, annotated)",
  },
  {
    slug: "problem-of-evil-explained",
    title: "The Problem of Evil, Explained",
    description:
      "If God is all-powerful, all-knowing, and all-good, why does suffering exist? The logical and evidential versions of the problem, explained.",
    body: [
      "The problem of evil is among the oldest arguments in philosophy of religion, traceable to Epicurus: if God is willing to prevent evil but not able, He is not omnipotent; if able but not willing, He is malevolent; if both able and willing, why does evil exist?",
      "This explainer distinguishes the logical problem of evil (evil is logically incompatible with God's existence) from the evidential problem (the amount and distribution of evil in the world is strong evidence against God's existence, even if not strictly incompatible), and surveys the major theodicies offered in response: the free will defense, soul-making theodicy, and skeptical theism.",
    ],
    type: "Explainer",
    topics: ["Philosophy of Religion"],
    level: "Intro / High School",
    tradition: "Ancient",
    dateAdded: "2026-03-30",
    popularity: 1089,
    estMinutes: 9,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "pascals-wager-lesson-plan",
    title: "Pascal's Wager — Lesson Plan",
    description:
      "A decision-theory approach to belief in God: what happens when you can't settle a question with evidence alone?",
    body: [
      "Blaise Pascal argued that, given the impossibility of proving or disproving God's existence through reason alone, belief is the rational wager: the potential infinite gain of belief (if God exists) vastly outweighs the finite cost, while the potential loss of disbelief (if God exists) is infinite.",
      "This lesson introduces basic decision-theory concepts (expected value, dominant strategies) before presenting the wager as a formal argument, then works through the classic objections: the 'many gods' problem, whether belief can be willed into existence at all, and whether a wager is the right basis for genuine faith.",
      "Includes a payoff-matrix worksheet appropriate for students who have also studied basic probability.",
    ],
    type: "Lesson Plan",
    topics: ["Philosophy of Religion"],
    level: "Undergraduate",
    tradition: "Modern",
    dateAdded: "2025-06-27",
    popularity: 512,
    estMinutes: 50,
    author: "Dr. Priya Nair",
  },
  {
    slug: "sartre-existence-precedes-essence",
    title: "Sartre's 'Existence Precedes Essence,' Explained",
    description:
      "Sartre's central existentialist claim: humans have no fixed nature or purpose handed to them — we create ourselves through choice.",
    body: [
      "In 'Existentialism Is a Humanism,' Sartre argues that for human beings, unlike a paper-knife designed for a purpose, existence precedes essence: we exist first, with no predetermined nature, and only through our choices and actions do we define what we are.",
      "This explainer unpacks the claim's consequences — radical freedom, the anxiety ('anguish') of total responsibility for one's choices, and Sartre's concept of 'bad faith,' the denial of one's own freedom by pretending one's choices are fixed by circumstance, role, or nature.",
      "Connects the concept to Sartre's famous case of the student torn between joining the resistance and caring for his mother, used throughout the primary text to show that no ethical system can make the choice for you.",
    ],
    type: "Explainer",
    topics: ["Existentialism"],
    level: "Undergraduate",
    tradition: "Continental",
    dateAdded: "2025-12-19",
    popularity: 834,
    estMinutes: 10,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "camus-absurd-discussion-guide",
    title: "Camus and the Absurd — Discussion Guide",
    description:
      "Exploring Camus' claim that life is 'absurd' — and why he thinks the right response is neither suicide nor blind hope, but revolt.",
    body: [
      "This guide introduces Camus' concept of the absurd as the collision between the human demand for meaning and the universe's persistent silence, drawing on 'The Myth of Sisyphus.' Students discuss why Camus rejects both suicide (physical) and religious or philosophical leaps of faith (what he calls 'philosophical suicide') as adequate responses.",
      "The discussion builds to Camus' own answer: revolt — living fully and defiantly within the absurd condition without resolving it, exemplified by Sisyphus, condemned to eternally roll a boulder up a hill, whom Camus asks us to imagine happy.",
      "Includes prompts connecting the absurd to modern experiences of meaninglessness and burnout, which students often find surprisingly immediate.",
    ],
    type: "Discussion Guide",
    topics: ["Existentialism"],
    level: "Undergraduate",
    tradition: "Continental",
    dateAdded: "2026-04-25",
    popularity: 776,
    estMinutes: 45,
    author: "Dr. Marcus Feldman",
  },
  {
    slug: "kierkegaard-leap-of-faith-podcast",
    title: "Kierkegaard's Leap of Faith (Podcast)",
    description:
      "A graduate-level audio discussion of Kierkegaard's Fear and Trembling and the 'teleological suspension of the ethical.'",
    body: [
      "This episode examines Kierkegaard's reading of Abraham's binding of Isaac as the paradigm case of faith: a moment in which the individual's duty to God suspends the universal ethical duty not to kill, placing Abraham beyond the reach of rational or ethical justification — a 'knight of faith' rather than a 'knight of infinite resignation.'",
      "The conversation situates the leap of faith within Kierkegaard's broader critique of Hegelian systematic philosophy and its attempt to rationally absorb the individual into the universal, and considers objections from both secular and religious readers.",
      "Assumes prior familiarity with Kierkegaard's pseudonymous authorship; a short glossary of his key terms is linked in the show notes.",
    ],
    type: "Podcast",
    topics: ["Existentialism", "Philosophy of Religion"],
    level: "Graduate / Advanced",
    tradition: "Continental",
    dateAdded: "2025-02-14",
    popularity: 213,
    estMinutes: 38,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "tao-te-ching-intro",
    title: "Introduction to the Tao Te Ching",
    description:
      "Selected verses from Laozi's foundational Daoist text, with commentary on wu wei, the Dao, and the value of softness over force.",
    body: [
      "This reading selects ten verses from the Tao Te Ching, including the opening lines on the Dao that cannot be named, and passages on wu wei (effortless action, or non-forcing), the strength found in yielding (water wearing down stone), and the Daoist suspicion of rigid moral codes and government overreach.",
      "Commentary is written for students with no background in Chinese philosophy, drawing light comparisons to Western concepts (the Dao is not 'God,' wu wei is not passivity) to prevent common misreadings, while resisting the temptation to flatten Daoist thought into a Western framework.",
    ],
    type: "Primary Text",
    topics: ["Eastern Philosophy"],
    level: "Intro / High School",
    tradition: "Eastern",
    dateAdded: "2025-07-07",
    popularity: 647,
    estMinutes: 25,
    author: "Laozi (trans. and annotated)",
  },
  {
    slug: "four-noble-truths-explained",
    title: "The Four Noble Truths, Explained",
    description:
      "The foundational teaching of Buddhist philosophy: the nature of suffering, its cause, its cessation, and the path to that cessation.",
    body: [
      "This explainer presents the Buddha's Four Noble Truths — the truth of dukkha (suffering or unsatisfactoriness), its origin in craving (tanha), the possibility of its cessation (nirvana), and the Eightfold Path leading there — as a philosophical diagnosis and prescription rather than a purely religious doctrine.",
      "Written to be accessible to students with no background in Buddhist thought, and to distinguish the philosophical core of the teaching from culturally specific ritual practice, while noting that this separation is itself a simplification worth complicating in more advanced study.",
    ],
    type: "Explainer",
    topics: ["Eastern Philosophy"],
    level: "Intro / High School",
    tradition: "Eastern",
    dateAdded: "2026-01-16",
    popularity: 1021,
    estMinutes: 9,
    author: "Philosophy Commons Editorial Team",
  },
  {
    slug: "confucian-ethics-lesson-plan",
    title: "Confucian Ethics — Lesson Plan",
    description:
      "An introduction to ren (humaneness), li (ritual propriety), and the Confucian vision of ethical cultivation through relationships and roles.",
    body: [
      "This lesson introduces Confucian ethics as a relational and role-based alternative to the individualist frameworks students typically meet first in a Western-centered curriculum. Central concepts covered include ren (humaneness or benevolence), li (ritual propriety, understood broadly as the practices that structure respectful social life), and junzi (the exemplary or 'noble' person as an aspirational ideal).",
      "Students compare the Confucian claim that ethical character is cultivated through practiced roles and relationships (parent, child, ruler, friend) against the more rule- or outcome-focused frameworks of Kantian and utilitarian ethics covered earlier in the course.",
      "Includes a case-study worksheet applying the 'five relationships' to a modern workplace or school scenario.",
    ],
    type: "Lesson Plan",
    topics: ["Eastern Philosophy", "Ethics"],
    level: "Undergraduate",
    tradition: "Eastern",
    dateAdded: "2025-05-30",
    popularity: 389,
    estMinutes: 50,
    author: "Dr. Priya Nair",
  },
];

export function getResourceBySlug(list: Resource[], slug: string): Resource | undefined {
  return list.find((r) => r.slug === slug);
}

export function getRelatedResources(
  list: Resource[],
  resource: Resource,
  limit = 3
): Resource[] {
  return list
    .filter((r) => r.slug !== resource.slug)
    .map((r) => ({
      resource: r,
      score: r.topics.filter((t) => resource.topics.includes(t)).length,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.resource);
}
