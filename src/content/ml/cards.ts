import type { Flashcard, PredictOutput } from "@/content/types";

/** Flashcards for every lesson in tracks P5-P10. */
export const mlFlashcards: Flashcard[] = [
  // ============ P5 · Module 1: ML fundamentals ============
  { id: "ml-ai-ml-dl-fc-1", lessonId: "ml-ai-ml-dl", front: "How do AI, ML, and DL relate?", back: "Nested circles: DL is a subset of ML, which is a subset of AI." },
  { id: "ml-ai-ml-dl-fc-2", lessonId: "ml-ai-ml-dl", front: "Traditional programming vs machine learning?", back: "Traditional: you write the rules. ML: you show examples and the system learns the rules." },
  { id: "ml-ai-ml-dl-fc-3", lessonId: "ml-ai-ml-dl", front: "When is deep learning usually overkill?", back: "Small tabular datasets — classical ML typically matches or beats it with less data, compute, and risk." },

  { id: "ml-types-fc-1", lessonId: "ml-types", front: "Three families of machine learning?", back: "Supervised (labelled data), unsupervised (no labels), reinforcement (actions + rewards)." },
  { id: "ml-types-fc-2", lessonId: "ml-types", front: "What kind of feedback does reinforcement learning use?", back: "Rewards and penalties for actions taken in an environment." },
  { id: "ml-types-fc-3", lessonId: "ml-types", front: "Which family is most practical ML?", back: "Supervised — labelled data is most common and results are easiest to measure." },

  { id: "ml-supervised-fc-1", lessonId: "ml-supervised", front: "Regression vs classification?", back: "Regression predicts a continuous number; classification predicts a discrete category." },
  { id: "ml-supervised-fc-2", lessonId: "ml-supervised", front: "What do X and y conventionally mean?", back: "X = features (inputs, one row per example). y = labels (the answers)." },
  { id: "ml-supervised-fc-3", lessonId: "ml-supervised", front: "Despite its name, is logistic regression classification or regression?", back: "Classification — it predicts class probabilities via the sigmoid." },

  { id: "ml-unsupervised-fc-1", lessonId: "ml-unsupervised", front: "Clustering vs association?", back: "Clustering groups similar items (e.g. k-means). Association finds co-occurrence rules (e.g. bought X → bought Y)." },
  { id: "ml-unsupervised-fc-2", lessonId: "ml-unsupervised", front: "Why is unsupervised learning harder to evaluate?", back: "No labels means no ground truth to score against. Judge by usefulness and interpretability." },

  { id: "ml-dl-intro-fc-1", lessonId: "ml-dl-intro", front: "What does 'deep' in deep learning refer to?", back: "Many stacked layers in a neural network." },
  { id: "ml-dl-intro-fc-2", lessonId: "ml-dl-intro", front: "Two big costs of deep learning?", back: "It needs lots of data and compute, and the trained model is hard to interpret." },

  // ============ P5 · Module 2: Data toolkit ============
  { id: "ml-numpy-fc-1", lessonId: "ml-numpy", front: "Why is NumPy faster than Python lists for math?", back: "Arrays are contiguous, typed, and ops are vectorized in C — no per-element Python overhead." },
  { id: "ml-numpy-fc-2", lessonId: "ml-numpy", front: "What does broadcasting do?", back: "Lets NumPy operate on arrays of different shapes by 'stretching' the smaller one — no copy needed." },
  { id: "ml-numpy-fc-3", lessonId: "ml-numpy", front: "How do you filter array values > 5?", back: "Boolean mask: `arr[arr > 5]`." },

  { id: "ml-pandas-fc-1", lessonId: "ml-pandas", front: "DataFrame vs Series?", back: "Series is one labelled column (1D). DataFrame is a labelled 2D table." },
  { id: "ml-pandas-fc-2", lessonId: "ml-pandas", front: "First three commands to run on a new DataFrame?", back: "`df.head()`, `df.info()`, `df.describe()`." },
  { id: "ml-pandas-fc-3", lessonId: "ml-pandas", front: "Select rows by position vs by condition?", back: "Position: `df.iloc[i]`. Condition: `df.loc[df['x'] > 5]`." },

  { id: "ml-matplotlib-fc-1", lessonId: "ml-matplotlib", front: "Which plot for a single variable's distribution?", back: "Histogram: `plt.hist(data, bins=20)`." },
  { id: "ml-matplotlib-fc-2", lessonId: "ml-matplotlib", front: "Which plot for two-numeric relationships?", back: "Scatter plot: `plt.scatter(x, y)`." },

  { id: "ml-seaborn-fc-1", lessonId: "ml-seaborn", front: "Best one-liner to see all pairwise relationships?", back: "`sns.pairplot(df, hue=label)`." },
  { id: "ml-seaborn-fc-2", lessonId: "ml-seaborn", front: "What does sns.heatmap(df.corr(), annot=True) show?", back: "A correlation matrix with each cell labelled with its correlation value." },

  // ============ P5 · Module 3: Preprocessing ============
  { id: "ml-collect-fc-1", lessonId: "ml-collect", front: "Why prefer parquet over CSV at scale?", back: "It loads several times faster and preserves data types (CSV makes everything a string)." },

  { id: "ml-missing-fc-1", lessonId: "ml-missing", front: "When should you DROP a column instead of imputing it?", back: "When too much (e.g. > 50-60%) is missing to recover useful signal." },
  { id: "ml-missing-fc-2", lessonId: "ml-missing", front: "Where do you compute imputation stats — train, test, or both?", back: "Training data only, then apply to test. Otherwise you leak test info into training." },
  { id: "ml-missing-fc-3", lessonId: "ml-missing", front: "Default imputation for numeric vs categorical?", back: "Mean or median for numeric; mode for categorical." },

  { id: "ml-scaling-fc-1", lessonId: "ml-scaling", front: "StandardScaler vs MinMaxScaler?", back: "StandardScaler: mean 0, std 1. MinMaxScaler: rescales to [0, 1]." },
  { id: "ml-scaling-fc-2", lessonId: "ml-scaling", front: "Do tree-based models need feature scaling?", back: "No — they split on thresholds, so scale doesn't matter. Linear, SVM, k-NN, and neural nets DO need it." },
  { id: "ml-scaling-fc-3", lessonId: "ml-scaling", front: "Pipeline: fit_transform on train, then what on test?", back: "`.transform()` only — never `.fit_transform()` on test." },

  { id: "ml-encoding-fc-1", lessonId: "ml-encoding", front: "Why is label-encoding 'city' wrong for a linear model?", back: "Linear models read integers as a number line; arbitrary city codes would imply a meaningless ordering." },
  { id: "ml-encoding-fc-2", lessonId: "ml-encoding", front: "Best encoding for an unordered categorical feature?", back: "One-hot encoding — one 0/1 column per category." },
  { id: "ml-encoding-fc-3", lessonId: "ml-encoding", front: "What if a column has 1000s of categories (e.g. zip code)?", back: "One-hot blows up. Use target encoding, frequency encoding, or hashing." },

  { id: "ml-split-fc-1", lessonId: "ml-split", front: "Why hold out a test set?", back: "Scoring on data the model never saw is the only honest estimate of generalization." },
  { id: "ml-split-fc-2", lessonId: "ml-split", front: "What does stratify=y do in train_test_split?", back: "Preserves the class proportions in both train and test sets." },
  { id: "ml-split-fc-3", lessonId: "ml-split", front: "Why is tuning hyperparameters on the test set cheating?", back: "Test information leaks into the choices, so the reported score is no longer honest. Use a separate validation set." },

  { id: "ml-imbalance-fc-1", lessonId: "ml-imbalance", front: "Why is accuracy a bad metric on imbalanced data?", back: "An always-predict-majority baseline can hit very high accuracy without learning anything." },
  { id: "ml-imbalance-fc-2", lessonId: "ml-imbalance", front: "Better metrics than accuracy for imbalanced classification?", back: "Precision, recall, F1, ROC-AUC, plus the confusion matrix." },
  { id: "ml-imbalance-fc-3", lessonId: "ml-imbalance", front: "Resample train or test for imbalance?", back: "Train only. Test must reflect real-world balance or the score lies." },

  { id: "ml-tfidf-fc-1", lessonId: "ml-tfidf", front: "What does TF-IDF do?", back: "Weights words by how often they appear in a document (TF) and how rare they are across the corpus (IDF)." },
  { id: "ml-tfidf-fc-2", lessonId: "ml-tfidf", front: "Why do common words like 'the' get low TF-IDF weight?", back: "Their IDF is near zero — they appear in nearly every document, so they don't distinguish." },

  // ============ P6 · Module 1: Linear algebra ============
  { id: "math-vectors-fc-1", lessonId: "math-vectors", front: "What is the magnitude of a vector?", back: "||v|| = sqrt(sum of squared components) — its Euclidean length." },
  { id: "math-vectors-fc-2", lessonId: "math-vectors", front: "How do you make a unit vector?", back: "Divide the vector by its magnitude: u = v / ||v||." },

  { id: "math-vector-ops-fc-1", lessonId: "math-vector-ops", front: "What does the dot product compute?", back: "a·b = sum of element-wise products. Geometrically a·b = ||a||·||b||·cos(θ)." },
  { id: "math-vector-ops-fc-2", lessonId: "math-vector-ops", front: "When are two vectors perpendicular?", back: "When their dot product is 0." },
  { id: "math-vector-ops-fc-3", lessonId: "math-vector-ops", front: "What is cosine similarity?", back: "(a·b) / (||a||·||b||) — measures angle between vectors, in [-1, 1]." },

  { id: "math-matrices-fc-1", lessonId: "math-matrices", front: "Shape of an m×n matrix after transpose?", back: "n×m — rows and columns swap." },
  { id: "math-matrices-fc-2", lessonId: "math-matrices", front: "What is the identity matrix I?", back: "Square matrix with 1s on the diagonal, 0s elsewhere. A·I = A." },
  { id: "math-matrices-fc-3", lessonId: "math-matrices", front: "When is matrix A invertible?", back: "When A is square and its determinant is nonzero." },

  { id: "math-matrix-ops-fc-1", lessonId: "math-matrix-ops", front: "Shape rule for A @ B?", back: "Inner dimensions must match: (m×k) @ (k×n) → (m×n)." },
  { id: "math-matrix-ops-fc-2", lessonId: "math-matrix-ops", front: "Is matrix multiplication commutative?", back: "No. In general A·B ≠ B·A." },
  { id: "math-matrix-ops-fc-3", lessonId: "math-matrix-ops", front: "Difference between A * B and A @ B in NumPy?", back: "`*` is element-wise; `@` is matrix multiplication." },

  // ============ P6 · Module 2: Statistics ============
  { id: "math-desc-inf-fc-1", lessonId: "math-desc-inf", front: "Descriptive vs inferential statistics?", back: "Descriptive: summarize the data you have. Inferential: generalize from a sample to a larger population." },
  { id: "math-desc-inf-fc-2", lessonId: "math-desc-inf", front: "Why is the median more robust than the mean?", back: "Outliers don't move it — the middle value stays roughly put even if one value is extreme." },

  { id: "math-sampling-fc-1", lessonId: "math-sampling", front: "Random vs stratified sampling?", back: "Random: equal chance for every member. Stratified: split into groups, sample each in proportion." },
  { id: "math-sampling-fc-2", lessonId: "math-sampling", front: "What causes biased ML predictions most often?", back: "Biased samples — training data that doesn't represent deployment data." },

  { id: "math-central-fc-1", lessonId: "math-central", front: "Why prefer median over mean for income data?", back: "Income is right-skewed (few very rich pull the mean up). Median better represents the typical person." },
  { id: "math-central-fc-2", lessonId: "math-central", front: "Which is the only central tendency that works for categorical data?", back: "Mode — the most frequent category." },

  { id: "math-variability-fc-1", lessonId: "math-variability", front: "Why is std deviation preferred over variance for reporting?", back: "It's in the same units as the data; variance is in squared units." },
  { id: "math-variability-fc-2", lessonId: "math-variability", front: "How does StandardScaler use std deviation?", back: "It maps each value to (x - mean) / std, producing mean 0 and std 1." },

  { id: "math-correlation-fc-1", lessonId: "math-correlation", front: "Range of the Pearson correlation coefficient?", back: "[-1, +1]. +1 perfect alignment, -1 perfect opposition, 0 no linear relationship." },
  { id: "math-correlation-fc-2", lessonId: "math-correlation", front: "Why doesn't r = 0 mean 'no relationship'?", back: "Correlation only measures LINEAR relationship. Two variables can be tightly related nonlinearly (e.g. y = x²) and have r ≈ 0." },
  { id: "math-correlation-fc-3", lessonId: "math-correlation", front: "Why does correlation not prove causation?", back: "A lurking third variable can drive both quantities (e.g. summer drives both ice cream sales and drownings)." },

  { id: "math-hypothesis-fc-1", lessonId: "math-hypothesis", front: "What does the null hypothesis claim?", back: "There is no effect / no difference. The status quo." },
  { id: "math-hypothesis-fc-2", lessonId: "math-hypothesis", front: "What exactly does a p-value measure?", back: "The probability of observing data this extreme assuming the null hypothesis is true." },
  { id: "math-hypothesis-fc-3", lessonId: "math-hypothesis", front: "Type I vs Type II error?", back: "Type I: reject true H₀ (false positive). Type II: fail to reject false H₀ (false negative)." },

  // ============ P6 · Module 3: Probability ============
  { id: "math-prob-basics-fc-1", lessonId: "math-prob-basics", front: "Definition of conditional probability P(A|B)?", back: "P(A ∩ B) / P(B). Probability of A given that B happened." },
  { id: "math-prob-basics-fc-2", lessonId: "math-prob-basics", front: "Bayes' theorem?", back: "P(A|B) = P(B|A) · P(A) / P(B)." },
  { id: "math-prob-basics-fc-3", lessonId: "math-prob-basics", front: "Two independent events: P(A ∩ B) = ?", back: "P(A) · P(B)." },

  { id: "math-random-vars-fc-1", lessonId: "math-random-vars", front: "Discrete vs continuous random variable?", back: "Discrete takes countable values (die roll). Continuous takes any value in a range (height)." },
  { id: "math-random-vars-fc-2", lessonId: "math-random-vars", front: "What is E[X]?", back: "Expected value — the long-run average of X over infinite repetitions. E[X] = Σ x · P(X=x) for discrete." },

  { id: "math-distributions-fc-1", lessonId: "math-distributions", front: "PMF vs PDF?", back: "PMF (discrete) gives P(X = x) directly. PDF (continuous) gives a density; probabilities come from areas under the curve." },
  { id: "math-distributions-fc-2", lessonId: "math-distributions", front: "What does a CDF return?", back: "F(x) = P(X ≤ x). Always non-decreasing 0 → 1." },

  { id: "math-normal-fc-1", lessonId: "math-normal", front: "State the 68-95-99.7 rule.", back: "For a normal distribution: ~68% of values fall within 1 std, ~95% within 2 stds, ~99.7% within 3 stds of the mean." },
  { id: "math-normal-fc-2", lessonId: "math-normal", front: "What is a z-score?", back: "(x - μ) / σ — how many standard deviations a value is from the mean." },
  { id: "math-normal-fc-3", lessonId: "math-normal", front: "Why do so many real quantities look normal? (CLT)", back: "Central Limit Theorem: the sum of many small independent effects tends to a normal, regardless of their original distributions." },

  { id: "math-poisson-fc-1", lessonId: "math-poisson", front: "What does Poisson(λ) model?", back: "The count of independent rare events in a fixed time/space window with average rate λ." },
  { id: "math-poisson-fc-2", lessonId: "math-poisson", front: "Mean and variance of Poisson(λ)?", back: "Both equal λ." },

  // ============ P7 · Module 1: Model concepts ============
  { id: "core-workflow-fc-1", lessonId: "core-workflow", front: "Seven steps of an ML project?", back: "Frame → collect → clean → engineer → train → evaluate → deploy & monitor." },
  { id: "core-workflow-fc-2", lessonId: "core-workflow", front: "Where do real ML practitioners spend most of their time?", back: "On data: collection, cleaning, and feature engineering. Algorithm tuning is a smaller share than people think." },

  { id: "core-model-selection-fc-1", lessonId: "core-model-selection", front: "What is k-fold cross-validation?", back: "Split training data into k folds, train on k-1, validate on the held-out fold; repeat k times and average." },
  { id: "core-model-selection-fc-2", lessonId: "core-model-selection", front: "Where should preprocessing live in cross-validation?", back: "Inside each fold (e.g. via a Pipeline) so val data doesn't leak into training." },

  { id: "core-overfitting-fc-1", lessonId: "core-overfitting", front: "Diagnose: train 99%, test 65%.", back: "Overfitting — model memorized training, fails to generalize." },
  { id: "core-overfitting-fc-2", lessonId: "core-overfitting", front: "Diagnose: train 60%, test 58%.", back: "Underfitting — model is too simple to capture the pattern." },
  { id: "core-overfitting-fc-3", lessonId: "core-overfitting", front: "Three fixes for overfitting?", back: "More data, regularization (L1/L2), reduce model complexity, dropout, early stopping." },

  { id: "core-bias-variance-fc-1", lessonId: "core-bias-variance", front: "What does high bias mean?", back: "The model is too simple — its assumptions are too rigid to capture the true pattern (underfitting)." },
  { id: "core-bias-variance-fc-2", lessonId: "core-bias-variance", front: "What does high variance mean?", back: "The model is too flexible — predictions wobble a lot with different training data (overfitting)." },
  { id: "core-bias-variance-fc-3", lessonId: "core-bias-variance", front: "How does model complexity trade bias for variance?", back: "More complex → less bias but more variance. The sweet spot minimizes total error." },

  { id: "core-loss-fc-1", lessonId: "core-loss", front: "MSE vs MAE — which punishes outliers more?", back: "MSE — squaring magnifies large errors much more than absolute values." },
  { id: "core-loss-fc-2", lessonId: "core-loss", front: "Standard loss for classification?", back: "Cross-entropy (log loss). It punishes confidently wrong predictions severely." },
  { id: "core-loss-fc-3", lessonId: "core-loss", front: "Why is MSE wrong for binary classification?", back: "It treats class labels as numbers, gives small gradients near 0/1, and doesn't penalize confident wrong answers enough." },

  { id: "core-metrics-fc-1", lessonId: "core-metrics", front: "Precision formula?", back: "TP / (TP + FP). Of predicted positives, how many are actually positive." },
  { id: "core-metrics-fc-2", lessonId: "core-metrics", front: "Recall formula?", back: "TP / (TP + FN). Of actual positives, how many we caught." },
  { id: "core-metrics-fc-3", lessonId: "core-metrics", front: "When is recall more important than precision?", back: "When missing a positive is costly (fraud, cancer detection). When false positives are costly, prefer precision." },
  { id: "core-metrics-fc-4", lessonId: "core-metrics", front: "What does R² = 0.85 mean?", back: "The model explains 85% of the variance in the target. 1.0 = perfect, 0.0 = no better than always predicting the mean." },

  { id: "core-gd-fc-1", lessonId: "core-gd", front: "Gradient descent update rule?", back: "w ← w - η · ∇L(w), where η is the learning rate." },
  { id: "core-gd-fc-2", lessonId: "core-gd", front: "What happens if the learning rate is too large?", back: "The optimizer overshoots and may diverge — loss explodes instead of converging." },
  { id: "core-gd-fc-3", lessonId: "core-gd", front: "Batch GD vs SGD vs mini-batch?", back: "Batch: all data per step. SGD: one example per step. Mini-batch: small chunk — the practical standard." },

  // ============ P7 · Module 2: Algorithms ============
  { id: "core-linreg-fc-1", lessonId: "core-linreg", front: "Linear regression's model equation?", back: "ŷ = Xw + b. Minimize MSE: mean of (y - ŷ)²." },
  { id: "core-linreg-fc-2", lessonId: "core-linreg", front: "Two ways to solve linear regression?", back: "Closed-form normal equation: w = (XᵀX)⁻¹Xᵀy. Or iterative: gradient descent." },

  { id: "core-logreg-fc-1", lessonId: "core-logreg", front: "How does logistic regression turn a score into a probability?", back: "Through the sigmoid: σ(z) = 1 / (1 + e^(-z)), squashing real numbers into (0, 1)." },
  { id: "core-logreg-fc-2", lessonId: "core-logreg", front: "Loss function for logistic regression?", back: "Binary cross-entropy: -[y·log(p) + (1-y)·log(1-p)]." },
  { id: "core-logreg-fc-3", lessonId: "core-logreg", front: "What's the multi-class analog of sigmoid?", back: "Softmax — turns k scores into a probability distribution over k classes that sums to 1." },

  { id: "core-svm-fc-1", lessonId: "core-svm", front: "What does an SVM maximize?", back: "The margin: the gap between the decision boundary and the nearest points of each class." },
  { id: "core-svm-fc-2", lessonId: "core-svm", front: "What is the kernel trick?", back: "Compute dot products in a higher-dimensional space implicitly, enabling nonlinear decision boundaries without explicit mapping." },
  { id: "core-svm-fc-3", lessonId: "core-svm", front: "Why must features be scaled before SVM?", back: "SVMs use distances; unscaled features with larger ranges dominate, and smaller ones get ignored." },

  { id: "core-trees-rf-fc-1", lessonId: "core-trees-rf", front: "How does a decision tree split?", back: "Picks the feature and threshold that most reduces impurity (Gini for classification, MSE for regression)." },
  { id: "core-trees-rf-fc-2", lessonId: "core-trees-rf", front: "How does a random forest reduce variance?", back: "Trains many trees on bootstrap samples + random feature subsets, then averages predictions — decorrelated trees' errors cancel." },
  { id: "core-trees-rf-fc-3", lessonId: "core-trees-rf", front: "Do tree models need feature scaling?", back: "No. They split on thresholds; scale doesn't matter." },

  { id: "core-knn-nb-fc-1", lessonId: "core-knn-nb", front: "How does k-NN predict a class?", back: "Find the k nearest training points by distance, then majority-vote their labels." },
  { id: "core-knn-nb-fc-2", lessonId: "core-knn-nb", front: "What independence assumption does Naive Bayes make?", back: "All features are conditionally independent given the class — naive in general but works well for text." },
  { id: "core-knn-nb-fc-3", lessonId: "core-knn-nb", front: "Why is k-NN slow at prediction time?", back: "It has no real training step — every query must compute distances to all stored training points." },

  { id: "core-kmeans-pca-fc-1", lessonId: "core-kmeans-pca", front: "How does k-Means work?", back: "Initialize k centers; assign each point to the nearest; move each center to the mean of its points; repeat until stable." },
  { id: "core-kmeans-pca-fc-2", lessonId: "core-kmeans-pca", front: "How do you choose k for k-Means?", back: "Elbow method (plot inertia vs k, look for the bend) or silhouette score." },
  { id: "core-kmeans-pca-fc-3", lessonId: "core-kmeans-pca", front: "What does PCA find?", back: "Directions in feature space along which the data varies most — top components retain the most variance." },
  { id: "core-kmeans-pca-fc-4", lessonId: "core-kmeans-pca", front: "Why scale features before PCA?", back: "Otherwise PCA picks directions of features with the biggest raw scale, not the most informative ones." },

  // ============ P7 · Module 3: Pipeline & projects ============
  { id: "core-pipeline-fc-1", lessonId: "core-pipeline", front: "What's the main benefit of sklearn's Pipeline?", back: "Chains preprocessing + model into one object that prevents data leakage in cross-validation." },
  { id: "core-pipeline-fc-2", lessonId: "core-pipeline", front: "What does ColumnTransformer do?", back: "Applies different preprocessing steps to different columns (e.g. scale numeric, one-hot encode categorical)." },
  { id: "core-pipeline-fc-3", lessonId: "core-pipeline", front: "Param key format in GridSearchCV for a pipeline step?", back: "`<step_name>__<param>`, e.g. `clf__C`." },

  { id: "core-projects-fc-1", lessonId: "core-projects", front: "Three portfolio project families to cover?", back: "At least one regression, one classification, one clustering or NLP. Plus a deployed AI app if you can." },
  { id: "core-projects-fc-2", lessonId: "core-projects", front: "Depth or breadth for an ML portfolio?", back: "Depth. Two or three polished projects beat ten half-finished ones." },

  // ============ P8 · Module 1: NN foundations ============
  { id: "dl-neurons-fc-1", lessonId: "dl-neurons", front: "Computation in a single neuron?", back: "z = w·x + b, then a = activation(z)." },
  { id: "dl-neurons-fc-2", lessonId: "dl-neurons", front: "What happens without an activation function?", back: "Stacking linear layers collapses to a single linear function — depth gives nothing." },
  { id: "dl-neurons-fc-3", lessonId: "dl-neurons", front: "Default activation for hidden layers?", back: "ReLU: max(0, z). Simple, no saturation for positive inputs, gradients flow cleanly." },

  { id: "dl-forward-loss-fc-1", lessonId: "dl-forward-loss", front: "Output activation for binary vs multi-class classification?", back: "Sigmoid for binary; softmax for multi-class." },
  { id: "dl-forward-loss-fc-2", lessonId: "dl-forward-loss", front: "Why subtract x.max() before exp in softmax?", back: "Numerical stability — prevents overflow when scores are large." },

  { id: "dl-backprop-fc-1", lessonId: "dl-backprop", front: "What does backpropagation compute?", back: "The gradient of the loss with respect to every parameter, via the chain rule applied backward." },
  { id: "dl-backprop-fc-2", lessonId: "dl-backprop", front: "What is vanishing gradient?", back: "Gradients shrink toward 0 through many layers, so deep layers stop learning. Common with sigmoid; ReLU helps." },
  { id: "dl-backprop-fc-3", lessonId: "dl-backprop", front: "Why do we cache forward-pass values?", back: "The backward pass reuses them to compute gradients via the chain rule." },

  { id: "dl-optimizers-fc-1", lessonId: "dl-optimizers", front: "Default optimizer + learning rate for deep nets?", back: "Adam, lr = 1e-3. Solid starting point." },
  { id: "dl-optimizers-fc-2", lessonId: "dl-optimizers", front: "What's an epoch?", back: "One full pass through the training data." },
  { id: "dl-optimizers-fc-3", lessonId: "dl-optimizers", front: "First thing to try when training diverges?", back: "Lower the learning rate by 10x." },

  // ============ P8 · Module 2: PyTorch & architectures ============
  { id: "dl-pytorch-basics-fc-1", lessonId: "dl-pytorch-basics", front: "What is PyTorch autograd?", back: "Automatic differentiation — PyTorch builds a graph and computes gradients via .backward() automatically." },
  { id: "dl-pytorch-basics-fc-2", lessonId: "dl-pytorch-basics", front: "Standard 5-step PyTorch training step?", back: "optimizer.zero_grad() → forward → compute loss → loss.backward() → optimizer.step()." },
  { id: "dl-pytorch-basics-fc-3", lessonId: "dl-pytorch-basics", front: "Why call optimizer.zero_grad() before backward?", back: "PyTorch accumulates gradients across calls; without zeroing, batches' gradients pile up." },

  { id: "dl-cnn-fc-1", lessonId: "dl-cnn", front: "Two priors a CNN encodes architecturally?", back: "Locality (features depend on local regions) and translation equivariance (same filter works anywhere)." },
  { id: "dl-cnn-fc-2", lessonId: "dl-cnn", front: "Why does weight sharing in CNNs matter?", back: "Same filter applied at every position → far fewer parameters than a dense layer over an image." },
  { id: "dl-cnn-fc-3", lessonId: "dl-cnn", front: "What is transfer learning for CNNs?", back: "Start from a pretrained backbone (ResNet, EfficientNet) and fine-tune the last layers on your task." },

  { id: "dl-rnn-lstm-fc-1", lessonId: "dl-rnn-lstm", front: "What does an RNN's hidden state do?", back: "Carries information forward across time steps — the network's memory of past inputs." },
  { id: "dl-rnn-lstm-fc-2", lessonId: "dl-rnn-lstm", front: "What problem do LSTM gates solve?", back: "They let gradients flow through long sequences, so the network can learn long-range dependencies that vanilla RNNs forget." },

  { id: "dl-transformers-fc-1", lessonId: "dl-transformers", front: "Core operation of self-attention?", back: "Each token computes weighted sum of all tokens' values, weights = softmax(QKᵀ/√d_k)." },
  { id: "dl-transformers-fc-2", lessonId: "dl-transformers", front: "Why divide by √d_k inside softmax?", back: "Without scaling, dot products grow with d_k, saturating softmax and killing gradients." },
  { id: "dl-transformers-fc-3", lessonId: "dl-transformers", front: "Why are positional encodings necessary?", back: "Self-attention is order-agnostic — it has no notion of position without an explicit signal." },
  { id: "dl-transformers-fc-4", lessonId: "dl-transformers", front: "Why are transformers more parallelizable than RNNs?", back: "All positions are processed simultaneously by attention, vs RNNs that must process one step at a time." },

  // ============ P9 · Module 1: LLM foundations ============
  { id: "llm-how-fc-1", lessonId: "llm-how", front: "What is an LLM literally doing?", back: "Predicting the next token, repeatedly, given the tokens so far." },
  { id: "llm-how-fc-2", lessonId: "llm-how", front: "What is the context window?", back: "The maximum number of tokens the model can attend to at once (prompt + generated so far)." },
  { id: "llm-how-fc-3", lessonId: "llm-how", front: "What does temperature 0 do?", back: "Makes generation deterministic (always picks the highest-probability token). Best for code and facts." },

  { id: "llm-apis-prompting-fc-1", lessonId: "llm-apis-prompting", front: "Purpose of the system message?", back: "Set role and behaviour rules for the assistant (tone, format, constraints)." },
  { id: "llm-apis-prompting-fc-2", lessonId: "llm-apis-prompting", front: "What is few-shot prompting?", back: "Including a handful of input/output examples in the prompt to teach format and style." },
  { id: "llm-apis-prompting-fc-3", lessonId: "llm-apis-prompting", front: "What does 'chain of thought' achieve?", back: "Telling the model to reason step by step before answering improves accuracy on multi-step problems." },

  { id: "llm-embeddings-fc-1", lessonId: "llm-embeddings", front: "What is a text embedding?", back: "A dense vector representation of text where semantically similar texts sit close together in vector space." },
  { id: "llm-embeddings-fc-2", lessonId: "llm-embeddings", front: "Why cosine similarity for embeddings?", back: "It measures angle, not magnitude — robust to vector length, focuses on direction (meaning)." },
  { id: "llm-embeddings-fc-3", lessonId: "llm-embeddings", front: "Why pre-compute embeddings for your corpus?", back: "Embedding calls cost money and time; computing once and reusing keeps queries fast and cheap." },

  { id: "llm-vector-db-fc-1", lessonId: "llm-vector-db", front: "Why use a vector database for embeddings?", back: "Approximate nearest neighbor (ANN) search makes top-k similarity queries fast at millions of vectors." },
  { id: "llm-vector-db-fc-2", lessonId: "llm-vector-db", front: "When does pgvector make sense over a dedicated vector DB?", back: "When you already run Postgres and want to avoid an extra service for moderate scale." },

  // ============ P9 · Module 2: Building AI apps ============
  { id: "llm-rag-fc-1", lessonId: "llm-rag", front: "What is RAG?", back: "Retrieval-Augmented Generation: retrieve relevant chunks from your data at query time, give them to the LLM as context, generate an answer." },
  { id: "llm-rag-fc-2", lessonId: "llm-rag", front: "What problem does RAG solve?", back: "LLM hallucination on private or recent data the model never saw during training." },
  { id: "llm-rag-fc-3", lessonId: "llm-rag", front: "Typical chunk size for RAG?", back: "300-800 tokens, with ~50-token overlap. Too small loses context, too big retrieves noise." },

  { id: "llm-prompt-vs-finetune-fc-1", lessonId: "llm-prompt-vs-finetune", front: "Try-first approach for adapting an LLM?", back: "Prompting. Cheapest, fastest, no training. Solves most tasks." },
  { id: "llm-prompt-vs-finetune-fc-2", lessonId: "llm-prompt-vs-finetune", front: "Best technique to inject new facts?", back: "RAG — fine-tuning is poor at teaching new factual knowledge but great at style/format." },
  { id: "llm-prompt-vs-finetune-fc-3", lessonId: "llm-prompt-vs-finetune", front: "When should you fine-tune?", back: "When you need consistent style/format at scale, or specialized behaviour that prompting can't reliably produce." },

  { id: "llm-agents-fc-1", lessonId: "llm-agents", front: "What is an AI agent?", back: "An LLM with tools it can choose to call — it plans, executes via tools, and incorporates the results." },
  { id: "llm-agents-fc-2", lessonId: "llm-agents", front: "How are tools defined for the model?", back: "As function schemas (name, description, JSON parameters) the model can choose to invoke." },
  { id: "llm-agents-fc-3", lessonId: "llm-agents", front: "Non-negotiable safety control for an agent loop?", back: "Iteration cap. Without one, a misbehaving agent loops forever and burns cost." },

  { id: "llm-build-deploy-fc-1", lessonId: "llm-build-deploy", front: "Where must the LLM API key live in a web app?", back: "Server-side only — never in client code where users could extract it." },
  { id: "llm-build-deploy-fc-2", lessonId: "llm-build-deploy", front: "Why stream LLM responses to the UI?", back: "Better UX — users see tokens appear as the model generates them, rather than waiting for the full response." },

  { id: "llm-responsible-fc-1", lessonId: "llm-responsible", front: "What is an 'eval set' for an AI app?", back: "A curated benchmark of representative inputs you score the model against on every prompt or model change. Like unit tests for AI." },
  { id: "llm-responsible-fc-2", lessonId: "llm-responsible", front: "Single best mitigation for LLM hallucination?", back: "Grounding via RAG plus requiring citations and refusing when info isn't in the context." },
  { id: "llm-responsible-fc-3", lessonId: "llm-responsible", front: "What is prompt injection?", back: "Malicious user input that tries to override the system instructions of an LLM app." },

  // ============ P10 · Module 1: MLOps ============
  { id: "mlops-tracking-fc-1", lessonId: "mlops-tracking", front: "What does experiment tracking save per run?", back: "Code commit, data version, hyperparameters, metric history, model artifact, environment." },
  { id: "mlops-tracking-fc-2", lessonId: "mlops-tracking", front: "Why version data, not just code?", back: "Same code on different data can produce very different models. Reproducibility requires both." },
  { id: "mlops-tracking-fc-3", lessonId: "mlops-tracking", front: "What is a model registry?", back: "A versioned store of trained models, often with stages (dev, staging, prod) for safe promotion." },

  { id: "mlops-serving-fc-1", lessonId: "mlops-serving", front: "Standard Python stack for serving an ML model?", back: "FastAPI + uvicorn + Docker." },
  { id: "mlops-serving-fc-2", lessonId: "mlops-serving", front: "When is batch serving cheaper than real-time?", back: "When latency isn't critical — score millions of rows on a schedule rather than per request." },
  { id: "mlops-serving-fc-3", lessonId: "mlops-serving", front: "Why load the model at import time?", back: "It amortizes the load cost over all requests, instead of paying it on every call." },

  { id: "mlops-monitoring-fc-1", lessonId: "mlops-monitoring", front: "Why monitor input distributions, not just accuracy?", back: "Ground-truth labels often arrive late. Input drift is a leading indicator that something has changed." },
  { id: "mlops-monitoring-fc-2", lessonId: "mlops-monitoring", front: "Common drift-detection metric?", back: "PSI (Population Stability Index) or a KS test comparing current vs training distributions." },

  { id: "mlops-pipelines-fc-1", lessonId: "mlops-pipelines", front: "What does an ML pipeline automate?", back: "Ingest → validate → preprocess → train → evaluate → register → deploy as code, runnable on a schedule or trigger." },
  { id: "mlops-pipelines-fc-2", lessonId: "mlops-pipelines", front: "Purpose of a CI 'model quality gate'?", back: "Fail the PR if validation metric drops below baseline — prevents regressions from merging." },

  // ============ P10 · Module 2: Career ============
  { id: "mlops-portfolio-fc-1", lessonId: "mlops-portfolio", front: "Three families to cover in an ML portfolio?", back: "Classical ML end-to-end, deep learning, AI/LLM app. Plus polish on at least one." },
  { id: "mlops-portfolio-fc-2", lessonId: "mlops-portfolio", front: "Anatomy of a great project README?", back: "Problem, data, approach + trade-offs, results, honest lessons learned, how to run, live demo." },

  { id: "mlops-interviews-fc-1", lessonId: "mlops-interviews", front: "Four typical rounds in ML interviews?", back: "Coding (DSA), ML fundamentals, ML coding, ML system design." },
  { id: "mlops-interviews-fc-2", lessonId: "mlops-interviews", front: "Why prepare DSA for ML roles?", back: "Most ML interviews still include standard data-structures and algorithms rounds." },

  { id: "mlops-system-design-fc-1", lessonId: "mlops-system-design", front: "The 7-step ML system design framework?", back: "Clarify → Data → Features → Model → Train/Eval → Serve → Monitor." },
  { id: "mlops-system-design-fc-2", lessonId: "mlops-system-design", front: "How should you start an ML system design answer?", back: "Spend the first 90 seconds clarifying scope, users, metric, constraints — even if it feels obvious." },
];

/** Predict-output style multiple-choice questions for code-heavy ML lessons. */
export const mlPredict: PredictOutput[] = [
  // ============ P5 ============
  { id: "ml-numpy-po-1", lessonId: "ml-numpy", code: "import numpy as np\na = np.array([1, 2, 3])\nprint(a * 2 + 1)", options: ["[3 5 7]", "[2 4 6]", "[1 2 3 1 2 3]", "Error"], answer: 0, explanation: "Vectorized: each element doubled and added 1 → [3 5 7]." },
  { id: "ml-numpy-po-2", lessonId: "ml-numpy", code: "import numpy as np\na = np.arange(6).reshape(2, 3)\nprint(a.shape)", options: ["(2, 3)", "(3, 2)", "(6,)", "(2, 6)"], answer: 0, explanation: "reshape(2, 3) makes a 2-row, 3-column array." },
  { id: "ml-numpy-po-3", lessonId: "ml-numpy", code: "import numpy as np\na = np.array([1, 2, 3, 4])\nprint(a[a > 2])", options: ["[3 4]", "[1 2]", "[True True True True]", "Error"], answer: 0, explanation: "Boolean mask keeps only the values where the condition is True." },

  { id: "ml-pandas-po-1", lessonId: "ml-pandas", code: "import pandas as pd\ndf = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})\nprint(df['a'].sum())", options: ["6", "15", "21", "Error"], answer: 0, explanation: "Column 'a' is [1, 2, 3], summing to 6." },
  { id: "ml-pandas-po-2", lessonId: "ml-pandas", code: "import pandas as pd\ndf = pd.DataFrame({'x': [1, 2, 3, 4]})\nprint(df[df['x'] > 2].shape)", options: ["(2, 1)", "(4, 1)", "(2, 2)", "(3, 1)"], answer: 0, explanation: "Two rows match (3 and 4), one column → shape (2, 1)." },

  { id: "ml-split-po-1", lessonId: "ml-split", code: "from sklearn.model_selection import train_test_split\nX = list(range(10)); y = [0]*5 + [1]*5\nXt, Xv, yt, yv = train_test_split(X, y, test_size=0.2, random_state=0)\nprint(len(Xv))", options: ["2", "8", "10", "5"], answer: 0, explanation: "test_size=0.2 of 10 = 2 test examples." },

  { id: "ml-tfidf-po-1", lessonId: "ml-tfidf", code: "from sklearn.feature_extraction.text import TfidfVectorizer\nv = TfidfVectorizer()\nX = v.fit_transform(['cat dog', 'cat cat'])\nprint(X.shape)", options: ["(2, 2)", "(2, 3)", "(1, 2)", "Error"], answer: 0, explanation: "2 documents, vocabulary {cat, dog} → shape (2, 2)." },

  // ============ P6 ============
  { id: "math-vectors-po-1", lessonId: "math-vectors", code: "import numpy as np\nv = np.array([3, 4])\nprint(np.linalg.norm(v))", options: ["5.0", "7.0", "12.0", "25.0"], answer: 0, explanation: "||v|| = sqrt(9 + 16) = sqrt(25) = 5." },

  { id: "math-vector-ops-po-1", lessonId: "math-vector-ops", code: "import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(a @ b)", options: ["32", "10", "[4 10 18]", "Error"], answer: 0, explanation: "Dot product: 1·4 + 2·5 + 3·6 = 32." },
  { id: "math-vector-ops-po-2", lessonId: "math-vector-ops", code: "import numpy as np\nprint(np.array([1, 0]) @ np.array([0, 1]))", options: ["0", "1", "[0 0]", "Error"], answer: 0, explanation: "Dot product of perpendicular unit vectors is 0." },

  { id: "math-matrices-po-1", lessonId: "math-matrices", code: "import numpy as np\nA = np.array([[1, 2, 3], [4, 5, 6]])\nprint(A.T.shape)", options: ["(3, 2)", "(2, 3)", "(6,)", "Error"], answer: 0, explanation: "Transpose swaps rows and columns → (3, 2)." },

  { id: "math-matrix-ops-po-1", lessonId: "math-matrix-ops", code: "import numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5], [6]])\nprint((A @ B).flatten())", options: ["[17 39]", "[5 6]", "[11 18]", "Error"], answer: 0, explanation: "[[1·5+2·6], [3·5+4·6]] = [[17], [39]]." },
  { id: "math-matrix-ops-po-2", lessonId: "math-matrix-ops", code: "import numpy as np\nA = np.array([[1, 2]])  # shape (1,2)\nB = np.array([[1, 2]])  # shape (1,2)\ntry:\n    print((A @ B).shape)\nexcept Exception as e:\n    print('Error')", options: ["Error", "(1, 1)", "(1, 2)", "(2, 1)"], answer: 0, explanation: "Inner dims don't match: (1,2) @ (1,2) is invalid; (1,2) @ (2,1) would work." },

  { id: "math-central-po-1", lessonId: "math-central", code: "import numpy as np\nprint(np.median([1, 2, 3, 100]))", options: ["2.5", "26.5", "100", "2.0"], answer: 0, explanation: "Median of an even-length sorted list is the average of the two middle values: (2+3)/2 = 2.5." },

  { id: "math-variability-po-1", lessonId: "math-variability", code: "import numpy as np\nprint(np.std([2, 4, 4, 4, 5, 5, 7, 9]))", options: ["2.0", "5.0", "4.0", "1.0"], answer: 0, explanation: "Variance = 4, std = sqrt(4) = 2." },

  { id: "math-correlation-po-1", lessonId: "math-correlation", code: "import numpy as np\nx = np.array([1, 2, 3, 4])\ny = np.array([2, 4, 6, 8])\nprint(round(np.corrcoef(x, y)[0, 1], 2))", options: ["1.0", "0.0", "-1.0", "0.5"], answer: 0, explanation: "y is exactly 2x → perfect positive correlation, r = 1.0." },

  { id: "math-normal-po-1", lessonId: "math-normal", code: "from scipy import stats\nprint(round(stats.norm.cdf(0), 2))", options: ["0.5", "0.0", "1.0", "0.68"], answer: 0, explanation: "Standard normal is symmetric around 0; P(Z ≤ 0) = 0.5." },

  { id: "math-poisson-po-1", lessonId: "math-poisson", code: "from scipy import stats\nprint(round(stats.poisson.pmf(0, mu=2), 3))", options: ["0.135", "0.271", "0.0", "1.0"], answer: 0, explanation: "P(X=0) = e^(-2) ≈ 0.135." },

  // ============ P7 ============
  { id: "core-loss-po-1", lessonId: "core-loss", code: "import numpy as np\ny = np.array([1, 2, 3])\nyhat = np.array([1, 2, 5])\nprint(np.mean((y - yhat) ** 2))", options: ["1.3333333333333333", "0.6666666666666666", "4.0", "2.0"], answer: 0, explanation: "Squared errors: 0, 0, 4 → mean = 4/3 ≈ 1.333." },

  { id: "core-metrics-po-1", lessonId: "core-metrics", code: "TP, FP, FN, TN = 80, 20, 10, 890\nprecision = TP / (TP + FP)\nrecall = TP / (TP + FN)\nprint(round(precision, 2), round(recall, 2))", options: ["0.8 0.89", "0.89 0.8", "0.97 0.5", "0.5 0.97"], answer: 0, explanation: "Precision 80/100 = 0.80; recall 80/90 ≈ 0.889." },

  { id: "core-gd-po-1", lessonId: "core-gd", code: "w = 0\nfor _ in range(3):\n    grad = 2 * (w - 5)\n    w = w - 0.1 * grad\nprint(round(w, 3))", options: ["2.44", "1.0", "5.0", "0.5"], answer: 0, explanation: "Steps: 0 → 1 → 1.8 → 2.44." },

  { id: "core-linreg-po-1", lessonId: "core-linreg", code: "from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([[1], [2], [3]])\ny = np.array([2, 4, 6])\nm = LinearRegression().fit(X, y)\nprint(round(m.coef_[0], 1), round(m.intercept_, 1))", options: ["2.0 0.0", "1.0 1.0", "0.0 2.0", "2.0 1.0"], answer: 0, explanation: "y = 2x perfectly: slope 2, intercept 0." },

  { id: "core-logreg-po-1", lessonId: "core-logreg", code: "import numpy as np\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\nprint(round(sigmoid(0), 2))", options: ["0.5", "0.0", "1.0", "0.73"], answer: 0, explanation: "sigmoid(0) = 1/(1+1) = 0.5." },

  // ============ P8 ============
  { id: "dl-neurons-po-1", lessonId: "dl-neurons", code: "import numpy as np\ndef relu(z): return np.maximum(0, z)\nz = np.array([-2, 0, 3])\nprint(relu(z))", options: ["[0 0 3]", "[-2 0 3]", "[0 1 3]", "Error"], answer: 0, explanation: "ReLU sets negatives to 0; non-negatives are unchanged." },

  { id: "dl-forward-loss-po-1", lessonId: "dl-forward-loss", code: "import numpy as np\nlogits = np.array([2.0, 1.0, 0.1])\nexp = np.exp(logits - logits.max())\nprobs = exp / exp.sum()\nprint(round(probs.sum(), 2))", options: ["1.0", "0.0", "3.1", "2.0"], answer: 0, explanation: "Softmax outputs always sum to 1 (a probability distribution)." },

  { id: "dl-backprop-po-1", lessonId: "dl-backprop", code: "# L = (a - 5)^2 and a = 2x + 3\n# Compute dL/dx at x = 1\nx = 1\na = 2 * x + 3      # = 5\ndL_da = 2 * (a - 5)\nda_dx = 2\nprint(dL_da * da_dx)", options: ["0", "4", "10", "20"], answer: 0, explanation: "dL/da = 0 at x=1 (since a=5), so dL/dx = 0 (x=1 is the minimum)." },

  { id: "dl-optimizers-po-1", lessonId: "dl-optimizers", code: "# 100,000 examples, batch_size = 256\niters_per_epoch = 100000 // 256\nprint(iters_per_epoch)", options: ["390", "100", "256", "1000"], answer: 0, explanation: "100000 / 256 ≈ 390 (the last batch may be smaller)." },

  { id: "dl-pytorch-basics-po-1", lessonId: "dl-pytorch-basics", code: "import torch\nw = torch.tensor(2.0, requires_grad=True)\nL = (w - 5) ** 2\nL.backward()\nprint(w.grad.item())", options: ["-6.0", "6.0", "0.0", "2.0"], answer: 0, explanation: "dL/dw = 2(w-5) = 2·(2-5) = -6." },

  { id: "dl-cnn-po-1", lessonId: "dl-cnn", code: "# A 32x32 image after MaxPool2d(2):\nimport torch\nimport torch.nn as nn\nx = torch.randn(1, 1, 32, 32)\npool = nn.MaxPool2d(2)\nprint(pool(x).shape[-1])", options: ["16", "32", "8", "64"], answer: 0, explanation: "MaxPool with stride 2 halves spatial dims: 32 → 16." },

  // ============ P9 ============
  { id: "llm-how-po-1", lessonId: "llm-how", code: "# input price: $0.50 per 1M tokens\n# 3000 input tokens\ncost = 3000 / 1_000_000 * 0.50\nprint(round(cost, 4))", options: ["0.0015", "0.05", "0.15", "1.5"], answer: 0, explanation: "3000 / 1,000,000 · $0.50 = $0.0015." },

  { id: "llm-embeddings-po-1", lessonId: "llm-embeddings", code: "import numpy as np\ndef cos(a, b):\n    return (a @ b) / (np.linalg.norm(a) * np.linalg.norm(b))\nprint(round(cos(np.array([1, 0]), np.array([1, 0])), 2))", options: ["1.0", "0.0", "-1.0", "0.5"], answer: 0, explanation: "Identical-direction vectors → cosine = 1." },
  { id: "llm-embeddings-po-2", lessonId: "llm-embeddings", code: "import numpy as np\ndef cos(a, b):\n    return (a @ b) / (np.linalg.norm(a) * np.linalg.norm(b))\nprint(round(cos(np.array([1, 0]), np.array([-1, 0])), 2))", options: ["-1.0", "0.0", "1.0", "0.5"], answer: 0, explanation: "Opposite-direction vectors → cosine = -1." },

  // ============ P10 ============
  { id: "mlops-monitoring-po-1", lessonId: "mlops-monitoring", code: "# A model's predicted positive rate doubled overnight.\n# Which is FIRST signal to investigate?\nsignal = \"input feature drift vs training distribution\"\nprint(signal)", options: ["input feature drift vs training distribution", "wait for labels in 90 days", "delete the model", "ignore until accuracy drops"], answer: 0, explanation: "Input drift is a leading indicator and is available immediately, unlike ground-truth labels." },
];
