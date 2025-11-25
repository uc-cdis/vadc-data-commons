const MockedFailureJSON = {
  name: 'gwas-workflow-2139489957',
  wf_name: 'TestJDRMar29-1130AM',
  arguments: {
    parameters: [
      { name: 'dataset_id', value: 12345 },
      { name: 'dataset_observation_window', value: '123' },
      { name: 'outcome_id', value: 123 },
      { name: 'outcome_observation_window', value: '1234' },
      { name: 'n_fold', value: 5 },
      {
          "name": "model_list",
          "value": "[\n  {\n    \"name\": \"Ada Boost\",\n    \"params\":\n    {\n      \"nEstimators\": [10, 50, 200],\n      \"learningRate\": [1.0, 0.5, 0.1],\n      \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Decision Tree\",\n    \"params\":\n      {\n          \"criterion\": [\"gini\"],\n          \"maxDepth\": [4],\n          \"minSamplesSplit\": [2],\n          \"minSamplesLeaf\": [10],\n          \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Gradient Boosting Machine\",\n    \"params\":\n    {\n      \"ntrees\": [10, 100],\n      \"nthread\": 20,\n      \"maxDepth\": [4, 6],\n      \"learnRate\": [0.1, 0.3],\n      \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Iterative Hard Thresholding\",\n    \"params\":\n    {\n      \"K\": 10,\n      \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Lasso Cox Regression\",\n    \"params\":\n    {\n      \"variance\": 0.01,\n      \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Multilayer Perceptron\",\n    \"params\":\n    {\n      \"hiddenLayerSizes\": [4],\n      \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Naive Bayes\",\n    \"params\": {}\n  },\n  {\n    \"name\": \"Support Vector Machine\",\n    \"params\":\n    {\n      \"degree\": [1, 3],\n      \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Lasso Logistic Regression\",\n    \"params\":\n      {\n        \"variance\": 0.01,\n        \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Light Gradient Boosting Machine\",\n    \"params\":\n    {\n      \"numLeaves\": [20, 31],\n      \"maxDepth\": [-1, 5],\n      \"minDataInLeaf\": [10],\n      \"learningRate\": [0.05, 0.1],\n      \"seed\": 42\n      }\n  },\n  {\n    \"name\": \"Random Forest\",\n    \"params\":\n      {\n        \"ntrees\": [100, 500],\n        \"criterion\": [\"gini\"],\n        \"maxDepth\": [4, 10, 17],\n        \"minSamplesSplit\": [2],\n        \"minSamplesLeaf\": [1, 10],\n        \"minWeightFractionLeaf\": [0],\n        \"mtries\": [\"sqrt\", \"log2\"],\n        \"maxLeafNodes\": [100],\n        \"minImpurityDecrease\": [0],\n        \"bootstrap\": [true],\n        \"maxSamples\": [0.9],\n        \"oobScore\": [false],\n        \"classWeight\": [\"balanced\"],\n        \"seed\": 42\n      }\n  }\n]\n"
      },
      { name: 'n_pcs', value: null },
      {
        name: 'variables',
        value: null,
      },
      { name: 'out_prefix', default: 'genesis_vadc', value: '1680107488624' },
      {
        name: 'outcome',
        value: null,
      },
      { name: 'hare_population', value: null },
      { name: 'hare_concept_id', default: '2000007027', value: '2000007027' },
      { name: 'maf_threshold', value: null },
      { name: 'imputation_score_cutoff', value: null },
      { name: 'template_version', value: 'gwas-template' },
      { name: 'source_id', value: '2' },
      { name: 'source_population_cohort', value: null },
      { name: 'workflow_name', value: null },
      {
        name: 'genome_build',
        default: 'hg19',
        value: 'hg19',
        enum: ['hg38', 'hg19'],
      },
      { name: 'pca_file', value: '/commons-data/pcs.RData' },
      {
        name: 'relatedness_matrix_file',
        value: '/commons-data/KINGmatDeg3.RData',
      },
      { name: 'n_segments', value: '0' },
      { name: 'segment_length', default: '2000', value: '2000' },
      { name: 'variant_block_size', default: '1024', value: '100' },
      { name: 'mac_threshold', value: '0' },
      {
        name: 'gds_files',
        value:
          '["/commons-data/gds/chr1.merged.vcf.gz.gds", "/commons-data/gds/chr2.merged.vcf.gz.gds", "/commons-data/gds/chr3.merged.vcf.gz.gds", "/commons-data/gds/chr4.merged.vcf.gz.gds", "/commons-data/gds/chr5.merged.vcf.gz.gds", "/commons-data/gds/chr6.merged.vcf.gz.gds", "/commons-data/gds/chr7.merged.vcf.gz.gds", "/commons-data/gds/chr8.merged.vcf.gz.gds", "/commons-data/gds/chr9.merged.vcf.gz.gds", "/commons-data/gds/chr10.merged.vcf.gz.gds", "/commons-data/gds/chr11.merged.vcf.gz.gds", "/commons-data/gds/chr12.merged.vcf.gz.gds", "/commons-data/gds/chr13.merged.vcf.gz.gds", "/commons-data/gds/chr14.merged.vcf.gz.gds", "/commons-data/gds/chr15.merged.vcf.gz.gds", "/commons-data/gds/chr16.merged.vcf.gz.gds", "/commons-data/gds/chr17.merged.vcf.gz.gds", "/commons-data/gds/chr18.merged.vcf.gz.gds", "/commons-data/gds/chr19.merged.vcf.gz.gds", "/commons-data/gds/chr20.merged.vcf.gz.gds", "/commons-data/gds/chr21.merged.vcf.gz.gds", "/commons-data/gds/chr22.merged.vcf.gz.gds"]',
      },
      { name: 'internal_api_env', default: 'default', value: 'qa-mickey' },
    ],
  },
  phase: 'Succeeded',
  progress: '9/9',
  submittedAt: '2023-03-29T16:31:28Z',
  startedAt: '2023-03-29T16:31:28Z',
  finishedAt: '2023-03-29T16:44:39Z',
  outputs: {
    parameters: [
      {
        name: 'gwas_archive_index',
        value:
          '{\n    "baseid": "656910a9-3e97-4ad8-8e7d-da9a67193d41",\n    "did": "c9421423-3650-4748-8573-7e19543f10e0",\n    "rev": "409f7d47"\n}',
      },
      {
        name: 'manhattan_plot_index',
        value:
          '{\n    "baseid": "e6283201-0e02-483e-980a-9d321d05ebc3",\n    "did": "733993c2-3238-4779-8b4b-a3d744dadba0",\n    "rev": "102de8d6"\n}',
      },
    ],
  },
};
export default MockedFailureJSON;
