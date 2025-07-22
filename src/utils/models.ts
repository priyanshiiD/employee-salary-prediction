import * as tf from '@tensorflow/tfjs';
import { Matrix } from 'ml-matrix';
import { SimpleLinearRegression, PolynomialRegression } from 'ml-regression';
import { calculateMetrics } from './dataProcessing';
import { ModelMetrics } from '../types';

export class LinearRegressionModel {
  private model: SimpleLinearRegression | null = null;
  private isMultivariate = false;
  private weights: number[] = [];
  private bias = 0;

  async train(features: number[][], targets: number[]): Promise<ModelMetrics> {
    const startTime = Date.now();
    
    if (features[0].length === 1) {
      this.model = new SimpleLinearRegression(
        features.map(f => f[0]), 
        targets
      );
      this.isMultivariate = false;
    } else {
      this.isMultivariate = true;
      const X = new Matrix(features.map(f => [1, ...f]));
      const y = new Matrix(targets.map(t => [t]));
      
      try {
        const XtX = X.transpose().mmul(X);
        const XtXInv = XtX.inverse();
        const Xty = X.transpose().mmul(y);
        const weights = XtXInv.mmul(Xty);
        
        this.bias = weights.get(0, 0);
        this.weights = [];
        for (let i = 1; i < weights.rows; i++) {
          this.weights.push(weights.get(i, 0));
        }
      } catch (error) {
        this.trainWithGradientDescent(features, targets);
      }
    }

    const predictions = this.predict(features);
    const metrics = calculateMetrics(targets, predictions);
    
    return {
      ...metrics,
      trainingTime: Date.now() - startTime
    };
  }

  private trainWithGradientDescent(features: number[][], targets: number[]) {
    const learningRate = 0.01;
    const epochs = 1000;
    const m = features.length;
    const n = features[0].length;
    
    this.weights = new Array(n).fill(0);
    this.bias = 0;
    
    for (let epoch = 0; epoch < epochs; epoch++) {
      let biasGradient = 0;
      const weightGradients = new Array(n).fill(0);
      
      for (let i = 0; i < m; i++) {
        const prediction = this.bias + features[i].reduce((sum, f, j) => sum + f * this.weights[j], 0);
        const error = prediction - targets[i];
        
        biasGradient += error;
        for (let j = 0; j < n; j++) {
          weightGradients[j] += error * features[i][j];
        }
      }
      
      this.bias -= (learningRate * biasGradient) / m;
      for (let j = 0; j < n; j++) {
        this.weights[j] -= (learningRate * weightGradients[j]) / m;
      }
    }
  }

  predict(features: number[][]): number[] {
    if (!this.isMultivariate && this.model) {
      return features.map(f => this.model!.predict(f[0]));
    } else {
      return features.map(f => 
        this.bias + f.reduce((sum, feature, i) => sum + feature * this.weights[i], 0)
      );
    }
  }
}

export class PolynomialRegressionModel {
  private model: PolynomialRegression | null = null;
  private degree: number;

  constructor(degree: number = 2) {
    this.degree = degree;
  }

  async train(features: number[][], targets: number[]): Promise<ModelMetrics> {
    const startTime = Date.now();
    const x = features.map(f => f[0]);
    this.model = new PolynomialRegression(x, targets, this.degree);
    
    const predictions = this.predict(features);
    const metrics = calculateMetrics(targets, predictions);
    
    return {
      ...metrics,
      trainingTime: Date.now() - startTime
    };
  }

  predict(features: number[][]): number[] {
    if (!this.model) return [];
    return features.map(f => this.model!.predict(f[0]));
  }
}

export class NeuralNetworkModel {
  private model: tf.Sequential | null = null;
  private inputSize: number = 0;

  async train(features: number[][], targets: number[]): Promise<ModelMetrics> {
    const startTime = Date.now();
    this.inputSize = features[0].length;
    
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [this.inputSize], units: 128, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.3 }),
        tf.layers.dense({ units: 64, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'linear' })
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mae']
    });

    const xs = tf.tensor2d(features);
    const ys = tf.tensor2d(targets.map(t => [t]));

    await this.model.fit(xs, ys, {
      epochs: 150,
      batchSize: 16,
      validationSplit: 0.2,
      verbose: 0,
      shuffle: true
    });

    const predictions = this.predict(features);
    const metrics = calculateMetrics(targets, predictions);
    
    xs.dispose();
    ys.dispose();

    return {
      ...metrics,
      trainingTime: Date.now() - startTime
    };
  }

  predict(features: number[][]): number[] {
    if (!this.model) return [];
    
    const xs = tf.tensor2d(features);
    const predictions = this.model.predict(xs) as tf.Tensor;
    const results = Array.from(predictions.dataSync());
    
    xs.dispose();
    predictions.dispose();
    
    return results;
  }
}

export class RandomForestModel {
  private trees: DecisionTree[] = [];
  private numTrees: number;

  constructor(numTrees: number = 15) {
    this.numTrees = numTrees;
  }

  async train(features: number[][], targets: number[]): Promise<ModelMetrics> {
    const startTime = Date.now();
    this.trees = [];
    
    for (let i = 0; i < this.numTrees; i++) {
      const bootstrapIndices = Array.from({ length: features.length }, () => 
        Math.floor(Math.random() * features.length)
      );
      
      const bootstrapFeatures = bootstrapIndices.map(idx => features[idx]);
      const bootstrapTargets = bootstrapIndices.map(idx => targets[idx]);
      
      const tree = new DecisionTree();
      tree.train(bootstrapFeatures, bootstrapTargets);
      this.trees.push(tree);
    }

    const predictions = this.predict(features);
    const metrics = calculateMetrics(targets, predictions);
    
    return {
      ...metrics,
      trainingTime: Date.now() - startTime
    };
  }

  predict(features: number[][]): number[] {
    if (this.trees.length === 0) return [];
    
    return features.map(feature => {
      const treePredictions = this.trees.map(tree => tree.predict(feature));
      return treePredictions.reduce((sum, pred) => sum + pred, 0) / this.trees.length;
    });
  }
}

class DecisionTree {
  private root: TreeNode | null = null;

  train(features: number[][], targets: number[]) {
    this.root = this.buildTree(features, targets, 0, 8);
  }

  private buildTree(features: number[][], targets: number[], depth: number, maxDepth: number): TreeNode {
    if (depth >= maxDepth || features.length <= 3 || this.isHomogeneous(targets)) {
      return {
        isLeaf: true,
        value: targets.reduce((sum, t) => sum + t, 0) / targets.length
      };
    }

    const bestSplit = this.findBestSplit(features, targets);
    if (!bestSplit) {
      return {
        isLeaf: true,
        value: targets.reduce((sum, t) => sum + t, 0) / targets.length
      };
    }

    const { leftFeatures, leftTargets, rightFeatures, rightTargets } = 
      this.splitData(features, targets, bestSplit.featureIndex, bestSplit.threshold);

    return {
      isLeaf: false,
      featureIndex: bestSplit.featureIndex,
      threshold: bestSplit.threshold,
      left: this.buildTree(leftFeatures, leftTargets, depth + 1, maxDepth),
      right: this.buildTree(rightFeatures, rightTargets, depth + 1, maxDepth)
    };
  }

  private isHomogeneous(targets: number[]): boolean {
    const variance = this.calculateVariance(targets);
    return variance < 10000;
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    return values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  }

  private findBestSplit(features: number[][], targets: number[]) {
    let bestGain = -1;
    let bestSplit = null;

    for (let featureIndex = 0; featureIndex < features[0].length; featureIndex++) {
      const values = features.map(f => f[featureIndex]);
      const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

      for (let i = 0; i < uniqueValues.length - 1; i++) {
        const threshold = (uniqueValues[i] + uniqueValues[i + 1]) / 2;
        const gain = this.calculateInformationGain(features, targets, featureIndex, threshold);

        if (gain > bestGain) {
          bestGain = gain;
          bestSplit = { featureIndex, threshold };
        }
      }
    }

    return bestSplit;
  }

  private calculateInformationGain(features: number[][], targets: number[], featureIndex: number, threshold: number): number {
    const { leftTargets, rightTargets } = this.splitData(features, targets, featureIndex, threshold);
    
    if (leftTargets.length === 0 || rightTargets.length === 0) return 0;

    const totalVariance = this.calculateVariance(targets);
    const leftWeight = leftTargets.length / targets.length;
    const rightWeight = rightTargets.length / targets.length;
    
    const weightedVariance = leftWeight * this.calculateVariance(leftTargets) + 
                           rightWeight * this.calculateVariance(rightTargets);

    return totalVariance - weightedVariance;
  }

  private splitData(features: number[][], targets: number[], featureIndex: number, threshold: number) {
    const leftFeatures: number[][] = [];
    const leftTargets: number[] = [];
    const rightFeatures: number[][] = [];
    const rightTargets: number[] = [];

    for (let i = 0; i < features.length; i++) {
      if (features[i][featureIndex] <= threshold) {
        leftFeatures.push(features[i]);
        leftTargets.push(targets[i]);
      } else {
        rightFeatures.push(features[i]);
        rightTargets.push(targets[i]);
      }
    }

    return { leftFeatures, leftTargets, rightFeatures, rightTargets };
  }

  predict(feature: number[]): number {
    if (!this.root) return 0;
    return this.predictNode(this.root, feature);
  }

  private predictNode(node: TreeNode, feature: number[]): number {
    if (node.isLeaf) {
      return node.value!;
    }

    if (feature[node.featureIndex!] <= node.threshold!) {
      return this.predictNode(node.left!, feature);
    } else {
      return this.predictNode(node.right!, feature);
    }
  }
}

interface TreeNode {
  isLeaf: boolean;
  value?: number;
  featureIndex?: number;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
}