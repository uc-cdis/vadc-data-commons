export const data = {
  name: 'gwas-workflow-6549599337',
  phase: 'Succeeded',
  gen3username: 'user922@example.com',
  submittedAt: '2024-12-02T04:20:07Z',
  startedAt: '2024-12-02T04:20:07Z',
  finishedAt: '2025-01-07T08:32:55Z',
  wf_name: 'test 1',
  arguments: {
    parameters: [
      {
        name: 'n_pcs',
        value: '3',
      },
      {
        name: 'variables',
        value: [
          {
            variable_type: 'concept',
            concept_id: 8852670911,
            concept_name: 'Eta Composite Score',
          },
          {
            variable_type: 'concept',
            concept_id: 5909884332,
            concept_name: 'Measurement Alpha Index',
          },
          {
            variable_type: 'concept',
            concept_id: 2505585697,
            concept_name: 'Zeta Coefficient',
          },
        ],
      },
      {
        name: 'out_prefix',
        default: 'genesis_vadc',
        value: '5262244486',
      },
      {
        name: 'outcome',
        value: {
          variable_type: 'concept',
          concept_id: 2505585697,
          concept_name: 'Zeta Coefficient',
        },
      },
      {
        name: 'hare_population',
        value: 'Group A',
      },
      {
        name: 'hare_concept_id',
        default: '9458104020',
        value: '9458104020',
      },
      {
        name: 'maf_threshold',
        value: '0.01',
      },
      {
        name: 'imputation_score_cutoff',
        value: '0.3',
      },
      {
        name: 'template_version',
        value: 'gwas-template-genesisupdate',
      },
      {
        name: 'source_id',
        value: '12',
      },
      {
        name: 'source_population_cohort',
        value: '2356',
      },
      {
        name: 'workflow_name',
        value: 'test 1',
      },
      {
        name: 'team_project',
        value: '/research_projects/PROJECT_BETA',
      },
      {
        name: 'genome_build',
        default: 'hg19',
        value: 'hg19',
        enum: ['hg38', 'hg19'],
      },
      {
        name: 'pca_file',
        value: '/commons-data/pcs.RData',
      },
      {
        name: 'relatedness_matrix_file',
        value: '/commons-data/QUEENmatDeg3.RData',
      },
      {
        name: 'widget_table',
        value: '/commons-data/mvp_widget_table.csv',
      },
      {
        name: 'related_samples',
        value: '/commons-data/related_samples.csv',
      },
      {
        name: 'n_segments',
        value: '0',
      },
      {
        name: 'segment_length',
        default: '2000',
        value: '2000',
      },
      {
        name: 'variant_block_size',
        default: '1024',
        value: '100',
      },
      {
        name: 'mac_threshold',
        value: '0',
      },
      {
        name: 'gds_files',
        value: [
          '/commons-data/gds/chr1.merged.vcf.gz.gds',
          '/commons-data/gds/chr2.merged.vcf.gz.gds',
          '/commons-data/gds/chr3.merged.vcf.gz.gds',
          '/commons-data/gds/chr4.merged.vcf.gz.gds',
          '/commons-data/gds/chr5.merged.vcf.gz.gds',
          '/commons-data/gds/chr6.merged.vcf.gz.gds',
          '/commons-data/gds/chr7.merged.vcf.gz.gds',
          '/commons-data/gds/chr8.merged.vcf.gz.gds',
          '/commons-data/gds/chr9.merged.vcf.gz.gds',
          '/commons-data/gds/chr10.merged.vcf.gz.gds',
          '/commons-data/gds/chr11.merged.vcf.gz.gds',
          '/commons-data/gds/chr12.merged.vcf.gz.gds',
          '/commons-data/gds/chr13.merged.vcf.gz.gds',
          '/commons-data/gds/chr14.merged.vcf.gz.gds',
          '/commons-data/gds/chr15.merged.vcf.gz.gds',
          '/commons-data/gds/chr16.merged.vcf.gz.gds',
          '/commons-data/gds/chr17.merged.vcf.gz.gds',
          '/commons-data/gds/chr18.merged.vcf.gz.gds',
          '/commons-data/gds/chr19.merged.vcf.gz.gds',
          '/commons-data/gds/chr20.merged.vcf.gz.gds',
          '/commons-data/gds/chr21.merged.vcf.gz.gds',
          '/commons-data/gds/chr22.merged.vcf.gz.gds',
          '/commons-data/gds/chrX.merged.vcf.gz.gds',
        ],
      },
      {
        name: 'internal_api_env',
        default: 'default',
        value: 'default',
      },
    ],
  },
  progress: '1618/1620',
  outputs: {
    parameters: [
      {
        name: 'gwas_archive_index',
        value: {
          baseid: 'f0bed968-2dc8-48ad-92c6-cfcf902329dc',
          did: 'dg.TST0/2f0bed968-2dc8-48ad-92c6-cfcf902329dc',
          rev: 'ed3d2bcf',
        },
      },
      {
        name: 'manhattan_plot_index',
        value: {
          baseid: '1b96ebb0-14bd-444d-949a-c8eedaf15c18',
          did: 'dg.TST0/1b96ebb0-14bd-444d-949a-c8eedaf15c18',
          rev: 'c60b974f',
        },
      },
      {
        name: 'attrition_json_index',
        value: {
          baseid: '999279d5-9194-4820-afe3-f5d693f74162',
          did: 'dg.TST0/999279d5-9194-4820-afe3-f5d693f74162',
          rev: '8ab52ddc',
        },
      },
      {
        name: 'pheweb_manhattan_json_index',
        value: {
          baseid: 'b69f49b5-cfc6-4adc-8b0f-88b11bf64277',
          did: 'dg.TST0/b69f49b5-cfc6-4adc-8b0f-88b11bf64277',
          rev: 'ec930d6b',
        },
      },
      {
        name: 'pheweb_qq_json_index',
        value: {
          baseid: 'a5e719e5-11d0-4f9c-b24c-fef6c668f3a2',
          did: 'dg.TST0/a5e719e5-11d0-4f9c-b24c-fef6c668f3a2',
          rev: '7dfb5d18',
        },
      },
    ],
  },
  gen3teamproject: '/research_projects/PROJECT_BETA',
};
