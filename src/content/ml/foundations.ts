import type { Track, GuidedProblem } from "@/content/types";
import { toolkitModule, toolkitGuided } from "./toolkit";
import { preprocessingModule, preprocessingGuided } from "./preprocessing";

export const mlFoundationsTrack: Track = {
  id: "ml-foundations",
  title: "ML Foundations & Data Toolkit",
  modules: [
    {
      id: "ml-fundamentals",
      title: "Machine learning fundamentals",
      lessons: [
        {
          id: "ml-ai-ml-dl",
          title: "AI vs Machine Learning vs Deep Learning",
          summary: "Three terms people mix up, and how they nest.",
          blocks: [
            { kind: "prose", text: "People throw around AI, machine learning, and deep learning as if they mean the same thing. They do not. They are nested circles, each one sitting inside the last." },
            { kind: "heading", text: "The nesting" },
            { kind: "prose", text: "Artificial intelligence is the broad goal: machines doing things that normally need human intelligence. Machine learning is one way to get there: instead of hand-writing rules, you let a system learn patterns from data. Deep learning is a kind of machine learning that uses neural networks with many layers." },
            { kind: "code", lang: "text", code: "Artificial Intelligence    any \"smart\" behaviour\n  +-- Machine Learning      learns patterns from data\n        +-- Deep Learning   neural networks, many layers" },
            { kind: "heading", text: "Rules vs learning" },
            { kind: "prose", text: "Traditional programming: you write the rules and the computer follows them. Machine learning flips that around. You show the computer examples (data plus the right answers) and it works out the rule by itself." },
            { kind: "code", lang: "python", code: '# Traditional: you write the rule by hand\ndef is_spam(email):\n    return "free money" in email.lower()\n\n# Machine learning: show examples, let it learn the rule\n# model.fit(emails, labels)    # labels: spam or not spam\n# model.predict(new_email)     # the learned rule decides' },
            { kind: "heading", text: "When ML is the right tool" },
            { kind: "prose", text: "Reach for ML when the rules are too complex or unknown to write by hand (recognising faces, understanding language) and you have data to learn from. If a plain rule or formula already solves the problem, just use that. ML is not always the answer." },
            { kind: "callout", tone: "note", text: "Deep learning shines on unstructured data (images, audio, text) when you have lots of data and compute. On smaller tabular datasets, classical ML often matches or beats it with far less fuss." },
            { kind: "keypoints", points: ["AI contains ML contains DL: each sits inside the previous", "Traditional code follows rules you write; ML learns rules from data", "Use ML when rules are unknown or complex and data is available", "Deep learning is ML with many-layered neural networks", "DL favours unstructured data; classical ML favours tabular data"] },
            { kind: "practice", text: "Check your understanding:", items: ["In one sentence each, define AI, ML, and deep learning.", "Give an everyday task where a simple rule beats ML.", "Give a task where ML clearly beats hand-written rules.", "Why is deep learning usually overkill for a 200-row spreadsheet?"] },
          ],
        },
        {
          id: "ml-types",
          title: "Types of machine learning",
          summary: "Supervised, unsupervised, and reinforcement learning.",
          blocks: [
            { kind: "prose", text: "Machine learning splits into three families, distinguished by what kind of feedback the model learns from." },
            { kind: "heading", text: "Supervised learning" },
            { kind: "prose", text: "You train on labelled data: inputs paired with the correct answers. The model learns to map input to output, then predicts answers for new, unseen inputs. Spam detection and price prediction are supervised." },
            { kind: "heading", text: "Unsupervised learning" },
            { kind: "prose", text: "There are no labels. The model finds structure on its own, such as natural groupings or unusual points. Customer segmentation and anomaly detection are unsupervised." },
            { kind: "heading", text: "Reinforcement learning" },
            { kind: "prose", text: "An agent takes actions in an environment and receives rewards or penalties. Over many tries it learns a strategy that maximises reward. Game-playing AIs and robotics use this." },
            { kind: "code", lang: "text", code: "Supervised      labelled data       predict a known answer\nUnsupervised    no labels           discover hidden structure\nReinforcement   actions + rewards   learn by trial and error" },
            { kind: "callout", tone: "tip", text: "Most practical ML you do early on is supervised, because labelled data is the most common and the results are the easiest to measure." },
            { kind: "keypoints", points: ["Supervised: labelled data, predict a known answer", "Unsupervised: no labels, find structure", "Reinforcement: actions and rewards, learn a strategy", "The type depends on the feedback the model gets", "Supervised learning is the most common starting point"] },
            { kind: "practice", text: "Classify the learning type:", items: ["Predicting tomorrow's temperature from weather history.", "Grouping shoppers into segments with no predefined groups.", "A program learning to play chess by winning and losing games.", "Flagging which credit-card transactions look fraudulent, given past labelled fraud."] },
          ],
        },
        {
          id: "ml-supervised",
          title: "Supervised learning: regression & classification",
          summary: "The two jobs of supervised models.",
          blocks: [
            { kind: "prose", text: "Supervised learning splits in two, based on what you are predicting: a number, or a category." },
            { kind: "heading", text: "Regression: predict a number" },
            { kind: "prose", text: "The output is a continuous value. Predicting a house price, a temperature, or someone's salary are regression problems." },
            { kind: "heading", text: "Classification: predict a category" },
            { kind: "prose", text: "The output is a discrete label. Spam or not spam, which digit 0 to 9, healthy or diseased: these are classification problems." },
            { kind: "heading", text: "The shape of the data" },
            { kind: "prose", text: "Supervised learning needs features (the inputs, usually called `X`) and labels (the answers, usually called `y`). You fit the model on training data, then predict labels for new data it has never seen." },
            { kind: "code", lang: "python", code: "# X = features (each row is one example), y = the answer for each row\n# model.fit(X_train, y_train)     # learn from examples\n# preds = model.predict(X_test)   # predict on unseen data" },
            { kind: "callout", tone: "note", text: "Many algorithm families have both a regressor and a classifier. Linear regression predicts numbers; logistic regression, despite the name, predicts categories." },
            { kind: "keypoints", points: ["Regression predicts a continuous number", "Classification predicts a discrete category", "Features `X` are inputs; labels `y` are the answers", "Fit on training data, then predict on unseen data", "Pick regression vs classification by the output type"] },
            { kind: "practice", text: "Regression or classification?", items: ["Estimating how many sales a store makes next month.", "Deciding whether an email is spam.", "Predicting a patient's blood pressure.", "Recognising the breed of a dog in a photo."] },
          ],
        },
        {
          id: "ml-unsupervised",
          title: "Unsupervised learning: clustering & association",
          summary: "Finding structure when there are no labels.",
          blocks: [
            { kind: "prose", text: "When data has no answer key, unsupervised learning looks for patterns on its own. Two everyday jobs are clustering and association." },
            { kind: "heading", text: "Clustering: group similar things" },
            { kind: "prose", text: "Clustering puts similar items into groups. k-means is the classic algorithm: it splits data into k clusters by similarity. Splitting customers into segments by behaviour is clustering." },
            { kind: "heading", text: "Association: find rules" },
            { kind: "prose", text: "Association mining finds relationships like \"people who buy X also tend to buy Y\". This is the engine behind market-basket analysis and basic recommendation." },
            { kind: "heading", text: "Why it is harder to judge" },
            { kind: "prose", text: "With no labels there is no obvious right or wrong answer, so you judge unsupervised results by whether the groupings or rules are actually useful and interpretable." },
            { kind: "code", lang: "text", code: "Clustering     group similar items        e.g. customer segments\nAssociation    find co-occurrence rules    e.g. bought X -> bought Y" },
            { kind: "keypoints", points: ["Unsupervised learning has no labels", "Clustering groups similar items (e.g. k-means)", "Association finds co-occurrence rules", "There is no single correct answer to check against", "Judge results by usefulness and interpretability"] },
            { kind: "practice", text: "Clustering or association?", items: ["Splitting website visitors into behavioural groups.", "Discovering that nappies and beer are often bought together.", "Grouping news articles by topic without predefined topics.", "Why is evaluating these harder than evaluating a classifier?"] },
          ],
        },
        {
          id: "ml-dl-intro",
          title: "What is deep learning?",
          summary: "Neural networks and where they fit.",
          blocks: [
            { kind: "prose", text: "Deep learning is the branch of machine learning behind most of the AI you hear about: image recognition, voice assistants, and large language models. Here is where it fits; the Deep Learning phase covers the how." },
            { kind: "heading", text: "Neural networks, briefly" },
            { kind: "prose", text: "A neural network is built from layers of simple units. Each layer transforms the data a little and passes it on. Stack many layers and it is \"deep\". The big win: the network learns useful features by itself, instead of you hand-crafting them." },
            { kind: "heading", text: "What it is great at" },
            { kind: "prose", text: "Deep learning dominates on unstructured data: images (convolutional networks), and sequences and language (recurrent networks and transformers, which power LLMs)." },
            { kind: "heading", text: "The cost" },
            { kind: "prose", text: "It is hungry for data and compute, and the trained model is hard to interpret. On a small, tidy table of numbers, a classical model is usually faster, cheaper, and just as good." },
            { kind: "callout", tone: "note", text: "You will build neural networks for real in the Deep Learning phase. For now, just know what deep learning is and when it is worth reaching for." },
            { kind: "keypoints", points: ["Deep learning is ML using many-layered neural networks", "Networks learn features automatically from raw data", "Great for images, audio, and language", "Needs lots of data and compute, and is hard to interpret", "Classical ML often wins on small tabular data"] },
            { kind: "practice", text: "Reason about fit:", items: ["Why does deep learning suit images better than a classical model?", "Name two AI products that are powered by deep learning.", "Why might a bank prefer a simpler model for loan decisions?", "What two resources does deep learning demand a lot of?"] },
          ],
        },
      ],
    },
  ],
};

export const mlFoundationsGuided: GuidedProblem[] = [
  {
    id: "ml-ai-ml-dl-g1",
    lessonId: "ml-ai-ml-dl",
    title: "Rule, classical ML, or deep learning?",
    prompt: "For each task, decide whether a simple rule, classical machine learning, or deep learning fits best: (a) convert Celsius to Fahrenheit, (b) predict a house price from its features, (c) recognise cats in photos.",
    hints: [
      "If an exact formula exists, you do not need ML at all.",
      "Tabular features with known answers suit classical ML; raw images suit deep learning.",
    ],
    solution: [
      { kind: "prose", text: "(a) A simple rule. The formula `F = C * 9/5 + 32` is exact, so no ML is needed." },
      { kind: "prose", text: "(b) Classical ML. House price from tabular features (size, rooms, location) is a regression problem a model like linear regression handles well." },
      { kind: "prose", text: "(c) Deep learning. Recognising cats in raw pixels is unstructured data where a convolutional neural network excels." },
    ],
  },
  {
    id: "ml-types-g1",
    lessonId: "ml-types",
    title: "Name the learning type",
    prompt: "Label each as supervised, unsupervised, or reinforcement learning: (a) predicting house prices from labelled sales, (b) grouping customers with no predefined groups, (c) a bot learning a game by winning and losing.",
    hints: [
      "Labelled answers means supervised.",
      "No labels, just structure, means unsupervised. Actions plus rewards means reinforcement.",
    ],
    solution: [
      { kind: "prose", text: "(a) Supervised: it learns from labelled examples (sales with known prices)." },
      { kind: "prose", text: "(b) Unsupervised: there are no labels, only structure to discover (clustering)." },
      { kind: "prose", text: "(c) Reinforcement: the bot learns from rewards and penalties through trial and error." },
    ],
  },
  {
    id: "ml-supervised-g1",
    lessonId: "ml-supervised",
    title: "Regression or classification?",
    prompt: "For each, say whether it is regression or classification: (a) predict next month's revenue, (b) decide if a transaction is fraud, (c) predict a house's price, (d) identify the digit in an image.",
    hints: [
      "A continuous number means regression.",
      "A discrete category or label means classification.",
    ],
    solution: [
      { kind: "prose", text: "(a) Regression (a number). (b) Classification (fraud / not). (c) Regression (a price). (d) Classification (one of ten digit labels)." },
      { kind: "prose", text: "The deciding question is always: am I predicting a number, or a category?" },
    ],
  },
  {
    id: "ml-unsupervised-g1",
    lessonId: "ml-unsupervised",
    title: "Clustering or association?",
    prompt: "Label each: (a) splitting shoppers into behavioural segments, (b) finding that nappies and beer sell together, (c) grouping articles by topic with no preset topics. Then say why these are harder to evaluate than a classifier.",
    hints: [
      "Grouping similar items is clustering.",
      "Finding 'bought X then bought Y' rules is association.",
    ],
    solution: [
      { kind: "prose", text: "(a) Clustering. (b) Association. (c) Clustering." },
      { kind: "prose", text: "They are harder to evaluate because there are no labels, so there is no ground-truth answer to score against. You judge them by whether the groups or rules are genuinely useful and interpretable." },
    ],
  },
  {
    id: "ml-dl-intro-g1",
    lessonId: "ml-dl-intro",
    title: "When to reach for deep learning",
    prompt: "Explain why deep learning suits recognising objects in photos, but a classical model is often the better choice for predicting loan defaults from a small table of applicant data.",
    hints: [
      "Think about structured vs unstructured data, and data volume.",
      "Think about interpretability and cost.",
    ],
    solution: [
      { kind: "prose", text: "Photos are unstructured, high-dimensional data where deep networks learn the right features automatically, and there is usually plenty of image data to train on." },
      { kind: "prose", text: "Loan data is a small, structured table. A classical model trains fast, needs little data, and is far easier to interpret and justify, which matters for regulated decisions like lending." },
    ],
  },
  ...toolkitGuided,
  ...preprocessingGuided,
];